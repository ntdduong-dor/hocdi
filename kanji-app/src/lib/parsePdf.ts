import * as pdfjsLib from 'pdfjs-dist'
import type { TextItem } from 'pdfjs-dist/types/src/display/api'
import type { Flashcard } from '../types'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

// Unicode ranges
const KANJI_REGEX = /[\u4e00-\u9faf\u3400-\u4dbf\u3005]+/g
const HIRAGANA_REGEX = /[\u3040-\u309f]+/g
const KATAKANA_REGEX = /[\u30a0-\u30ff]+/g
const SINO_VIETNAMESE_REGEX = /^[A-ZÀ-Ỹ\s,]+$/
const VIETNAMESE_REGEX = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i

type CardDraft = Omit<Flashcard, 'id' | 'createdAt'>

// ===== Raw text extraction with position data =====

interface TextBlock {
  str: string
  x: number
  y: number
  width: number
  height: number
  page: number
}

async function extractTextBlocks(file: File): Promise<TextBlock[]> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  const blocks: TextBlock[] = []

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()

    for (const item of textContent.items) {
      if (!('str' in item)) continue
      const textItem = item as TextItem
      if (!textItem.str.trim()) continue
      blocks.push({
        str: textItem.str.trim(),
        x: Math.round(textItem.transform[4]),
        y: Math.round(textItem.transform[5]),
        width: textItem.width,
        height: textItem.height,
        page: i,
      })
    }
  }

  return blocks
}

export async function extractTextFromPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  const textParts: string[] = []

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items
      .map((item) => ('str' in item ? (item as TextItem).str : ''))
      .join(' ')
    textParts.push(pageText)
  }

  return textParts.join('\n')
}

// ===== Strategy 1: Kanji textbook format (like your PDF) =====
// Pattern: sections start with uppercase Sino-Vietnamese (CHUẨN, BỊ, DOANH...)
// then have compound words with hiragana readings and Vietnamese meanings
// Furigana (small hiragana) sits ABOVE kanji blocks - detected per-block, not per-line

function isFuriganaBlock(b: TextBlock): boolean {
  // Furigana: small font (height ≤ 24) and pure kana
  return b.height <= 24 && /^[\u3040-\u30ff]+$/.test(b.str.trim())
}

function isKanjiBlock(b: TextBlock): boolean {
  KANJI_REGEX.lastIndex = 0
  return KANJI_REGEX.test(b.str)
}

// Find all furigana blocks positioned directly above a kanji block
function findFuriganaBlocks(kanjiBlock: TextBlock, allBlocks: TextBlock[]): TextBlock[] {
  const furiBlocks: TextBlock[] = []

  for (const b of allBlocks) {
    if (!isFuriganaBlock(b)) continue
    if (b.page !== kanjiBlock.page) continue

    // Furigana must be above kanji: higher Y in PDF coords (Y grows upward)
    const yDiff = b.y - kanjiBlock.y
    if (yDiff < 20 || yDiff > 70) continue

    // Furigana X must overlap with kanji X range (with generous tolerance)
    const kanjiLeft = kanjiBlock.x - 20
    const kanjiRight = kanjiBlock.x + kanjiBlock.width + 20
    const furiCenter = b.x + b.width / 2

    if (furiCenter >= kanjiLeft && furiCenter <= kanjiRight) {
      furiBlocks.push(b)
    }
  }

  return furiBlocks.sort((a, b) => a.x - b.x)
}

// Build full reading for a kanji word by interleaving furigana with inline kana
// e.g., "当たり前" with furigana "あ"(above 当) + "まえ"(above 前) → "あたりまえ"
function buildFullReading(kanjiText: string, kanjiBlock: TextBlock, allBlocks: TextBlock[]): string {
  const furiBlocks = findFuriganaBlocks(kanjiBlock, allBlocks)
  if (furiBlocks.length === 0) return ''

  // Simple case: no inline kana (e.g., "準備" → furigana "じゅんび")
  const hasInlineKana = /[\u3040-\u30ff]/.test(kanjiText)
  if (!hasInlineKana) {
    return furiBlocks.map((b) => b.str.trim()).join('')
  }

  // Complex case: kanji text has inline kana (e.g., "当たり前", "閉める")
  // Walk through the text, estimate X position of each char,
  // and assign furigana to kanji chars based on X proximity
  const totalWidth = kanjiBlock.width
  const charCount = kanjiText.length
  const charWidth = totalWidth / charCount

  const result: string[] = []
  let usedFuri = new Set<number>()

  for (let ci = 0; ci < charCount; ci++) {
    const ch = kanjiText[ci]
    const isKanjiChar = /[\u4e00-\u9faf\u3400-\u4dbf\u3005]/.test(ch)

    if (!isKanjiChar) {
      // Inline kana - add directly to reading
      result.push(ch)
    } else {
      // Kanji char - find furigana block(s) above this char's X position
      const charCenterX = kanjiBlock.x + (ci + 0.5) * charWidth
      // Find closest unused furigana block
      let bestIdx = -1
      let bestDist = Infinity
      for (let fi = 0; fi < furiBlocks.length; fi++) {
        if (usedFuri.has(fi)) continue
        const furiCenterX = furiBlocks[fi].x + furiBlocks[fi].width / 2
        const dist = Math.abs(furiCenterX - charCenterX)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = fi
        }
      }
      if (bestIdx >= 0 && bestDist < charWidth * 2) {
        result.push(furiBlocks[bestIdx].str.trim())
        usedFuri.add(bestIdx)
      }
    }
  }

  // If we couldn't assign any furigana, fall back to simple join
  if (usedFuri.size === 0) {
    return furiBlocks.map((b) => b.str.trim()).join('')
  }

  return result.join('')
}

