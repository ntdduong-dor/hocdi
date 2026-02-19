import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, ChevronLeft, X } from 'lucide-react'
import { n3Grammar } from '../../data/grammar/n3-grammar'
import GrammarDetailDialog from './GrammarDetailDialog'
import type { GrammarPoint } from '../../types/grammar'

export default function GrammarPage() {
  const [search, setSearch] = useState('')
  const [selectedGrammar, setSelectedGrammar] = useState<GrammarPoint | null>(null)

  const filtered = useMemo(() => {
    if (!search.trim()) return n3Grammar
    const q = search.trim().toLowerCase()
    return n3Grammar.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.meaning.toLowerCase().includes(q) ||
        g.explanation.toLowerCase().includes(q) ||
        g.structure.some((s) => s.toLowerCase().includes(q)) ||
        g.examples.some(
          (ex) => ex.ja.toLowerCase().includes(q) || ex.vi.toLowerCase().includes(q)
        )
    )
  }, [search])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={16} /> Trang chủ
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen size={24} className="text-purple-600" />
            Ngữ pháp N3
          </h1>
        </div>
        <span className="text-sm text-gray-400">{n3Grammar.length} mẫu</span>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm ngữ pháp... (VD: ために, càng, nhờ có...)"
          className="w-full pl-10 pr-10 py-3 text-sm sm:text-base border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results count */}
      {search && (
        <p className="text-sm text-gray-500 mb-3">
          Tìm thấy <span className="font-semibold text-purple-600">{filtered.length}</span> kết quả
        </p>
      )}

      {/* Grammar list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Không tìm thấy ngữ pháp nào</p>
          <button
            onClick={() => setSearch('')}
            className="mt-2 text-sm text-purple-600 hover:underline"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGrammar(g)}
              className="text-left bg-white rounded-xl border border-gray-200 p-4 hover:border-purple-300 hover:shadow-md hover:shadow-purple-100/50 transition-all group active:scale-[0.98]"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {g.title}
                </h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                  {g.examples.length} VD
                </span>
              </div>
              <p className="text-sm text-blue-600 font-medium mt-1 line-clamp-1">
                {g.meaning}
              </p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                {g.explanation}
              </p>
              <div className="flex flex-wrap gap-1 mt-2.5">
                {g.structure.slice(0, 2).map((s, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100"
                  >
                    {s}
                  </span>
                ))}
                {g.structure.length > 2 && (
                  <span className="text-[11px] text-gray-400">
                    +{g.structure.length - 2}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail dialog */}
      {selectedGrammar && (
        <GrammarDetailDialog
          grammar={selectedGrammar}
          onClose={() => setSelectedGrammar(null)}
        />
      )}
    </div>
  )
}
