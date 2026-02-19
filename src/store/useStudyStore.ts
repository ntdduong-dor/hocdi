import { create } from 'zustand'
import type { Flashcard, StudyConfig, StudySession, HistoryEntry } from '../types'

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface StudyState {
  session: StudySession | null

  startSession: (lessonId: string, cards: Flashcard[], config: StudyConfig) => void
  restartWithForgotten: () => void
  flipCard: () => void
  nextCard: (action: 'remember' | 'forget') => void
  undo: () => void
  shuffle: () => void
  reset: () => void
  endSession: () => void
  setAutoPlay: (enabled: boolean) => void
  setConfig: (config: Partial<StudyConfig>) => void
}

export const useStudyStore = create<StudyState>()((set, get) => ({
  session: null,

  startSession: (lessonId, cards, config) => {
    const sessionCards = config.shuffle ? shuffleArray(cards) : [...cards]
    set({
      session: {
        lessonId,
        cards: sessionCards,
        currentIndex: 0,
        isFlipped: false,
        remembered: [],
        forgotten: [],
        history: [],
        config,
        isComplete: sessionCards.length === 0,
      },
    })
  },

  restartWithForgotten: () => {
    const { session } = get()
    if (!session) return

    const forgottenCards = session.cards.filter((c) => session.forgotten.includes(c.id))
    if (forgottenCards.length === 0) return

    const sessionCards = session.config.shuffle ? shuffleArray(forgottenCards) : forgottenCards

    set({
      session: {
        ...session,
        cards: sessionCards,
        currentIndex: 0,
        isFlipped: false,
        remembered: [],
        forgotten: [],
        history: [],
        isComplete: false,
      },
    })
  },

  flipCard: () => {
    const { session } = get()
    if (!session || session.isComplete) return
    set({ session: { ...session, isFlipped: !session.isFlipped } })
  },

  nextCard: (action) => {
    const { session } = get()
    if (!session || session.isComplete) return

    const card = session.cards[session.currentIndex]
    const entry: HistoryEntry = {
      cardId: card.id,
      action,
      index: session.currentIndex,
    }

    const remembered = action === 'remember'
      ? [...session.remembered, card.id]
      : session.remembered
    const forgotten = action === 'forget'
      ? [...session.forgotten, card.id]
      : session.forgotten

    const nextIndex = session.currentIndex + 1
    const isComplete = nextIndex >= session.cards.length

    set({
      session: {
        ...session,
        currentIndex: isComplete ? session.currentIndex : nextIndex,
        isFlipped: false,
        remembered,
        forgotten,
        history: [...session.history, entry],
        isComplete,
      },
    })
  },

  undo: () => {
    const { session } = get()
    if (!session || session.history.length === 0) return

    const history = [...session.history]
    const lastEntry = history.pop()!

    const remembered = session.remembered.filter((id) => id !== lastEntry.cardId)
    const forgotten = session.forgotten.filter((id) => id !== lastEntry.cardId)

    set({
      session: {
        ...session,
        currentIndex: lastEntry.index,
        isFlipped: false,
        remembered,
        forgotten,
        history,
        isComplete: false,
      },
    })
  },

  shuffle: () => {
    const { session } = get()
    if (!session) return

    set({
      session: {
        ...session,
        cards: shuffleArray(session.cards),
        currentIndex: 0,
        isFlipped: false,
        remembered: [],
        forgotten: [],
        history: [],
        isComplete: false,
      },
    })
  },

  reset: () => {
    const { session } = get()
    if (!session) return

    set({
      session: {
        ...session,
        currentIndex: 0,
        isFlipped: false,
        remembered: [],
        forgotten: [],
        history: [],
        isComplete: false,
      },
    })
  },

  endSession: () => {
    set({ session: null })
  },

  setAutoPlay: (enabled) => {
    const { session } = get()
    if (!session) return
    set({
      session: {
        ...session,
        config: { ...session.config, autoPlay: enabled },
      },
    })
  },

  setConfig: (configUpdate) => {
    const { session } = get()
    if (!session) return
    set({
      session: {
        ...session,
        config: { ...session.config, ...configUpdate },
      },
    })
  },
}))
