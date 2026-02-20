import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { useAdminStore } from '../../store/useAdminStore'
import CardTable from './CardTable'
import ManualCardForm from '../flashcard/ManualCardForm'
import BulkCardInput from '../flashcard/BulkCardInput'
import PdfImport from '../flashcard/PdfImport'
import WebCrawlImport from '../flashcard/WebCrawlImport'
import CardEditModal from '../flashcard/CardEditModal'
import LessonFormModal from './LessonFormModal'
import ConfirmDialog from '../ui/ConfirmDialog'
import EmptyState from '../ui/EmptyState'
import InlineFlashcardBrowser from '../ui/InlineFlashcardBrowser'
import {
  ChevronLeft, Play, ClipboardCheck, Edit2, Trash2, Layers,
  Type, FileText, FileUp, Globe, ArrowLeft, Home, FolderOpen, Search, X,
} from 'lucide-react'
import type { Flashcard } from '../../types'

type InputMode = 'manual' | 'bulk' | 'pdf' | 'web'

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { lessons, folders, addCard, addCards, updateCard, deleteCard, updateLesson, deleteLesson } = useAppStore()
  const { isAdmin } = useAdminStore()

  const lesson = lessons.find((l) => l.id === lessonId)
  const folder = lesson?.folderId ? folders.find((f) => f.id === lesson.folderId) : null

  const [inputMode, setInputMode] = useState<InputMode>('manual')
  const [editCard, setEditCard] = useState<Flashcard | null>(null)
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null)
  const [lessonModal, setLessonModal] = useState(false)
  const [deleteLessonConfirm, setDeleteLessonConfirm] = useState(false)
  const [search, setSearch] = useState('')

  const filteredCards = useMemo(() => {
    if (!lesson || !search.trim()) return lesson?.cards ?? []
    const q = search.trim().toLowerCase()
    return lesson.cards.filter((c) =>
      (c.kanji && c.kanji.toLowerCase().includes(q)) ||
      (c.hiragana && c.hiragana.toLowerCase().includes(q)) ||
      (c.meaning && c.meaning.toLowerCase().includes(q)) ||
      (c.sinoVietnamese && c.sinoVietnamese.toLowerCase().includes(q))
    )
  }, [lesson, search])

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Không tìm thấy bài học</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">Về trang chủ</Link>
      </div>
    )
  }

  const inputModes: { key: InputMode; label: string; icon: React.ReactNode }[] = [
    { key: 'manual', label: 'Thủ công', icon: <Type size={14} /> },
    { key: 'bulk', label: 'Hàng loạt', icon: <FileText size={14} /> },
    { key: 'pdf', label: 'PDF', icon: <FileUp size={14} /> },
    { key: 'web', label: 'Trang web', icon: <Globe size={14} /> },
  ]

  return (
    <div>
      {/* Back button + Breadcrumb */}
      <div className="flex items-center gap-3 mb-4">
        <Link
          to={folder ? `/folder/${folder.id}` : '/'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={16} />
          {folder ? folder.name : 'Trang chủ'}
        </Link>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-gray-600 transition-colors">
            <Home size={13} /> Trang chủ
          </Link>
          {folder && (
            <>
              <ChevronLeft size={14} className="rotate-180" />
              <Link to={`/folder/${folder.id}`} className="inline-flex items-center gap-1 hover:text-gray-600 transition-colors">
                <FolderOpen size={13} /> {folder.name}
              </Link>
            </>
          )}
          <ChevronLeft size={14} className="rotate-180" />
          <span className="inline-flex items-center gap-1 text-gray-600">
            <FileText size={13} /> {lesson.name}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{lesson.name}</h1>
          {lesson.description && <p className="text-gray-500 mt-1">{lesson.description}</p>}
          <p className="text-sm text-gray-400 mt-1">{lesson.cards.length} thẻ</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isAdmin && (
            <>
              <button
                onClick={() => setLessonModal(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sửa bài học"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => setDeleteLessonConfirm(true)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Xóa bài học"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
          {lesson.cards.length > 0 && (
            <>
              <Link
                to={`/lesson/${lesson.id}/study`}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play size={16} /> Học
              </Link>
              {lesson.cards.length >= 4 && (
                <Link
                  to={`/lesson/${lesson.id}/quiz`}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <ClipboardCheck size={16} /> Kiểm tra
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* Inline Flashcard Browser */}
      {lesson.cards.length > 0 && (
        <InlineFlashcardBrowser cards={lesson.cards} accent="blue" />
      )}

      {/* Input Mode Tabs - Admin only */}
      {isAdmin && (
        <>
          <div className="flex items-center gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
            {inputModes.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setInputMode(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  inputMode === key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="mb-6">
            {inputMode === 'manual' && (
              <ManualCardForm onAdd={(card) => addCard(lesson.id, card)} />
            )}
            {inputMode === 'bulk' && (
              <BulkCardInput onImport={(cards) => addCards(lesson.id, cards)} />
            )}
            {inputMode === 'pdf' && (
              <PdfImport onImport={(cards) => addCards(lesson.id, cards)} />
            )}
            {inputMode === 'web' && (
              <WebCrawlImport onImport={(cards) => addCards(lesson.id, cards)} />
            )}
          </div>
        </>
      )}

      {/* Search */}
      {lesson.cards.length > 0 && (
        <div className="relative mb-3">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm thẻ..."
            className="w-full pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white placeholder-gray-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* Card Table */}
      {lesson.cards.length > 0 ? (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Danh sách thẻ ({search.trim() ? `${filteredCards.length}/${lesson.cards.length}` : lesson.cards.length})
          </h2>
          {filteredCards.length > 0 ? (
            <CardTable
              cards={filteredCards}
              onEdit={setEditCard}
              onDelete={setDeleteCardId}
              isAdmin={isAdmin}
            />
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Search size={36} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">Không tìm thấy "{search}"</p>
              <button onClick={() => setSearch('')} className="text-xs text-blue-500 hover:underline mt-1">Xóa tìm kiếm</button>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={<Layers size={48} />}
          title="Chưa có thẻ nào"
          description="Thêm thẻ bằng cách nhập thủ công, nhập hàng loạt, từ file PDF hoặc từ trang web"
        />
      )}

      {/* Modals */}
      <CardEditModal
        isOpen={!!editCard}
        onClose={() => setEditCard(null)}
        card={editCard}
        onSave={(data) => {
          if (editCard) updateCard(lesson.id, editCard.id, data)
        }}
      />

      <LessonFormModal
        isOpen={lessonModal}
        onClose={() => setLessonModal(false)}
        onSubmit={(name, folderId, description) => updateLesson(lesson.id, { name, folderId, description })}
        lesson={lesson}
      />

      <ConfirmDialog
        isOpen={!!deleteCardId}
        onClose={() => setDeleteCardId(null)}
        onConfirm={() => deleteCardId && deleteCard(lesson.id, deleteCardId)}
        title="Xóa thẻ"
        message="Bạn có chắc muốn xóa thẻ này?"
        confirmLabel="Xóa"
        danger
      />

      <ConfirmDialog
        isOpen={deleteLessonConfirm}
        onClose={() => setDeleteLessonConfirm(false)}
        onConfirm={() => { deleteLesson(lesson.id); navigate('/') }}
        title="Xóa bài học"
        message={`Bạn có chắc muốn xóa "${lesson.name}"? Tất cả thẻ sẽ bị xóa.`}
        confirmLabel="Xóa"
        danger
      />
    </div>
  )
}
