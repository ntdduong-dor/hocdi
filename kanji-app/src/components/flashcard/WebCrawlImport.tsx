import { useState } from 'react'
import { crawlWebPage } from '../../lib/parseWebPage'
import { Globe, Upload, Loader2, X, ExternalLink } from 'lucide-react'
import type { Flashcard } from '../../types'

interface WebCrawlImportProps {
  onImport: (cards: Omit<Flashcard, 'id' | 'createdAt'>[]) => void
}

export default function WebCrawlImport({ onImport }: WebCrawlImportProps) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<Omit<Flashcard, 'id' | 'createdAt'>[]>([])
  const [resultInfo, setResultInfo] = useState<{ title: string; method: string } | null>(null)

  const handleCrawl = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    // Basic URL validation
    let finalUrl = url.trim()
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl
    }

    try {
      new URL(finalUrl)
    } catch {
      setError('URL không hợp lệ')
      return
    }

    setLoading(true)
    setError('')
    setPreview([])
    setResultInfo(null)

    try {
      const result = await crawlWebPage(finalUrl)
      setPreview(result.cards)
      setResultInfo({ title: result.title, method: result.method })

      if (result.cards.length === 0) {
        setError('Không tìm thấy từ vựng trên trang web này. Trang cần chứa bảng hoặc danh sách từ vựng tiếng Nhật.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi đọc trang web. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleEditPreview = (index: number, field: keyof Omit<Flashcard, 'id' | 'createdAt'>, value: string) => {
    setPreview((prev) => prev.map((card, i) => i === index ? { ...card, [field]: value } : card))
  }

  const handleRemoveRow = (index: number) => {
    setPreview((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImport = () => {
    const validCards = preview.filter((c) => c.kanji || c.hiragana || c.meaning)
    if (validCards.length === 0) return
    onImport(validCards)
    setPreview([])
    setUrl('')
    setResultInfo(null)
  }

  const handleClear = () => {
    setPreview([])
    setError('')
    setResultInfo(null)
  }

  const METHOD_LABELS: Record<string, string> = {
    table: 'bảng HTML',
    list: 'danh sách',
    generic: 'trích xuất văn bản',
    none: 'không tìm thấy',
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Nhập từ trang web</h3>
      <p className="text-xs text-gray-500 mb-3">
        Dán đường link trang web chứa từ vựng tiếng Nhật. Hỗ trợ các trang như tiengnhatdongian.com, mazii.net, v.v.
      </p>

      <form onSubmit={handleCrawl} className="flex gap-2">
        <div className="relative flex-1">
          <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            placeholder="https://www.tiengnhatdongian.com/..."
          />
        </div>
        <button
          type="submit"
          disabled={!url.trim() || loading}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <ExternalLink size={16} />}
          Lấy dữ liệu
        </button>
      </form>

      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

      {resultInfo && preview.length > 0 && (
        <div className="mt-3 text-xs text-gray-500">
          {resultInfo.title && <span className="font-medium">{resultInfo.title}</span>}
          {resultInfo.title && ' — '}
          Tìm thấy {preview.length} thẻ (qua {METHOD_LABELS[resultInfo.method] || resultInfo.method}).
          Bạn có thể chỉnh sửa trước khi nhập.
        </div>
      )}

      {preview.length > 0 && (
        <>
          <div className="mt-3 border border-gray-200 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 w-8">#</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Hán tự</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Hiragana</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Nghĩa</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500">Âm HV</th>
                  <th className="px-2 py-2 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {preview.map((card, i) => (
                  <tr key={i} className="border-t border-gray-100">
                    <td className="px-2 py-1 text-xs text-gray-400">{i + 1}</td>
                    <td className="px-2 py-1">
                      <input
                        value={card.kanji}
                        onChange={(e) => handleEditPreview(i, 'kanji', e.target.value)}
                        className="w-full px-1 py-0.5 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded outline-none text-lg"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <input
                        value={card.hiragana}
                        onChange={(e) => handleEditPreview(i, 'hiragana', e.target.value)}
                        className="w-full px-1 py-0.5 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded outline-none"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <input
                        value={card.meaning}
                        onChange={(e) => handleEditPreview(i, 'meaning', e.target.value)}
                        className="w-full px-1 py-0.5 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded outline-none"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <input
                        value={card.sinoVietnamese}
                        onChange={(e) => handleEditPreview(i, 'sinoVietnamese', e.target.value)}
                        className="w-full px-1 py-0.5 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded outline-none"
                      />
                    </td>
                    <td className="px-2 py-1">
                      <button
                        onClick={() => handleRemoveRow(i)}
                        className="p-0.5 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={handleImport}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={16} /> Nhập {preview.filter((c) => c.kanji || c.hiragana || c.meaning).length} thẻ
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
          </div>
        </>
      )}
    </div>
  )
}
