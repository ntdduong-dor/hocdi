import { useState, useRef } from 'react'
import { parsePdfFile } from '../../lib/parsePdf'
import type { PdfFormat } from '../../lib/parsePdf'
import { FileUp, Upload, Loader2, X, Info } from 'lucide-react'
import type { Flashcard } from '../../types'

interface PdfImportProps {
  onImport: (cards: Omit<Flashcard, 'id' | 'createdAt'>[]) => void
}

const FORMAT_OPTIONS: { key: PdfFormat; label: string; desc: string }[] = [
  { key: 'auto', label: 'Tự động', desc: 'Tự nhận dạng định dạng PDF' },
  { key: 'textbook', label: 'Sách giáo khoa', desc: 'PDF dạng sách Hán tự (có Âm Hán Việt viết hoa, onyomi, kunyomi)' },
  { key: 'table', label: 'Bảng/Danh sách', desc: 'PDF chứa bảng hoặc dữ liệu phân cách bằng dấu phẩy/tab' },
  { key: 'structured', label: 'Văn bản', desc: 'PDF chứa từ vựng xen kẽ tiếng Nhật và tiếng Việt' },
]

export default function PdfImport({ onImport }: PdfImportProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<Omit<Flashcard, 'id' | 'createdAt'>[]>([])
  const [fileName, setFileName] = useState('')
  const [format, setFormat] = useState<PdfFormat>('auto')
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const parseFile = async (file: File, fmt: PdfFormat) => {
    setLoading(true)
    setError('')

    try {
      const cards = await parsePdfFile(file, fmt)
      setPreview(cards)
      if (cards.length === 0) {
        setError('Không tìm thấy dữ liệu trong file PDF. Thử chọn định dạng khác.')
      }
    } catch {
      setError('Lỗi khi đọc file PDF. Vui lòng thử định dạng khác hoặc thử lại.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Chỉ hỗ trợ file PDF')
      return
    }

    setFileName(file.name)
    setCurrentFile(file)
    await parseFile(file, format)
  }

  const handleFormatChange = async (newFormat: PdfFormat) => {
    setFormat(newFormat)
    if (currentFile) {
      await parseFile(currentFile, newFormat)
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
    setFileName('')
    setCurrentFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleClear = () => {
    setPreview([])
    setFileName('')
    setCurrentFile(null)
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Nhập từ file PDF</h3>
      <p className="text-xs text-gray-500 mb-3">
        Upload file PDF chứa danh sách từ vựng. Hệ thống sẽ tự động nhận dạng Hán tự, Hiragana, nghĩa và âm Hán Việt.
      </p>

      {/* Format selection */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Định dạng PDF</label>
        <div className="flex flex-wrap gap-1.5">
          {FORMAT_OPTIONS.map(({ key, label, desc }) => (
            <button
              key={key}
              onClick={() => handleFormatChange(key)}
              className={`px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
                format === key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
              title={desc}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <Info size={12} />
          {FORMAT_OPTIONS.find((f) => f.key === format)?.desc}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors">
          <FileUp size={16} />
          {fileName || 'Chọn file PDF'}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {loading && <Loader2 size={20} className="text-blue-600 animate-spin" />}
      </div>

      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

      {preview.length > 0 && (
        <>
          <div className="mt-4 text-xs text-gray-500 mb-2">
            Tìm thấy {preview.length} thẻ. Bạn có thể chỉnh sửa trước khi nhập.
          </div>
          <div className="border border-gray-200 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
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
