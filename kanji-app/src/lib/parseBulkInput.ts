import type { Flashcard } from '../types'

export function parseBulkInput(text: string): Omit<Flashcard, 'id' | 'createdAt'>[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.includes('\t')
        ? line.split('\t')
        : line.split(',')

      return {
        kanji: (parts[0] || '').trim(),
        hiragana: (parts[1] || '').trim(),
        meaning: (parts[2] || '').trim(),
        sinoVietnamese: (parts[3] || '').trim(),
      }
    })
}
