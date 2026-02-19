import * as pdfjsLib from 'pdfjs-dist'
import type { TextItem } from 'pdfjs-dist/types/src/display/api'
import type { KanjiEntry, KanjiVocab } from '../types'
import { v4 as uuidv4 } from 'uuid'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

interface TextBlock {
  str: string
  x: number
  y: number
  width: number
  height: number
}

const SINO_VIETNAMESE_REGEX = /^[A-ZÀ-Ỹ\s]+$/
const VIETNAMESE_REGEX = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i
const KANA_REGEX = /^[\u3040-\u30ff]+$/
const KANJI_REGEX = /[\u4e00-\u9faf\u3400-\u4dbf\u3005]/

async function getPageBlocks(pdf: pdfjsLib.PDFDocumentProxy, pageNum: number): Promise<TextBlock[]> {
  const page = await pdf.getPage(pageNum)
  const tc = await page.getTextContent()
  const blocks: TextBlock[] = []
  for (const item of tc.items) {
    if (!('str' in item)) continue
    const t = item as TextItem
    if (!t.str.trim()) continue
    blocks.push({
      str: t.str.trim(),
      x: Math.round(t.transform[4]),
      y: Math.round(t.transform[5]),
      width: t.width,
      height: t.height,
    })
  }
  return blocks
}

// Parse a header page (even page) to extract: sinoVietnamese, onyomi, kunyomi
function parseHeaderPage(blocks: TextBlock[]): {
  sinoVietnamese: string
  onyomi: string
  kunyomi: string
} | null {
  // SV reading: h~28, y~54, uppercase Vietnamese
  const svBlock = blocks.find(
    (b) => b.height >= 24 && b.height <= 30 && b.y >= 40 && b.y <= 70 && SINO_VIETNAMESE_REGEX.test(b.str),
  )
  if (!svBlock) return null

  // Onyomi: kana, h~32, y~277 (top half of the lower section)
  const onBlocks = blocks.filter(
    (b) => b.height >= 28 && b.height <= 34 && b.y >= 260 && b.y <= 300 && KANA_REGEX.test(b.str),
  )
  // Kunyomi: kana, h~32, y~177 (bottom half of lower section)
  const kunBlocks = blocks.filter(
    (b) => b.height >= 28 && b.height <= 34 && b.y >= 150 && b.y <= 200 && KANA_REGEX.test(b.str),
  )

  return {
    sinoVietnamese: svBlock.str,
    onyomi: onBlocks.map((b) => b.str).join(''),
    kunyomi: kunBlocks.map((b) => b.str).join(''),
  }
}

