import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppStore } from '../store/useAppStore'
import { n3KanjiEntries } from '../data/kanji/n3-kanji'
import type { KanjiEntry } from '../types'

/**
 * Auto-seed N3 kanji lesson on app load.
 * Checks store directly — if no N3 kanji lesson exists, creates one.
 */
export function useSeedN3Kanji() {
  const addKanjiLesson = useAppStore((s) => s.addKanjiLesson)
  const kanjiLessons = useAppStore((s) => s.kanjiLessons)

  useEffect(() => {
    // Check if N3 lesson already exists in store (the real source of truth)
    const exists = kanjiLessons.some(
      (l) => l.name.includes('N3') && l.entries.length >= 100
    )
    if (exists) return

    // Generate IDs for entries
    const entries: KanjiEntry[] = n3KanjiEntries.map((e) => ({
      ...e,
      id: uuidv4(),
    }))

    addKanjiLesson(
      'Tổng hợp Hán tự N3',
      null,
      entries,
      '200 Hán tự N3 cơ bản với từ vựng và cách đọc'
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
