import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { useAdminStore } from '../../store/useAdminStore'
import LessonCard from '../dashboard/LessonCard'
import FolderCard from '../dashboard/FolderCard'
import LessonFormModal from '../lesson/LessonFormModal'
import FolderFormModal from './FolderFormModal'
import ConfirmDialog from '../ui/ConfirmDialog'
import EmptyState from '../ui/EmptyState'
import KanjiLessonCard from '../dashboard/KanjiLessonCard'
import { ChevronLeft, FilePlus, Edit2, Trash2, BookOpen, FolderPlus, ArrowLeft, Home, FolderOpen } from 'lucide-react'
import type { Lesson, Folder, KanjiLesson } from '../../types'

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>()
  const navigate = useNavigate()
  const { folders, lessons, kanjiLessons, addFolder, addLesson, updateLesson, deleteLesson, updateKanjiLesson, deleteKanjiLesson, updateFolder, deleteFolder } = useAppStore()
  const { isAdmin } = useAdminStore()

  const folder = folders.find((f) => f.id === folderId)
  const subFolders = folders.filter((f) => f.parentFolderId === folderId)
  const folderLessons = lessons.filter((l) => l.folderId === folderId)
  const folderKanjiLessons = kanjiLessons.filter((l) => l.folderId === folderId)

  // Build breadcrumb path
  const folderPath: Folder[] = []
  if (folder) {
    let current: Folder | undefined = folder
    while (current) {
      folderPath.unshift(current)
      current = current.parentFolderId ? folders.find((f) => f.id === current!.parentFolderId) : undefined
    }
  }

  const [lessonModal, setLessonModal] = useState(false)
  const [folderModal, setFolderModal] = useState(false)
  const [subFolderModal, setSubFolderModal] = useState(false)
  const [editFolder, setEditFolder] = useState<Folder | null>(null)
  const [editLesson, setEditLesson] = useState<Lesson | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'lesson' | 'kanjiLesson' | 'folder'; id: string; name: string } | null>(null)
  const [editKanjiLesson, setEditKanjiLesson] = useState<KanjiLesson | null>(null)
  const [kanjiLessonModal, setKanjiLessonModal] = useState(false)
  const [deleteFolderConfirm, setDeleteFolderConfirm] = useState(false)

  if (!folder) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Không tìm thấy thư mục</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">Về trang chủ</Link>
      </div>
    )
  }

  const parentLink = folder.parentFolderId ? `/folder/${folder.parentFolderId}` : '/'
  const isEmpty = subFolders.length === 0 && folderLessons.length === 0 && folderKanjiLessons.length === 0

  const handleDeleteTarget = () => {
    if (!deleteTarget) return
    if (deleteTarget.type === 'folder') {
      deleteFolder(deleteTarget.id)
    } else if (deleteTarget.type === 'kanjiLesson') {
      deleteKanjiLesson(deleteTarget.id)
    } else {
      deleteLesson(deleteTarget.id)
    }
  }

  return (
    <div>
      {/* Back button + Breadcrumb */}
      <div className="flex items-center gap-3 mb-4">
        <Link
          to={parentLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={16} />
          {folder.parentFolderId
            ? folders.find((f) => f.id === folder.parentFolderId)?.name || 'Quay lại'
            : 'Trang chủ'}
        </Link>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-gray-600 transition-colors">
            <Home size={13} /> Trang chủ
          </Link>
        {folderPath.map((f) => (
          <span key={f.id} className="flex items-center gap-1">
            <ChevronLeft size={14} className="rotate-180" />
            {f.id === folder.id ? (
              <span className="inline-flex items-center gap-1 text-gray-600 font-medium">
                <FolderOpen size={13} /> {f.name}
              </span>
            ) : (
              <Link to={`/folder/${f.id}`} className="inline-flex items-center gap-1 hover:text-gray-600 transition-colors">
                <FolderOpen size={13} /> {f.name}
              </Link>
            )}
          </span>
        ))}
        </div>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{folder.name}</h1>
          {folder.description && <p className="text-gray-500 mt-1">{folder.description}</p>}
          <p className="text-sm text-gray-400 mt-1">
            {subFolders.length > 0 && `${subFolders.length} thư mục con · `}
            {folderLessons.length + folderKanjiLessons.length} bài học
          </p>
        </div>
        {isAdmin && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFolderModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Sửa thư mục"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => setDeleteFolderConfirm(true)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Xóa thư mục"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={() => { setEditFolder(null); setSubFolderModal(true) }}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FolderPlus size={16} /> Thư mục con
            </button>
            <button
              onClick={() => { setEditLesson(null); setLessonModal(true) }}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FilePlus size={16} /> Bài học
            </button>
            <Link
              to={`/kanji/new?folderId=${folderId}`}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <BookOpen size={16} /> Hán tự
            </Link>
          </div>
        )}
      </div>

      {isEmpty ? (
        <EmptyState
          icon={<BookOpen size={48} />}
          title="Thư mục trống"
          description={isAdmin ? "Thêm thư mục con hoặc bài học vào thư mục này để bắt đầu" : "Thư mục này chưa có nội dung"}
          action={isAdmin ? (
            <div className="flex gap-2">
              <button
                onClick={() => setSubFolderModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FolderPlus size={16} /> Thư mục con
              </button>
              <button
                onClick={() => setLessonModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FilePlus size={16} /> Bài học
              </button>
              <Link
                to={`/kanji/new?folderId=${folderId}`}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <BookOpen size={16} /> Hán tự
              </Link>
            </div>
          ) : undefined}
        />
      ) : (
        <>
          {/* Sub-folders */}
          {subFolders.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Thư mục con</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subFolders.map((sub) => {
                  const subLessons = lessons.filter((l) => l.folderId === sub.id).length + kanjiLessons.filter((l) => l.folderId === sub.id).length
                  return (
                    <FolderCard
                      key={sub.id}
                      folder={sub}
                      lessonCount={subLessons}
                      onEdit={() => { setEditFolder(sub); setSubFolderModal(true) }}
                      onDelete={() => setDeleteTarget({ type: 'folder', id: sub.id, name: sub.name })}
                      isAdmin={isAdmin}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Lessons */}
          {(folderLessons.length > 0 || folderKanjiLessons.length > 0) && (
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Bài học</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {folderLessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onEdit={() => { setEditLesson(lesson); setLessonModal(true) }}
                    onDelete={() => setDeleteTarget({ type: 'lesson', id: lesson.id, name: lesson.name })}
                    isAdmin={isAdmin}
                  />
                ))}
                {folderKanjiLessons.map((lesson) => (
                  <KanjiLessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onEdit={() => { setEditKanjiLesson(lesson); setKanjiLessonModal(true) }}
                    onDelete={() => setDeleteTarget({ type: 'kanjiLesson', id: lesson.id, name: lesson.name })}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Lesson form */}
      <LessonFormModal
        isOpen={lessonModal}
        onClose={() => { setLessonModal(false); setEditLesson(null) }}
        onSubmit={(name, fid, description) => {
          if (editLesson) {
            updateLesson(editLesson.id, { name, folderId: fid, description })
          } else {
            addLesson(name, fid, description)
          }
        }}
        lesson={editLesson}
        defaultFolderId={folderId}
      />

      {/* Edit this folder */}
      <FolderFormModal
        isOpen={folderModal}
        onClose={() => setFolderModal(false)}
        onSubmit={(name, description) => updateFolder(folder.id, { name, description })}
        folder={folder}
      />

      {/* Create/edit subfolder */}
      <FolderFormModal
        isOpen={subFolderModal}
        onClose={() => { setSubFolderModal(false); setEditFolder(null) }}
        onSubmit={(name, description) => {
          if (editFolder) {
            updateFolder(editFolder.id, { name, description })
          } else {
            addFolder(name, description, folderId)
          }
        }}
        folder={editFolder}
      />

      {/* Edit kanji lesson */}
      <LessonFormModal
        isOpen={kanjiLessonModal}
        onClose={() => { setKanjiLessonModal(false); setEditKanjiLesson(null) }}
        onSubmit={(name, fid, description) => {
          if (editKanjiLesson) {
            updateKanjiLesson(editKanjiLesson.id, { name, folderId: fid, description })
          }
          setEditKanjiLesson(null)
        }}
        lesson={editKanjiLesson ? { id: editKanjiLesson.id, name: editKanjiLesson.name, description: editKanjiLesson.description, folderId: editKanjiLesson.folderId } as Lesson : null}
        defaultFolderId={folderId}
      />

      {/* Delete lesson/subfolder */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteTarget}
        title={`Xóa ${deleteTarget?.type === 'folder' ? 'thư mục' : deleteTarget?.type === 'kanjiLesson' ? 'bài Hán tự' : 'bài học'}`}
        message={`Bạn có chắc muốn xóa "${deleteTarget?.name}"? ${
          deleteTarget?.type === 'folder'
            ? 'Các bài học trong thư mục con sẽ trở thành bài học độc lập.'
            : 'Tất cả dữ liệu sẽ bị xóa.'
        }`}
        confirmLabel="Xóa"
        danger
      />

      {/* Delete this folder */}
      <ConfirmDialog
        isOpen={deleteFolderConfirm}
        onClose={() => setDeleteFolderConfirm(false)}
        onConfirm={() => { deleteFolder(folder.id); navigate(parentLink) }}
        title="Xóa thư mục"
        message={`Bạn có chắc muốn xóa thư mục "${folder.name}"? Tất cả thư mục con và bài học sẽ trở thành bài học độc lập.`}
        confirmLabel="Xóa"
        danger
      />
    </div>
  )
}
