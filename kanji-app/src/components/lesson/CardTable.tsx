import { Edit2, Trash2 } from 'lucide-react'
import type { Flashcard } from '../../types'

interface CardTableProps {
  cards: Flashcard[]
  onEdit: (card: Flashcard) => void
  onDelete: (cardId: string) => void
  isAdmin?: boolean
}

export default function CardTable({ cards, onEdit, onDelete, isAdmin = true }: CardTableProps) {
  if (cards.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-10">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Hán tự</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Hiragana</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nghĩa</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Âm HV</th>
              {isAdmin && <th className="px-4 py-3 w-20"></th>}
            </tr>
          </thead>
          <tbody>
            {cards.map((card, i) => (
              <tr key={card.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-xs text-gray-400">{i + 1}</td>
                <td className="px-4 py-3 text-xl font-medium">{card.kanji || <span className="text-gray-300">-</span>}</td>
                <td className="px-4 py-3">{card.hiragana || <span className="text-gray-300">-</span>}</td>
                <td className="px-4 py-3">{card.meaning || <span className="text-gray-300">-</span>}</td>
                <td className="px-4 py-3 text-gray-600">{card.sinoVietnamese || <span className="text-gray-300">-</span>}</td>
                {isAdmin && (
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEdit(card)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Sửa"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(card.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
