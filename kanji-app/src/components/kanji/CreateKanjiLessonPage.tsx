import { useState, useRef } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { useAdminStore } from '../../store/useAdminStore'
import { parseKanjiDictionaryPdf } from '../../lib/parseKanjiPdf'
import { FileUp, Loader2, Upload, ArrowLeft, Trash2, BookOpen } from 'lucide-react'
import type { KanjiEntry } from '../../types'

export default function CreateKanjiLessonPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const folderId = searchParams.get('folderId')
  const { addKanjiLesson, folders } = useAppStore()
  const { isAdmin } = useAdminStore()

  if (!isAdmin) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Bạn cần quyền quản trị để tạo bài học</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">Về trang chủ</Link>
      </div>
    )
  }
  const folder = folderId ? folders.find((f) => f.id === folderId) : null

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(folderId)
  const [entries, setEntries] = useState<KanjiEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Chỉ hỗ trợ file PDF')
      return
    }

    setFileName(file.name)
    setLoading(true)
    setError('')

    try {
      const parsed = await parseKanjiDictionaryPdf(file)
      setEntries(parsed)
      if (parsed.length === 0) {
        setError('Không tìm thấy dữ liệu Hán tự trong file PDF.')
      }
      if (!name) {
        setName(file.name.replace(/\.pdf$/i, ''))
      }
    } catch {
      setError('Lỗi khi đọc file PDF.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  const handleCreate = () => {
    if (!name.trim() || entries.length === 0) return
    const lesson = addKanjiLesson(name.trim(), selectedFolderId, entries, description.trim())
    navigate(`/kanji/${lesson.id}`)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          to={folder ? `/folder/${folder.id}` : '/'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={16} /> Quay lại
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={24} className="text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">Tạo bài học Hán tự</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên bài học</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Kanji chương 11"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả (tùy chọn)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả ngắn..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Folder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thư mục (tùy chọn)</label>
            <select
              value={selectedFolderId || ''}
              onChange={(e) => setSelectedFolderId(e.target.value || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            >
              <option value="">Không thuộc thư mục</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nhập từ PDF</label>
            <p className="text-xs text-gray-500 mb-2">
              Upload file PDF dạng sách Hán tự (có trang âm Hán Việt + trang từ vựng).
            </p>
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
              {loading && <Loader2 size={20} className="text-orange-500 animate-spin" />}
            </div>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          </div>

          {/* Preview */}
          {entries.length > 0 && (
            <div>
              <div className="text-sm text-gray-500 mb-2">
                Tìm thấy <span className="font-semibold text-orange-600">{entries.length}</span> Hán tự
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-12">Hán tự</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Âm HV</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">ON</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">KUN</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Từ vựng</th>
                      <th className="px-3 py-2 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-3 py-2 text-xl">{entry.character}</td>
                        <td className="px-3 py-2 text-orange-600 font-medium text-xs">{entry.sinoVietnamese}</td>
                        <td className="px-3 py-2 text-xs">{entry.onyomi}</td>
                        <td className="px-3 py-2 text-xs">{entry.kunyomi || '—'}</td>
                        <td className="px-3 py-2 text-xs text-gray-500">
                          {entry.vocabs.slice(0, 3).map((v) => v.word).join(', ')}
                          {entry.vocabs.length > 3 && ` +${entry.vocabs.length - 3}`}
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => handleRemoveEntry(entry.id)}
                            className="p-0.5 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Create button */}
          <button
            onClick={handleCreate}
            disabled={!name.trim() || entries.length === 0}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Upload size={18} />
            Tạo bài học ({entries.length} Hán tự)
          </button>
        </div>
      </div>
    </div>
  )
}