interface GroupedLine {
  blocks: TextBlock[]
  y: number
  text: string
}

function groupBlocksIntoLines(pageBlocks: TextBlock[]): GroupedLine[] {
  if (pageBlocks.length === 0) return []
  const sorted = [...pageBlocks].sort((a, b) => b.y - a.y || a.x - b.x)
  const lines: TextBlock[][] = []
  let currentLine: TextBlock[] = [sorted[0]]

  for (let i = 1; i < sorted.length; i++) {
    if (Math.abs(sorted[i].y - currentLine[0].y) < 8) {
      currentLine.push(sorted[i])
    } else {
      lines.push(currentLine.sort((a, b) => a.x - b.x))
      currentLine = [sorted[i]]
    }
  }
  if (currentLine.length > 0) lines.push(currentLine.sort((a, b) => a.x - b.x))

  return lines.map((blocks) => ({
    blocks,
    y: blocks.reduce((sum, b) => sum + b.y, 0) / blocks.length,
    text: blocks.map((b) => b.str).join(' ').trim(),
  }))
}

function parseKanjiTextbookFormat(blocks: TextBlock[]): CardDraft[] {
  const cards: CardDraft[] = []
  const seen = new Set<string>()

  // Group blocks by page
  const pageGroups = new Map<number, TextBlock[]>()
  for (const block of blocks) {
    const arr = pageGroups.get(block.page) || []
    arr.push(block)
    pageGroups.set(block.page, arr)
  }

  for (const [, pageBlocks] of pageGroups) {
    const lines = groupBlocksIntoLines(pageBlocks)

    let currentSinoViet = ''

    for (const line of lines) {
      const lineText = line.text

      // Skip header markers
      if (lineText === '音' || lineText === '順' || lineText.startsWith('漢字') || lineText === '練習') continue

      // Check if this is a Sino-Vietnamese header (e.g., CHUẨN, BỊ, DOANH)
      if (SINO_VIETNAMESE_REGEX.test(lineText) && lineText.length >= 2 && lineText === lineText.toUpperCase()) {
        currentSinoViet = lineText
        continue
      }

      // Skip lines that are ONLY furigana (all blocks are small kana)
      if (line.blocks.every((b) => isFuriganaBlock(b))) continue

      // Process each kanji block on this line independently
      // A line can have multiple kanji entries (left column + right column)
      const kanjiEntries: { kanjiBlock: TextBlock; kanji: string; x: number }[] = []

      for (const block of line.blocks) {
        const s = block.str.trim()
        if (!s || s === '音' || s === '順') continue

        KANJI_REGEX.lastIndex = 0
        if (KANJI_REGEX.test(s) && !VIETNAMESE_REGEX.test(s) && block.height >= 28) {
          KANJI_REGEX.lastIndex = 0
          const cleaned = s.replace(/[^\u4e00-\u9faf\u3400-\u4dbf\u3005\u3040-\u30ff〜～]/g, '')
          if (cleaned) {
            kanjiEntries.push({ kanjiBlock: block, kanji: cleaned, x: block.x })
          }
        }
      }

      if (kanjiEntries.length === 0) continue

      // For each kanji entry, find its furigana and meaning
      for (const entry of kanjiEntries) {
        // Build full reading by combining furigana with inline kana
        const kanjiText = entry.kanji
        const pureKanji = kanjiText.replace(/[^\u4e00-\u9faf\u3400-\u4dbf\u3005]/g, '')
        const fullHiragana = buildFullReading(kanjiText, entry.kanjiBlock, pageBlocks)

        // Find Vietnamese meaning: text blocks to the right of kanji on same line
        // Use a region-based approach to avoid picking up meanings from other entries
        const kanjiCenterY = entry.kanjiBlock.y
        const meaningBlocks = line.blocks.filter((b) => {
          const s = b.str.trim()
          if (!s) return false
          // Must be to the right of kanji
          if (b.x < entry.kanjiBlock.x + entry.kanjiBlock.width + 50) return false
          // Must be Vietnamese text
          return VIETNAMESE_REGEX.test(s) || (/^[a-zA-ZÀ-Ỹà-ỹ\s,()]+$/.test(s) && s.length > 1)
        }).sort((a, b) => a.x - b.x)

        // Also check blocks directly below for meaning, but only those
        // closest to this kanji (within tight Y range and right X position)
        const meaningFromBelow: string[] = []
        for (const b of pageBlocks) {
          if (b.page !== entry.kanjiBlock.page) continue
          const yDiff = kanjiCenterY - b.y // positive = below
          if (yDiff < 5 || yDiff > 35) continue

          const s = b.str.trim()
          if (!s) continue

          // Must be to the right of kanji
          if (b.x < entry.kanjiBlock.x + entry.kanjiBlock.width + 50) continue
          // Must be close horizontally to the same meaning column (avoid other entry's meaning)
          if (meaningBlocks.length > 0 && Math.abs(b.x - meaningBlocks[0].x) > 60) continue

          if (VIETNAMESE_REGEX.test(s) || (/^[a-zA-ZÀ-Ỹà-ỹ\s,()]+$/.test(s) && s.length > 1)) {
            meaningFromBelow.push(s)
          }
        }

        // Deduplicate meaning parts
        const allMeaningParts = [
          ...meaningBlocks.map((b) => b.str.trim()),
          ...meaningFromBelow,
        ]
        const uniqueMeanings: string[] = []
        const seenMeanings = new Set<string>()
        for (const m of allMeaningParts) {
          if (!seenMeanings.has(m.toLowerCase())) {
            seenMeanings.add(m.toLowerCase())
            uniqueMeanings.push(m)
          }
        }
        const meaning = uniqueMeanings.join(' ').trim()

        // Skip single-char without any context
        if (!meaning && !fullHiragana && pureKanji.length === 1) continue

        const key = kanjiText + '|' + fullHiragana
        if (seen.has(key)) continue
        seen.add(key)

        cards.push({
          kanji: kanjiText,
          hiragana: fullHiragana,
          meaning,
          sinoVietnamese: currentSinoViet,
        })
      }
    }
  }

  return cards
}

