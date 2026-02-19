import { Link } from 'react-router-dom'
import { Folder, MoreVertical, Edit2, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import type { Folder as FolderType } from '../../types'

interface FolderCardProps {
  folder: FolderType
  lessonCount: number
  onEdit: () => void
  onDelete: () => void
  isAdmin?: boolean
}

export default function FolderCard({ folder, lessonCount, onEdit, onDelete, isAdmin = true }: FolderCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
      <Link to={`/folder/${folder.id}`} className="block p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Folder size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{folder.name}</h3>
              <p className="text-sm text-gray-500">{lessonCount} bài học</p>
            </div>
          </div>
        </div>
        {folder.description && (
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{folder.description}</p>
        )}
      </Link>
      {isAdmin && (
        <div className="relative px-4 pb-3" ref={menuRef}>
          <button
            onClick={(e) => {
              e.preventDefault()
              setMenuOpen(!menuOpen)
            }}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreVertical size={16} />
          </button>
          {menuOpen && (
            <div className="absolute left-4 bottom-full mb-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[140px]">
              <button
                onClick={() => { onEdit(); setMenuOpen(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit2 size={14} /> Sửa
              </button>
              <button
                onClick={() => { onDelete(); setMenuOpen(false) }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} /> Xóa
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
