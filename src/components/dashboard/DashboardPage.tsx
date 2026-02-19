import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { useAdminStore } from '../../store/useAdminStore'
import FolderCard from './FolderCard'
import LessonCard from './LessonCard'
import KanjiLessonCard from './KanjiLessonCard'
import FolderFormModal from '../folder/FolderFormModal'
import LessonFormModal from '../lesson/LessonFormModal'
import ConfirmDialog from '../ui/ConfirmDialog'
import EmptyState from '../ui/EmptyState'
import { FolderPlus, FilePlus, BookOpen, Languages } from 'lucide-react'
import type { Folder, Lesson, KanjiLesson } from '../../types'

export default function DashboardPage() {
  const { folders, lessons, kanjiLessons, addFolder, updateFolder, deleteFolder, addLesson, updateLesson, deleteLesson, updateKanjiLesson, deleteKanjiLesson } = useAppStore()
  const { isAdmin } = useAdminStore()
  const rootFolders = folders.filter((f) => !f.parentFolderId)
  const standaloneLessons = lessons.filter((l) => l.folderId === null)
  const standaloneKanjiLessons = kanjiLessons.filter((l) => l.folderId === null)

  const [folderModal, setFolderModal] = useState(false)
  const [lessonModal, setLessonModal] = useState(false)
  const [kanjiLessonModal, setKanjiLessonModal] = useState(false)
  const [editFolder, setEditFolder] = useState<Folder | null>(null)
  const [editLesson, setEditLesson] = useState<Lesson | null>(null)
  const [editKanjiLesson, setEditKanjiLesson] = useState<KanjiLesson | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'folder' | 'lesson' | 'kanjiLesson'; id: string; name: string } | null>(null)

  const handleFolderSubmit = (name: string, description: string) => {
    if (editFolder) {
      updateFolder(editFolder.id, { name, description })
    } else {
      addFolder(name, description)
    }
    setEditFolder(null)
  }

  const handleLessonSubmit = (name: string, folderId: string | null, description: string) => {
    if (editLesson) {
      updateLesson(editLesson.id, { name, folderId, description })
    } else {
      addLesson(name, folderId, description)
    }
    setEditLesson(null)
  }

  const handleKanjiLessonSubmit = (name: string, folderId: string | null, description: string) => {
    if (editKanjiLesson) {
      updateKanjiLesson(editKanjiLesson.id, { name, folderId, description })
    }
    setEditKanjiLesson(null)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    if (deleteTarget.type === 'folder') {
      deleteFolder(deleteTarget.id)
    } else if (deleteTarget.type === 'kanjiLesson') {
      deleteKanjiLesson(deleteTarget.id)
    } else {
      deleteLesson(deleteTarget.id)
    }
  }

  const isEmpty = rootFolders.length === 0 && standaloneLessons.length === 0 && standaloneKanjiLessons.length === 0

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bài học của tôi</h1>
        {isAdmin && (
          <div className="flex gap-2">
            <button
              onClick={() => { setEditFolder(null); setFolderModal(true) }}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FolderPlus size={16} /> Thư mục
            </button>
            <button
              onClick={() => { setEditLesson(null); setLessonModal(true) }}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FilePlus size={16} /> Bài học
            </button>
            <Link
              to="/kanji/new"
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
          title="Chưa có bài học nào"
          description={isAdmin ? "Tạo thư mục hoặc bài học để bắt đầu học Hán tự" : "Chưa có bài học nào được tạo"}
          action={isAdmin ? (
            <div className="flex gap-2">
              <button
                onClick={() => setLessonModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FilePlus size={16} /> Tạo bài học
              </button>
              <Link
                to="/kanji/new"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <BookOpen size={16} /> Bài Hán tự
              </Link>
            </div>
          ) : undefined}
        />
      ) : (
        <>
          {rootFolders.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Thư mục</h2>
                {isAdmin && (
                  <button
                    onClick={() => { setEditFolder(null); setFolderModal(true) }}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <FolderPlus size={14} /> Thêm
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rootFolders.map((folder) => {
                  const subFolderCount = folders.filter((f) => f.parentFolderId === folder.id).length
                  const directLessons = lessons.filter((l) => l.folderId === folder.id).length + kanjiLessons.filter((l) => l.folderId === folder.id).length
                  return (
                    <FolderCard
                      key={folder.id}
                      folder={folder}
                      lessonCount={directLessons + subFolderCount}
                      onEdit={() => { setEditFolder(folder); setFolderModal(true) }}
                      onDelete={() => setDeleteTarget({ type: 'folder', id: folder.id, name: folder.name })}
                      isAdmin={isAdmin}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {standaloneLessons.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Bài học</h2>
                {isAdmin && (
                  <button
                    onClick={() => { setEditLesson(null); setLessonModal(true) }}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <FilePlus size={14} /> Thêm
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {standaloneLessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onEdit={() => { setEditLesson(lesson); setLessonModal(true) }}
                    onDelete={() => setDeleteTarget({ type: 'lesson', id: lesson.id, name: lesson.name })}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            </div>
          )}

          {standaloneKanjiLessons.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Bài Hán tự</h2>
                {isAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => { setEditFolder(null); setFolderModal(true) }}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <FolderPlus size={14} /> Thư mục
                    </button>
                    <Link
                      to="/kanji/new"
                      className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <BookOpen size={14} /> Thêm
                    </Link>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {standaloneKanjiLessons.map((lesson) => (
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

      {/* Grammar section */}
      <div className="mb-8 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ngữ pháp</h2>
        </div>
        <Link
          to="/grammar"
          className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl hover:shadow-md hover:shadow-purple-100/50 hover:border-purple-300 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
            <Languages size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
              Tổng hợp ngữ pháp N3
            </h3>
            <p className="text-sm text-gray-500">Tra cứu cấu trúc, giải thích và ví dụ</p>
          </div>
        </Link>
      </div>

      <FolderFormModal
        isOpen={folderModal}
        onClose={() => { setFolderModal(false); setEditFolder(null) }}
        onSubmit={handleFolderSubmit}
        folder={editFolder}
      />

      <LessonFormModal
        isOpen={lessonModal}
        onClose={() => { setLessonModal(false); setEditLesson(null) }}
        onSubmit={handleLessonSubmit}
        lesson={editLesson}
      />

      <LessonFormModal
        isOpen={kanjiLessonModal}
        onClose={() => { setKanjiLessonModal(false); setEditKanjiLesson(null) }}
        onSubmit={handleKanjiLessonSubmit}
        lesson={editKanjiLesson ? { id: editKanjiLesson.id, name: editKanjiLesson.name, description: editKanjiLesson.description, folderId: editKanjiLesson.folderId } as Lesson : null}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={`Xóa ${deleteTarget?.type === 'folder' ? 'thư mục' : deleteTarget?.type === 'kanjiLesson' ? 'bài Hán tự' : 'bài học'}`}
        message={`Bạn có chắc muốn xóa "${deleteTarget?.name}"? ${
          deleteTarget?.type === 'folder'
            ? 'Các bài học trong thư mục sẽ trở thành bài học độc lập.'
            : 'Tất cả dữ liệu sẽ bị xóa.'
        }`}
        confirmLabel="Xóa"
        danger
      />
    </div>
  )
}
