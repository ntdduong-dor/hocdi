import { useState } from 'react'
import { Plus } from 'lucide-react'

interface ManualCardFormProps {
  onAdd: (card: { kanji: string; hiragana: string; meaning: string; sinoVietnamese: string }) => void
}

export default function ManualCardForm({ onAdd }: ManualCardFormProps) {
  const [kanji, setKanji] = useState('')
  const [hiragana, setHiragana] = useState('')
  const [meaning, setMeaning] = useState('')
  const [sinoVietnamese, setSinoVietnamese] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!kanji.trim() && !hiragana.trim() && !meaning.trim()) return
    onAdd({
      kanji: kanji.trim(),
      hiragana: hiragana.trim(),
      meaning: meaning.trim(),
      sinoVietnamese: sinoVietnamese.trim(),
    })
    setKanji('')
    setHiragana('')
    setMeaning('')
    setSinoVietnamese('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Thêm thẻ mới</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Hán tự</label>
          <input
            type="text"
            value={kanji}
            onChange={(e) => setKanji(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
            placeholder="漢字"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Hiragana</label>
          <input
            type="text"
            value={hiragana}
            onChange={(e) => setHiragana(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="かんじ"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Nghĩa tiếng Việt</label>
          <input
            type="text"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="chữ Hán"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Âm Hán Việt</label>
          <input
            type="text"
            value={sinoVietnamese}
            onChange={(e) => setSinoVietnamese(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="HÁN TỰ"
          />
        </div>
      </div>
      <button
        type="submit"
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={16} /> Thêm thẻ
      </button>
    </form>
  )
}
