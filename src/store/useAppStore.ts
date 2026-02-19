import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import type { Folder, Lesson, Flashcard, KanjiLesson, KanjiEntry } from '../types'

interface AppState {
  folders: Folder[]
  lessons: Lesson[]
  kanjiLessons: KanjiLesson[]
  _lastModified: number

  addFolder: (name: string, description?: string, parentFolderId?: string | null) => Folder
  updateFolder: (id: string, data: Partial<Pick<Folder, 'name' | 'description' | 'parentFolderId'>>) => void
  deleteFolder: (id: string) => void
  getSubFolders: (parentFolderId: string | null) => Folder[]
  getFolderPath: (folderId: string) => Folder[]

  addLesson: (name: string, folderId: string | null, description?: string) => Lesson
  updateLesson: (id: string, data: Partial<Pick<Lesson, 'name' | 'description' | 'folderId'>>) => void
  deleteLesson: (id: string) => void

  addCard: (lessonId: string, card: Omit<Flashcard, 'id' | 'createdAt'>) => void
  addCards: (lessonId: string, cards: Omit<Flashcard, 'id' | 'createdAt'>[]) => void
  updateCard: (lessonId: string, cardId: string, data: Partial<Omit<Flashcard, 'id' | 'createdAt'>>) => void
  deleteCard: (lessonId: string, cardId: string) => void
  reorderCards: (lessonId: string, cards: Flashcard[]) => void

  addKanjiLesson: (name: string, folderId: string | null, entries: KanjiEntry[], description?: string) => KanjiLesson
  updateKanjiLesson: (id: string, data: Partial<Pick<KanjiLesson, 'name' | 'description' | 'folderId'>>) => void
  deleteKanjiLesson: (id: string) => void
  updateKanjiEntry: (lessonId: string, entryId: string, data: Partial<Omit<KanjiEntry, 'id'>>) => void
  deleteKanjiEntry: (lessonId: string, entryId: string) => void

  getLessonsByFolder: (folderId: string) => Lesson[]
  getStandaloneLessons: () => Lesson[]
  getLessonById: (lessonId: string) => Lesson | undefined
  getFolderById: (folderId: string) => Folder | undefined
  getKanjiLessonsByFolder: (folderId: string) => KanjiLesson[]
  getStandaloneKanjiLessons: () => KanjiLesson[]
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      folders: [],
      lessons: [],
      kanjiLessons: [],
      _lastModified: 0,

      addFolder: (name, description = '', parentFolderId = null) => {
        const folder: Folder = {
          id: uuidv4(),
          name,
          description,
          parentFolderId: parentFolderId ?? null,
          createdAt: Date.now(),
        }
        set((state) => ({ folders: [...state.folders, folder], _lastModified: Date.now() }))
        return folder
      },

      updateFolder: (id, data) => {
        set((state) => ({
          folders: state.folders.map((f) =>
            f.id === id ? { ...f, ...data } : f
          ),
          _lastModified: Date.now(),
        }))
      },

      deleteFolder: (id) => {
        // Collect all descendant folder IDs recursively
        const allFolderIds = new Set<string>([id])
        const collectDescendants = (parentId: string) => {
          get().folders.forEach((f) => {
            if (f.parentFolderId === parentId && !allFolderIds.has(f.id)) {
              allFolderIds.add(f.id)
              collectDescendants(f.id)
            }
          })
        }
        collectDescendants(id)

        set((state) => ({
          folders: state.folders.filter((f) => !allFolderIds.has(f.id)),
          lessons: state.lessons.map((l) =>
            l.folderId && allFolderIds.has(l.folderId) ? { ...l, folderId: null } : l
          ),
          kanjiLessons: state.kanjiLessons.map((l) =>
            l.folderId && allFolderIds.has(l.folderId) ? { ...l, folderId: null } : l
          ),
          _lastModified: Date.now(),
        }))
      },

      getSubFolders: (parentFolderId) => {
        return get().folders.filter((f) => f.parentFolderId === parentFolderId)
      },

      getFolderPath: (folderId) => {
        const folders = get().folders
        const path: Folder[] = []
        let current = folders.find((f) => f.id === folderId)
        while (current) {
          path.unshift(current)
          current = current.parentFolderId ? folders.find((f) => f.id === current!.parentFolderId) : undefined
        }
        return path
      },