// Parse a vocabulary page (odd page) to extract compound words
function parseVocabPage(blocks: TextBlock[]): KanjiVocab[] {
  const vocabs: KanjiVocab[] = []
  const seen = new Set<string>()

  // Find kanji compound blocks: h >= 35, contains kanji
  const kanjiBlocks = blocks
    .filter((b) => b.height >= 35 && KANJI_REGEX.test(b.str))
    .sort((a, b) => b.y - a.y || a.x - b.x) // top-to-bottom, left-to-right

  for (const kb of kanjiBlocks) {
    const word = kb.str.replace(/[^\u4e00-\u9faf\u3400-\u4dbf\u3005\u3040-\u30ff〜～]/g, '')
    if (!word) continue

    // Find furigana blocks above this kanji block
    const furiBlocks = blocks
      .filter((b) => {
        if (b.height > 24 || !KANA_REGEX.test(b.str)) return false
        const yDiff = b.y - kb.y
        if (yDiff < 20 || yDiff > 70) return false
        const kanjiLeft = kb.x - 20
        const kanjiRight = kb.x + kb.width + 20
        const furiCenter = b.x + b.width / 2
        return furiCenter >= kanjiLeft && furiCenter <= kanjiRight
      })
      .sort((a, b) => a.x - b.x)

    // Build reading
    let reading = ''
    if (furiBlocks.length > 0) {
      const hasInlineKana = /[\u3040-\u30ff]/.test(word)
      if (!hasInlineKana) {
        reading = furiBlocks.map((b) => b.str).join('')
      } else {
        // Interleave furigana with inline kana
        const charWidth = kb.width / word.length
        const result: string[] = []
        const usedFuri = new Set<number>()
        for (let ci = 0; ci < word.length; ci++) {
          const ch = word[ci]
          if (!KANJI_REGEX.test(ch)) {
            result.push(ch)
          } else {
            const charCenterX = kb.x + (ci + 0.5) * charWidth
            let bestIdx = -1
            let bestDist = Infinity
            for (let fi = 0; fi < furiBlocks.length; fi++) {
              if (usedFuri.has(fi)) continue
              const dist = Math.abs(furiBlocks[fi].x + furiBlocks[fi].width / 2 - charCenterX)
              if (dist < bestDist) {
                bestDist = dist
                bestIdx = fi
              }
            }
            if (bestIdx >= 0 && bestDist < charWidth * 2) {
              result.push(furiBlocks[bestIdx].str)
              usedFuri.add(bestIdx)
            }
          }
        }
        reading = usedFuri.size > 0 ? result.join('') : furiBlocks.map((b) => b.str).join('')
      }
    }

    // Find Vietnamese meaning: blocks to the right of kanji (within y tolerance)
    // Include all text blocks in the meaning region, not just Vietnamese-detected ones
    const meaningBlocks = blocks
      .filter((b) => {
        if (b.x < kb.x + kb.width + 50) return false
        if (Math.abs(b.y - kb.y) > 40) return false
        const s = b.str
        // Skip kana-only blocks (those are readings, not meanings)
        if (KANA_REGEX.test(s)) return false
        // Skip kanji blocks
        if (b.height >= 35 && KANJI_REGEX.test(s)) return false
        // Accept Vietnamese text, Latin text (for split words like "P" + "hòng")
        return VIETNAMESE_REGEX.test(s) || /^[a-zA-ZÀ-Ỹà-ỹ\s,()~…]+$/.test(s)
      })
      .sort((a, b) => b.y - a.y || a.x - b.x)

    const meaning = meaningBlocks.map((b) => b.str).join(' ').replace(/\s+/g, ' ').trim()

    const key = word + '|' + reading
    if (seen.has(key)) continue
    seen.add(key)

    vocabs.push({ word, reading, meaning })
  }

  return vocabs
}

// Infer the kanji character from the vocabulary entries
function inferKanjiCharacter(vocabs: KanjiVocab[], prevEntries: KanjiEntry[]): string {
  if (vocabs.length === 0) return ''

  // Collect all kanji chars from all vocab words
  const charCounts = new Map<string, number>()
  for (const v of vocabs) {
    const chars = v.word.match(/[\u4e00-\u9faf\u3400-\u4dbf\u3005]/g) || []
    for (const ch of chars) {
      charCounts.set(ch, (charCounts.get(ch) || 0) + 1)
    }
  }

  // Remove kanji chars that are already in previous entries
  const prevChars = new Set(prevEntries.map((e) => e.character))
  for (const ch of prevChars) {
    charCounts.delete(ch)
  }

  // The most common remaining kanji char is likely the target
  let bestChar = ''
  let bestCount = 0
  for (const [ch, count] of charCounts) {
    if (count > bestCount) {
      bestCount = count
      bestChar = ch
    }
  }

  return bestChar
}

export async function parseKanjiDictionaryPdf(file: File): Promise<KanjiEntry[]> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  const entries: KanjiEntry[] = []

  for (let p = 2; p <= pdf.numPages - 1; p += 2) {
    const headerBlocks = await getPageBlocks(pdf, p)
    const header = parseHeaderPage(headerBlocks)
    if (!header) continue

    const vocabBlocks = await getPageBlocks(pdf, p + 1)
    const vocabs = parseVocabPage(vocabBlocks)

    const character = inferKanjiCharacter(vocabs, entries)
    if (!character) continue

    entries.push({
      id: uuidv4(),
      character,
      sinoVietnamese: header.sinoVietnamese,
      onyomi: header.onyomi,
      kunyomi: header.kunyomi,
      vocabs,
    })
  }

  return entries
}
