import { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import type { Flashcard } from '../../types'

interface CardEditModalProps {
  isOpen: boolean
  onClose: () => void
  card: Flashcard | null
  onSave: (data: Partial<Omit<Flashcard, 'id' | 'createdAt'>>) => void
}

export default function CardEditModal({ isOpen, onClose, card, onSave }: CardEditModalProps) {
  const [kanji, setKanji] = useState('')
  const [hiragana, setHiragana] = useState('')
  const [meaning, setMeaning] = useState('')
  const [sinoVietnamese, setSinoVietnamese] = useState('')

  useEffect(() => {
    if (card) {
      setKanji(card.kanji)
      setHiragana(card.hiragana)
      setMeaning(card.meaning)
      setSinoVietnamese(card.sinoVietnamese)
    }
  }, [card, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      kanji: kanji.trim(),
      hiragana: hiragana.trim(),
      meaning: meaning.trim(),
      sinoVietnamese: sinoVietnamese.trim(),
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sửa thẻ" size="md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hán tự</label>
            <input
              type="text"
              value={kanji}
              onChange={(e) => setKanji(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hiragana</label>
            <input
              type="text"
              value={hiragana}
              onChange={(e) => setHiragana(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nghĩa tiếng Việt</label>
            <input
              type="text"
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Âm Hán Việt</label>
            <input
              type="text"
              value={sinoVietnamese}
              onChange={(e) => setSinoVietnamese(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Lưu
          </button>
        </div>
      </form>
    </Modal>
  )
}
