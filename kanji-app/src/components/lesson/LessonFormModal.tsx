import { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import { useAppStore } from '../../store/useAppStore'
import type { Lesson } from '../../types'

interface LessonFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string, folderId: string | null, description: string) => void
  lesson?: Lesson | null
  defaultFolderId?: string | null
}

export default function LessonFormModal({
  isOpen,
  onClose,
  onSubmit,
  lesson,
  defaultFolderId = null,
}: LessonFormModalProps) {
  const folders = useAppStore((s) => s.folders)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [folderId, setFolderId] = useState<string | null>(null)

  useEffect(() => {
    if (lesson) {
      setName(lesson.name)
      setDescription(lesson.description)
      setFolderId(lesson.folderId)
    } else {
      setName('')
      setDescription('')
      setFolderId(defaultFolderId)
    }
  }, [lesson, defaultFolderId, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit(name.trim(), folderId, description.trim())
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lesson ? 'Sửa bài học' : 'Tạo bài học mới'}
      size="sm"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên bài học</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Ví dụ: Bài 1 - Gia đình"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Thư mục (tùy chọn)</label>
          <select
            value={folderId || ''}
            onChange={(e) => setFolderId(e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
          >
            <option value="">Không có thư mục</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả (tùy chọn)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
            rows={2}
            placeholder="Mô tả ngắn về bài học"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {lesson ? 'Cập nhật' : 'Tạo'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
