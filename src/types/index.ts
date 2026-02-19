export interface Flashcard {
  id: string
  kanji: string
  hiragana: string
  meaning: string
  sinoVietnamese: string
  createdAt: number
}

export interface Lesson {
  id: string
  name: string
  description: string
  folderId: string | null
  cards: Flashcard[]
  createdAt: number
  updatedAt: number
}

export interface Folder {
  id: string
  name: string
  description: string
  parentFolderId: string | null
  createdAt: number
}

export type CardField = 'kanji' | 'hiragana' | 'meaning' | 'sinoVietnamese'

export const CARD_FIELD_LABELS: Record<CardField, string> = {
  kanji: 'Hán tự',
  hiragana: 'Hiragana',
  meaning: 'Nghĩa tiếng Việt',
  sinoVietnamese: 'Âm Hán Việt',
}

export interface StudyConfig {
  frontFields: CardField[]
  backFields: CardField[]
  shuffle: boolean
  autoPlay: boolean
  autoPlayInterval: number
}

export const DEFAULT_STUDY_CONFIG: StudyConfig = {
  frontFields: ['kanji'],
  backFields: ['sinoVietnamese', 'hiragana', 'meaning'],
  shuffle: false,
  autoPlay: false,
  autoPlayInterval: 3,
}

export interface HistoryEntry {
  cardId: string
  action: 'remember' | 'forget'
  index: number
}

export interface StudySession {
  lessonId: string
  cards: Flashcard[]
  currentIndex: number
  isFlipped: boolean
  remembered: string[]
  forgotten: string[]
  history: HistoryEntry[]
  config: StudyConfig
  isComplete: boolean
}

// ===== Kanji Dictionary =====

export interface KanjiVocab {
  word: string
  reading: string
  meaning: string
}

export interface KanjiEntry {
  id: string
  character: string
  sinoVietnamese: string
  onyomi: string
  kunyomi: string
  vocabs: KanjiVocab[]
}

export interface KanjiLesson {
  id: string
  name: string
  description: string
  folderId: string | null
  entries: KanjiEntry[]
  createdAt: number
  updatedAt: number
}

export type QuizType = 'multipleChoice' | 'writtenAnswer' | 'matchPairs'

export interface QuizQuestion {
  cardId: string
  questionField: CardField
  answerField: CardField
  questionText: string
  correctAnswer: string
  options: string[]
  userAnswer: string
  isCorrect: boolean | null
}
