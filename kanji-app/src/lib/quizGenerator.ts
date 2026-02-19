import type { Flashcard, CardField, QuizQuestion } from '../types'

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function generateMultipleChoice(
  cards: Flashcard[],
  questionField: CardField,
  answerField: CardField,
  count?: number,
): QuizQuestion[] {
  if (cards.length < 4) return []

  const shuffled = shuffleArray(cards)
  const selected = count ? shuffled.slice(0, count) : shuffled

  return selected.map((card) => {
    const correctAnswer = card[answerField]
    const wrongCards = shuffleArray(
      cards.filter((c) => c.id !== card.id && c[answerField] !== correctAnswer)
    ).slice(0, 3)

    const options = shuffleArray([
      correctAnswer,
      ...wrongCards.map((c) => c[answerField]),
    ])

    return {
      cardId: card.id,
      questionField,
      answerField,
      questionText: card[questionField],
      correctAnswer,
      options,
      userAnswer: '',
      isCorrect: null,
    }
  })
}

export function generateWrittenAnswer(
  cards: Flashcard[],
  questionField: CardField,
  answerField: CardField,
  count?: number,
): QuizQuestion[] {
  const shuffled = shuffleArray(cards)
  const selected = count ? shuffled.slice(0, count) : shuffled

  return selected.map((card) => ({
    cardId: card.id,
    questionField,
    answerField,
    questionText: card[questionField],
    correctAnswer: card[answerField],
    options: [],
    userAnswer: '',
    isCorrect: null,
  }))
}

export function checkWrittenAnswer(userAnswer: string, correctAnswer: string): boolean {
  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ')
  return normalize(userAnswer) === normalize(correctAnswer)
}

export interface MatchPair {
  id: string
  left: string
  right: string
  leftCardId: string
  rightCardId: string
  matched: boolean
}

export function generateMatchPairs(
  cards: Flashcard[],
  leftField: CardField,
  rightField: CardField,
  count = 6,
): MatchPair[] {
  const shuffled = shuffleArray(cards).slice(0, Math.min(count, cards.length))

  return shuffled.map((card) => ({
    id: card.id,
    left: card[leftField],
    right: card[rightField],
    leftCardId: card.id,
    rightCardId: card.id,
    matched: false,
  }))
}