      addLesson: (name, folderId, description = '') => {
        const lesson: Lesson = {
          id: uuidv4(),
          name,
          description,
          folderId,
          cards: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        set((state) => ({ lessons: [...state.lessons, lesson], _lastModified: Date.now() }))
        return lesson
      },

      updateLesson: (id, data) => {
        set((state) => ({
          lessons: state.lessons.map((l) =>
            l.id === id ? { ...l, ...data, updatedAt: Date.now() } : l
          ),
          _lastModified: Date.now(),
        }))
      },

      deleteLesson: (id) => {
        set((state) => ({
          lessons: state.lessons.filter((l) => l.id !== id),
          _lastModified: Date.now(),
        }))
      },

      addCard: (lessonId, card) => {
        const newCard: Flashcard = {
          ...card,
          id: uuidv4(),
          createdAt: Date.now(),
        }
        set((state) => ({
          lessons: state.lessons.map((l) =>
            l.id === lessonId
              ? { ...l, cards: [...l.cards, newCard], updatedAt: Date.now() }
              : l
          ),
          _lastModified: Date.now(),
        }))
      },

      addCards: (lessonId, cards) => {
        const newCards: Flashcard[] = cards.map((c) => ({
          ...c,
          id: uuidv4(),
          createdAt: Date.now(),
        }))
        set((state) => ({
          lessons: state.lessons.map((l) =>
            l.id === lessonId
              ? { ...l, cards: [...l.cards, ...newCards], updatedAt: Date.now() }
              : l
          ),
          _lastModified: Date.now(),
        }))
      },

      updateCard: (lessonId, cardId, data) => {
        set((state) => ({
          lessons: state.lessons.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  cards: l.cards.map((c) =>
                    c.id === cardId ? { ...c, ...data } : c
                  ),
                  updatedAt: Date.now(),
                }
              : l
          ),
          _lastModified: Date.now(),
        }))
      },

      deleteCard: (lessonId, cardId) => {
        set((state) => ({
          lessons: state.lessons.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  cards: l.cards.filter((c) => c.id !== cardId),
                  updatedAt: Date.now(),
                }
              : l
          ),
          _lastModified: Date.now(),
        }))
      },

      reorderCards: (lessonId, cards) => {
        set((state) => ({
          lessons: state.lessons.map((l) =>
            l.id === lessonId ? { ...l, cards, updatedAt: Date.now() } : l
          ),
          _lastModified: Date.now(),
        }))
      },

      addKanjiLesson: (name, folderId, entries, description = '') => {
        const lesson: KanjiLesson = {
          id: uuidv4(),
          name,
          description,
          folderId,
          entries,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        set((state) => ({ kanjiLessons: [...state.kanjiLessons, lesson], _lastModified: Date.now() }))
        return lesson
      },

      updateKanjiLesson: (id, data) => {
        set((state) => ({
          kanjiLessons: state.kanjiLessons.map((l) =>
            l.id === id ? { ...l, ...data, updatedAt: Date.now() } : l
          ),
          _lastModified: Date.now(),
        }))
      },

      deleteKanjiLesson: (id) => {
        set((state) => ({
          kanjiLessons: state.kanjiLessons.filter((l) => l.id !== id),
          _lastModified: Date.now(),
        }))
      },

      updateKanjiEntry: (lessonId, entryId, data) => {
        set((state) => ({
          kanjiLessons: state.kanjiLessons.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  entries: l.entries.map((e) =>
                    e.id === entryId ? { ...e, ...data } : e
                  ),
                  updatedAt: Date.now(),
                }
              : l
          ),
          _lastModified: Date.now(),
        }))
      },

      deleteKanjiEntry: (lessonId, entryId) => {
        set((state) => ({
          kanjiLessons: state.kanjiLessons.map((l) =>
            l.id === lessonId
              ? {
                  ...l,
                  entries: l.entries.filter((e) => e.id !== entryId),
                  updatedAt: Date.now(),
                }
              : l
          ),
          _lastModified: Date.now(),
        }))
      },

      getLessonsByFolder: (folderId) => {
        return get().lessons.filter((l) => l.folderId === folderId)
      },

      getStandaloneLessons: () => {
        return get().lessons.filter((l) => l.folderId === null)
      },

      getLessonById: (lessonId) => {
        return get().lessons.find((l) => l.id === lessonId)
      },

      getFolderById: (folderId) => {
        return get().folders.find((f) => f.id === folderId)
      },

      getKanjiLessonsByFolder: (folderId) => {
        return get().kanjiLessons.filter((l) => l.folderId === folderId)
      },

      getStandaloneKanjiLessons: () => {
        return get().kanjiLessons.filter((l) => l.folderId === null)
      },
    }),
    {
      name: 'kanji-app-data',
      version: 3,
      migrate: (persisted: any, version: number) => {
        if (version < 2) {
          // Add parentFolderId to existing folders
          const state = persisted as any
          if (state.folders) {
            state.folders = state.folders.map((f: any) => ({
              ...f,
              parentFolderId: f.parentFolderId ?? null,
            }))
          }
        }
        if (version < 3) {
          // Add _lastModified for Gist sync
          persisted._lastModified = persisted._lastModified ?? 0
        }
        return persisted
      },
    }
  )
)
