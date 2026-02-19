import type { KanjiEntry, KanjiVocab, Flashcard } from '../types'

/**
 * Convert each vocab in a KanjiEntry to a Flashcard.
 * Each vocabulary word becomes its own flashcard:
 *   vocab.word → kanji (e.g. 食べる)
 *   vocab.reading → hiragana (e.g. たべる)
 *   vocab.meaning → meaning (e.g. ăn)
 *   parent entry's sinoVietnamese → sinoVietnamese (e.g. THỰC)
 */
export function kanjiVocabToFlashcard(
  vocab: KanjiVocab,
  entry: KanjiEntry,
  index: number,
): Flashcard {
  return {
    id: `${entry.id}-v${index}`,
    kanji: vocab.word,
    hiragana: vocab.reading,
    meaning: vocab.meaning,
    sinoVietnamese: entry.sinoVietnamese,
    createdAt: Date.now(),
  }
}

/**
 * Extract all vocabs from all KanjiEntries as Flashcards.
 * Each vocabulary word across all kanji entries becomes a separate flashcard.
 */
export function kanjiEntriesToFlashcards(entries: KanjiEntry[]): Flashcard[] {
  const cards: Flashcard[] = []
  for (const entry of entries) {
    entry.vocabs.forEach((vocab, i) => {
      cards.push(kanjiVocabToFlashcard(vocab, entry, i))
    })
  }
  return cards
}
