import { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import type { Folder } from '../../types'

interface FolderFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string, description: string) => void
  folder?: Folder | null
}

export default function FolderFormModal({ isOpen, onClose, onSubmit, folder }: FolderFormModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (folder) {
      setName(folder.name)
      setDescription(folder.description)
    } else {
      setName('')
      setDescription('')
    }
  }, [folder, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit(name.trim(), description.trim())
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={folder ? 'Sửa thư mục' : 'Tạo thư mục mới'}
      size="sm"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên thư mục</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            placeholder="Ví dụ: JLPT N4"
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả (tùy chọn)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
            rows={2}
            placeholder="Mô tả ngắn về thư mục"
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
            {folder ? 'Cập nhật' : 'Tạo'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
