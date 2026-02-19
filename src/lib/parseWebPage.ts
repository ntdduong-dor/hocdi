import type { Flashcard } from '../types'

type CardDraft = Omit<Flashcard, 'id' | 'createdAt'>

const KANJI_REGEX = /[\u4e00-\u9faf\u3400-\u4dbf\u3005]+/g
const HIRAGANA_REGEX = /[\u3040-\u309f]+/g
const KATAKANA_REGEX = /[\u30a0-\u30ff]+/g

// Use a CORS proxy to fetch the web page
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
]

async function fetchWithCorsProxy(url: string): Promise<string> {
  // Try direct fetch first (same origin or CORS-enabled)
  try {
    const directRes = await fetch(url, { signal: AbortSignal.timeout(5000) })
    if (directRes.ok) return await directRes.text()
  } catch {
    // Expected to fail for cross-origin
  }

  // Try CORS proxies
  for (const proxy of CORS_PROXIES) {
    try {
      const res = await fetch(proxy + encodeURIComponent(url), {
        signal: AbortSignal.timeout(10000),
      })
      if (res.ok) return await res.text()
    } catch {
      continue
    }
  }

  throw new Error('Không thể truy cập trang web. Kiểm tra lại đường link hoặc thử lại sau.')
}

// Parse HTML table with known column structures
function parseHtmlTable(html: string): CardDraft[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const cards: CardDraft[] = []

  // Find all tables
  const tables = doc.querySelectorAll('table')

  for (const table of tables) {
    const headers = Array.from(table.querySelectorAll('thead th, tr:first-child th, tr:first-child td'))
      .map((th) => th.textContent?.trim().toLowerCase() || '')

    // Detect column mapping
    const colMap = detectColumnMapping(headers)

    if (!colMap) continue // Not a vocabulary table

    const rows = table.querySelectorAll('tbody tr, tr')
    for (const row of rows) {
      const cells = Array.from(row.querySelectorAll('td'))
      if (cells.length < 2) continue

      const getText = (index: number) => {
        if (index < 0 || index >= cells.length) return ''
        return cells[index].textContent?.trim().replace(/\s+/g, ' ') || ''
      }

      const kanji = getText(colMap.kanji)
      const hiragana = getText(colMap.hiragana)
      const meaning = getText(colMap.meaning)
      const sinoVietnamese = getText(colMap.sinoVietnamese)

      // Skip header rows or empty
      if (!kanji && !hiragana) continue

      // Skip if this looks like a header row
      const isHeader = ['kanji', 'stt', '#', 'stb'].some((h) => kanji.toLowerCase().includes(h))
      if (isHeader) continue

      cards.push({ kanji, hiragana, meaning, sinoVietnamese })
    }
  }

  return cards
}

interface ColumnMapping {
  kanji: number
  hiragana: number
  meaning: number
  sinoVietnamese: number
}

function detectColumnMapping(headers: string[]): ColumnMapping | null {
  if (headers.length < 2) return null

  // Common patterns for vocabulary tables
  const kanjiKeywords = ['kanji', '漢字', 'hán tự', 'từ vựng', 'word', 'vocabulary', '単語', '言葉']
  const hiraganaKeywords = ['hiragana', 'ひらがな', 'kana', 'reading', 'phiên âm', 'cách đọc', 'よみ', '読み']
  const meaningKeywords = ['nghĩa', 'ý nghĩa', 'meaning', '意味', 'tiếng việt', 'vietnamese', 'dịch']
  const sinoKeywords = ['hán việt', 'âm hán', 'sino', 'âm on', 'hv', 'âm hán việt']
  const sttKeywords = ['stt', '#', 'no', 'số', 'stb', '番号']

  const findCol = (keywords: string[]): number => {
    return headers.findIndex((h) => keywords.some((k) => h.includes(k)))
  }

  let kanjiCol = findCol(kanjiKeywords)
  let hiraganaCol = findCol(hiraganaKeywords)
  let meaningCol = findCol(meaningKeywords)
  let sinoCol = findCol(sinoKeywords)
  const sttCol = findCol(sttKeywords)

  // If we found at least kanji OR hiragana AND meaning, we have a vocab table
  if (kanjiCol === -1 && hiraganaCol === -1) {
    // Try positional: skip STT column, then kanji, sinoVietnamese, hiragana, meaning
    // Common pattern: STT | Kanji | Âm hán việt | Hiragana | Ý nghĩa
    if (headers.length >= 4) {
      const offset = sttCol >= 0 ? 1 : 0
      kanjiCol = offset
      sinoCol = offset + 1
      hiraganaCol = offset + 2
      meaningCol = offset + 3
    } else {
      return null
    }
  }

  // Fill in missing columns with -1 (will return empty string)
  return {
    kanji: kanjiCol >= 0 ? kanjiCol : -1,
    hiragana: hiraganaCol >= 0 ? hiraganaCol : -1,
    meaning: meaningCol >= 0 ? meaningCol : -1,
    sinoVietnamese: sinoCol >= 0 ? sinoCol : -1,
  }
}

// Parse structured lists (dl/dt/dd, ul/li, etc.)
function parseHtmlLists(html: string): CardDraft[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const cards: CardDraft[] = []

  // Try definition lists
  const dts = doc.querySelectorAll('dt')
  for (const dt of dts) {
    const dd = dt.nextElementSibling
    if (!dd || dd.tagName !== 'DD') continue

    const term = dt.textContent?.trim() || ''
    const def = dd.textContent?.trim() || ''

    KANJI_REGEX.lastIndex = 0
    if (KANJI_REGEX.test(term) || HIRAGANA_REGEX.test(term)) {
      KANJI_REGEX.lastIndex = 0
      HIRAGANA_REGEX.lastIndex = 0
      const kanjiMatch = term.match(KANJI_REGEX)
      const hiraganaMatch = term.match(HIRAGANA_REGEX)

      cards.push({
        kanji: kanjiMatch ? kanjiMatch.join('') : '',
        hiragana: hiraganaMatch ? hiraganaMatch.join('') : '',
        meaning: def,
        sinoVietnamese: '',
      })
    }
  }

  return cards
}

