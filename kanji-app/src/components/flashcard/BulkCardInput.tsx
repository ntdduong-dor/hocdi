import { useState } from 'react'
import { parseBulkInput } from '../../lib/parseBulkInput'
import { Upload, Eye } from 'lucide-react'
import type { Flashcard } from '../../types'

interface BulkCardInputProps {
  onImport: (cards: Omit<Flashcard, 'id' | 'createdAt'>[]) => void
}

export default function BulkCardInput({ onImport }: BulkCardInputProps) {
  const [text, setText] = useState('')
  const [preview, setPreview] = useState<Omit<Flashcard, 'id' | 'createdAt'>[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const handlePreview = () => {
    const parsed = parseBulkInput(text)
    setPreview(parsed)
    setShowPreview(true)
  }

  const handleImport = () => {
    if (preview.length === 0) return
    onImport(preview)
    setText('')
    setPreview([])
    setShowPreview(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Nhập hàng loạt</h3>
      <p className="text-xs text-gray-500 mb-3">
        Mỗi dòng là một thẻ. Phân cách bằng dấu phẩy hoặc tab: <code className="bg-gray-100 px-1 rounded">Hán tự, Hiragana, Nghĩa, Âm Hán Việt</code>
      </p>
      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setShowPreview(false) }}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm resize-y"
        rows={6}
        placeholder={`人, ひと, người, NHÂN\n山, やま, núi, SƠN\n川, かわ, sông, XUYÊN`}
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={handlePreview}
          disabled={!text.trim()}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Eye size={16} /> Xem trước
        </button>
        {showPreview && preview.length > 0 && (
          <button
            onClick={handleImport}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload size={16} /> Nhập {preview.length} thẻ
          </button>
        )}
      </div>

      {showPreview && preview.length > 0 && (
        <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Hán tự</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Hiragana</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Nghĩa</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Âm HV</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((card, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-3 py-2 text-lg">{card.kanji || <span className="text-gray-300">-</span>}</td>
                  <td className="px-3 py-2">{card.hiragana || <span className="text-gray-300">-</span>}</td>
                  <td className="px-3 py-2">{card.meaning || <span className="text-gray-300">-</span>}</td>
                  <td className="px-3 py-2">{card.sinoVietnamese || <span className="text-gray-300">-</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPreview && preview.length === 0 && text.trim() && (
        <p className="text-sm text-red-500 mt-3">Không thể nhận dạng dữ liệu. Kiểm tra lại định dạng.</p>
      )}
    </div>
  )
}
