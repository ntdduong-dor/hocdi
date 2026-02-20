import type { GrammarPoint } from '../types/grammar'

// ===== Types =====

export interface FillBlankQuestion {
  /** Full sentence with blank: "若い ______ 勉強しておきなさい。" */
  sentence: string
  /** Correct answer to fill in */
  answer: string
  /** 4 options including the correct one */
  options: string[]
  /** Vietnamese translation */
  translation: string
  /** Full original Japanese sentence */
  fullSentence: string
}

export interface TranslateQuestion {
  /** Vietnamese meaning shown to user */
  vi: string
  /** Correct Japanese sentence */
  correctJa: string
  /** 4 options including the correct one */
  options: string[]
  /** Grammar title for reference */
  grammarTitle: string
}

export interface MatchPair {
  ja: string
  vi: string
}

// ===== Helpers =====

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRandom<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count)
}

/**
 * Extract grammar pattern keyword from the title
 * e.g. "～うちに" → "うちに", "～ことにする" → "ことにする"
 */
function extractKeyword(title: string): string {
  return title.replace(/^[～〜]/, '').replace(/[～〜]$/, '').trim()
}

/**
 * Try to create a blank in the sentence by replacing the grammar keyword.
 * Returns null if keyword not found.
 */
function createBlank(sentence: string, keyword: string): { blanked: string; answer: string } | null {
  // Try exact match first
  const idx = sentence.indexOf(keyword)
  if (idx !== -1) {
    const blanked = sentence.substring(0, idx) + '______' + sentence.substring(idx + keyword.length)
    return { blanked, answer: keyword }
  }

  // Try variations: remove ～ and try partial matches
  const parts = keyword.split(/[～〜]/).filter(Boolean)
  for (const part of parts) {
    if (part.length < 2) continue
    const partIdx = sentence.indexOf(part)
    if (partIdx !== -1) {
      const blanked = sentence.substring(0, partIdx) + '______' + sentence.substring(partIdx + part.length)
      return { blanked, answer: part }
    }
  }

  return null
}

// ===== Distractors pool =====
const COMMON_GRAMMAR_PARTICLES = [
  'うちに', 'ために', 'ように', 'ことに', 'ものだ', 'わけだ',
  'はずだ', 'ところだ', 'ことがある', 'ようにする', 'ことにする',
  'ばかり', 'ながら', 'として', 'に対して', 'について',
  'にとって', 'において', 'によって', 'に関して', 'をもとに',
  'をはじめ', 'にかけて', 'に沿って', 'つつ', 'がち',
  'っぽい', 'らしい', 'みたい', 'そうだ', 'ようだ',
  'だらけ', 'まま', 'きり', 'くせに', 'わりに',
  'たびに', 'おかげで', 'せいで', 'かわりに', 'とおり',
]

function getDistractors(correctAnswer: string, count: number): string[] {
  const distractors = COMMON_GRAMMAR_PARTICLES.filter(
    (p) => p !== correctAnswer && p.length > 0
  )
  return pickRandom(distractors, count)
}

// ===== Generators =====

/**
 * Generate fill-in-the-blank questions from a grammar point
 */
export function generateFillBlank(grammar: GrammarPoint, count = 5): FillBlankQuestion[] {
  const keyword = extractKeyword(grammar.title)
  const questions: FillBlankQuestion[] = []

  for (const ex of grammar.examples) {
    if (questions.length >= count) break
    const result = createBlank(ex.ja, keyword)
    if (!result) continue

    const distractors = getDistractors(result.answer, 3)
    const options = shuffle([result.answer, ...distractors])

    questions.push({
      sentence: result.blanked,
      answer: result.answer,
      options,
      translation: ex.vi,
      fullSentence: ex.ja,
    })
  }

  return shuffle(questions)
}

/**
 * Generate translate Vi→Ja questions
 * Needs other grammar points' examples as wrong options
 */
export function generateTranslateQuiz(
  grammar: GrammarPoint,
  allGrammar: GrammarPoint[],
  count = 5,
): TranslateQuestion[] {
  const examplesPool = grammar.examples.length > count
    ? pickRandom(grammar.examples, count)
    : [...grammar.examples]

  // Get wrong options from other grammar points
  const otherExamples = allGrammar
    .filter((g) => g.id !== grammar.id)
    .flatMap((g) => g.examples.map((ex) => ({ ja: ex.ja, grammarId: g.id })))

  return examplesPool.map((ex) => {
    const wrongOptions = pickRandom(otherExamples, 3).map((o) => o.ja)
    const options = shuffle([ex.ja, ...wrongOptions])

    return {
      vi: ex.vi,
      correctJa: ex.ja,
      options,
      grammarTitle: grammar.title,
    }
  })
}

/**
 * Generate match pairs from grammar examples
 */
export function generateMatchPairs(grammar: GrammarPoint, count = 4): MatchPair[] {
  const available = grammar.examples.filter((ex) => ex.ja.length <= 40 && ex.vi.length <= 50)
  const selected = available.length > count ? pickRandom(available, count) : available.slice(0, count)

  return selected.map((ex) => ({
    ja: ex.ja,
    vi: ex.vi,
  }))
}