// ===== Strategy 2: Table/list format (CSV-like in PDF) =====

function parseTableFormat(text: string): CardDraft[] {
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0)
  const cards: CardDraft[] = []

  for (const line of lines) {
    // Try comma/tab separated first
    const hasSeparator = line.includes('\t') || (line.includes(',') && line.split(',').length >= 2)
    if (hasSeparator) {
      const parts = line.includes('\t') ? line.split('\t') : line.split(',')
      if (parts.length >= 2) {
        const card = {
          kanji: (parts[0] || '').trim(),
          hiragana: (parts[1] || '').trim(),
          meaning: (parts[2] || '').trim(),
          sinoVietnamese: (parts[3] || '').trim(),
        }
        if (card.kanji || card.hiragana) {
          cards.push(card)
        }
      }
      continue
    }

    // Try smart extraction from mixed text
    const extracted = extractFromMixedLine(line)
    if (extracted) cards.push(extracted)
  }

  return cards
}

function extractFromMixedLine(line: string): CardDraft | null {
  KANJI_REGEX.lastIndex = 0
  HIRAGANA_REGEX.lastIndex = 0
  KATAKANA_REGEX.lastIndex = 0

  const kanjiMatches = line.match(KANJI_REGEX)
  const hiraganaMatches = line.match(HIRAGANA_REGEX)
  const katakanaMatches = line.match(KATAKANA_REGEX)

  const kanji = kanjiMatches ? kanjiMatches.join('') : ''
  const hiragana = [
    ...(hiraganaMatches || []),
    ...(katakanaMatches || []),
  ].join('')

  // Remaining text after removing Japanese
  const remaining = line
    .replace(KANJI_REGEX, ' ')
    .replace(HIRAGANA_REGEX, ' ')
    .replace(KATAKANA_REGEX, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  // Split remaining into Sino-Vietnamese and meaning
  let sinoVietnamese = ''
  let meaning = remaining

  // Check if remaining starts with uppercase Vietnamese (Sino-Vietnamese reading)
  const sinoMatch = remaining.match(/^([A-ZÀ-Ỹ][A-ZÀ-Ỹ\s,]+)[\s,]*(.*)$/i)
  if (sinoMatch && sinoMatch[1].toUpperCase() === sinoMatch[1]) {
    sinoVietnamese = sinoMatch[1].trim()
    meaning = sinoMatch[2].trim()
  }

  if (kanji || hiragana) {
    return { kanji, hiragana, meaning, sinoVietnamese }
  }
  return null
}

// ===== Strategy 3: Structured text with recognizable patterns =====

function parseStructuredText(text: string): CardDraft[] {
  const cards: CardDraft[] = []
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0)

  let currentSinoViet = ''
  let pendingKanji = ''
  let pendingHiragana = ''
  let pendingMeaning = ''

  const flushCard = () => {
    if (pendingKanji || pendingHiragana) {
      cards.push({
        kanji: pendingKanji,
        hiragana: pendingHiragana,
        meaning: pendingMeaning,
        sinoVietnamese: currentSinoViet,
      })
    }
    pendingKanji = ''
    pendingHiragana = ''
    pendingMeaning = ''
  }

  for (const line of lines) {
    if (line === '音' || line === '順' || line.startsWith('漢字') || line === '練習') continue

    // Sino-Vietnamese header
    if (SINO_VIETNAMESE_REGEX.test(line) && line.length >= 2 && line === line.toUpperCase()) {
      flushCard()
      currentSinoViet = line
      continue
    }

    KANJI_REGEX.lastIndex = 0
    HIRAGANA_REGEX.lastIndex = 0

    const hasKanji = KANJI_REGEX.test(line)
    KANJI_REGEX.lastIndex = 0
    const isAllKana = /^[\u3040-\u30ff\s]+$/.test(line)
    const hasVietnamese = VIETNAMESE_REGEX.test(line)

    if (hasKanji && !hasVietnamese) {
      // New kanji compound
      flushCard()
      pendingKanji = line.replace(/[^\u4e00-\u9faf\u3400-\u4dbf\u3005\u3040-\u30ff〜～]/g, '')
      // Extract inline hiragana
      const kanaOnly = line.match(/[\u3040-\u30ff]+/g)
      if (kanaOnly) pendingHiragana = kanaOnly.join('')
    } else if (isAllKana && !pendingKanji) {
      // Hiragana reading before kanji (furigana pattern)
      pendingHiragana = line.replace(/\s+/g, '')
    } else if (isAllKana && pendingKanji && !pendingHiragana) {
      pendingHiragana = line.replace(/\s+/g, '')
    } else if (hasVietnamese && pendingKanji) {
      pendingMeaning = pendingMeaning ? pendingMeaning + ' ' + line : line
    } else if (hasVietnamese && !pendingKanji && cards.length > 0) {
      // Continuation of previous card's meaning
      const last = cards[cards.length - 1]
      last.meaning = last.meaning ? last.meaning + ' ' + line : line
    }
  }

  flushCard()
  return cards
}