// Parse any generic page by looking for Japanese text patterns
function parseGenericPage(html: string): CardDraft[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // Get text content of the main body, excluding scripts/styles
  const scripts = doc.querySelectorAll('script, style, nav, header, footer, aside')
  scripts.forEach((s) => s.remove())

  const text = doc.body?.textContent || ''
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0)
  const cards: CardDraft[] = []

  for (const line of lines) {
    if (line.length > 200) continue // Skip long paragraphs
    if (line.length < 2) continue

    KANJI_REGEX.lastIndex = 0
    const hasKanji = KANJI_REGEX.test(line)
    KANJI_REGEX.lastIndex = 0
    HIRAGANA_REGEX.lastIndex = 0
    const hasKana = HIRAGANA_REGEX.test(line) || KATAKANA_REGEX.test(line)
    HIRAGANA_REGEX.lastIndex = 0
    KATAKANA_REGEX.lastIndex = 0

    if (!hasKanji && !hasKana) continue

    // Try to split on common delimiters
    const hasSep = line.includes('\t') || line.includes('：') || line.includes(':') ||
                   (line.includes(',') && line.split(',').length >= 2) ||
                   (line.includes('|') && line.split('|').length >= 2) ||
                   (line.includes('–') || line.includes('-'))

    if (hasSep) {
      let parts: string[]
      if (line.includes('\t')) parts = line.split('\t')
      else if (line.includes('|')) parts = line.split('|')
      else if (line.includes('：')) parts = line.split('：')
      else if (line.includes(' - ')) parts = line.split(' - ')
      else if (line.includes(' – ')) parts = line.split(' – ')
      else if (line.includes(':')) parts = line.split(':')
      else parts = line.split(',')

      parts = parts.map((p) => p.trim()).filter((p) => p)
      if (parts.length >= 2) {
        // Classify each part
        const classified = parts.map(classifyText)
        const kanjiPart = classified.find((c) => c.type === 'kanji')
        const hiraganaPart = classified.find((c) => c.type === 'hiragana')
        const meaningPart = classified.find((c) => c.type === 'other')

        cards.push({
          kanji: kanjiPart?.text || '',
          hiragana: hiraganaPart?.text || '',
          meaning: meaningPart?.text || '',
          sinoVietnamese: '',
        })
        continue
      }
    }

    // Extract from mixed text
    const kanjiMatches = line.match(KANJI_REGEX)
    const hiraganaMatches = line.match(HIRAGANA_REGEX)
    const katakanaMatches = line.match(KATAKANA_REGEX)

    if (kanjiMatches || hiraganaMatches) {
      const kanji = kanjiMatches ? kanjiMatches.join('') : ''
      const hiragana = [
        ...(hiraganaMatches || []),
        ...(katakanaMatches || []),
      ].join('')

      const remaining = line
        .replace(KANJI_REGEX, ' ')
        .replace(HIRAGANA_REGEX, ' ')
        .replace(KATAKANA_REGEX, ' ')
        .replace(/\s+/g, ' ')
        .trim()

      if (remaining || kanji || hiragana) {
        cards.push({
          kanji,
          hiragana,
          meaning: remaining,
          sinoVietnamese: '',
        })
      }
    }
  }

  return cards
}

function classifyText(text: string): { type: 'kanji' | 'hiragana' | 'other'; text: string } {
  KANJI_REGEX.lastIndex = 0
  HIRAGANA_REGEX.lastIndex = 0
  KATAKANA_REGEX.lastIndex = 0

  if (KANJI_REGEX.test(text)) {
    KANJI_REGEX.lastIndex = 0
    return { type: 'kanji', text }
  }
  if (/^[\u3040-\u30ff\s]+$/.test(text)) {
    return { type: 'hiragana', text }
  }
  return { type: 'other', text }
}

function deduplicateCards(cards: CardDraft[]): CardDraft[] {
  const seen = new Set<string>()
  return cards.filter((card) => {
    if (!card.kanji && !card.hiragana && !card.meaning) return false
    const key = (card.kanji + '|' + card.hiragana).toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// ===== Main export =====

export interface CrawlResult {
  cards: CardDraft[]
  title: string
  url: string
  method: string
}

export async function crawlWebPage(url: string): Promise<CrawlResult> {
  const html = await fetchWithCorsProxy(url)

  // Extract page title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : ''

  // Strategy 1: Try HTML tables first (most structured)
  const tableCards = parseHtmlTable(html)
  if (tableCards.length >= 2) {
    return {
      cards: deduplicateCards(tableCards),
      title,
      url,
      method: 'table',
    }
  }

  // Strategy 2: Try definition lists
  const listCards = parseHtmlLists(html)
  if (listCards.length >= 2) {
    return {
      cards: deduplicateCards(listCards),
      title,
      url,
      method: 'list',
    }
  }

  // Strategy 3: Generic text extraction
  const genericCards = parseGenericPage(html)
  if (genericCards.length >= 1) {
    return {
      cards: deduplicateCards(genericCards),
      title,
      url,
      method: 'generic',
    }
  }

  return {
    cards: [],
    title,
    url,
    method: 'none',
  }
}