// ===== Auto-detect format and parse =====

export type PdfFormat = 'auto' | 'textbook' | 'table' | 'structured' | 'raw'

export async function parsePdfFile(file: File, format: PdfFormat = 'auto'): Promise<CardDraft[]> {
  if (format === 'textbook' || format === 'auto') {
    try {
      const blocks = await extractTextBlocks(file)
      const textbookCards = parseKanjiTextbookFormat(blocks)
      if (textbookCards.length >= 3) {
        // Clean up: remove cards that are just single kana or noise
        return deduplicateAndClean(textbookCards)
      }
      if (format === 'textbook') return deduplicateAndClean(textbookCards)
    } catch {
      if (format === 'textbook') throw new Error('Không thể đọc PDF dạng sách giáo khoa')
    }
  }

  const text = await extractTextFromPdf(file)

  if (format === 'table') {
    return deduplicateAndClean(parseTableFormat(text))
  }

  if (format === 'structured') {
    return deduplicateAndClean(parseStructuredText(text))
  }

  // Auto: try structured first, then table
  const structuredCards = parseStructuredText(text)
  if (structuredCards.length >= 3) {
    return deduplicateAndClean(structuredCards)
  }

  const tableCards = parseTableFormat(text)
  if (tableCards.length >= 1) {
    return deduplicateAndClean(tableCards)
  }

  // Fallback: raw extraction
  return deduplicateAndClean(parseRawText(text))
}

function parseRawText(text: string): CardDraft[] {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter((l) => l.length > 0)
  const cards: CardDraft[] = []

  for (const line of lines) {
    const extracted = extractFromMixedLine(line)
    if (extracted) cards.push(extracted)
  }

  return cards
}

function deduplicateAndClean(cards: CardDraft[]): CardDraft[] {
  const seen = new Set<string>()
  return cards.filter((card) => {
    // Must have at least one substantial field
    if (!card.kanji && !card.hiragana && !card.meaning) return false

    // Skip entries that are just noise
    if (card.kanji.length === 0 && card.hiragana.length <= 1 && !card.meaning) return false

    // Skip pure practice/exercise section headers
    if (['練習', '漢字', 'レストラン'].includes(card.kanji)) return false

    const key = (card.kanji + '|' + card.hiragana).toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// ===== Export for preview =====
export { extractTextBlocks }
export type { TextBlock }
