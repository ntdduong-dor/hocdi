import { X, BookOpen, Layers, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GrammarPoint } from '../../types/grammar'

interface GrammarDetailDialogProps {
  grammar: GrammarPoint | null
  onClose: () => void
}

export default function GrammarDetailDialog({ grammar, onClose }: GrammarDetailDialogProps) {
  if (!grammar) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-8 sm:pt-16 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-4 sm:px-6 py-4 flex items-start justify-between z-10">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
                {grammar.title}
              </h2>
              <p className="text-sm sm:text-base text-blue-600 font-medium mt-1">
                {grammar.meaning}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-4 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Structure */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Layers size={16} className="text-purple-500" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Cấu trúc
                </h3>
              </div>
              <div className="space-y-1.5">
                {grammar.structure.map((s, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 bg-purple-50 rounded-lg text-sm font-mono text-purple-800 border border-purple-100"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </section>

            {/* Explanation */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={16} className="text-green-500" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Giải thích
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed bg-green-50 rounded-lg px-4 py-3 border border-green-100">
                {grammar.explanation}
              </p>
            </section>

            {/* Examples */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle size={16} className="text-orange-500" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Ví dụ ({grammar.examples.length})
                </h3>
              </div>
              <div className="space-y-2">
                {grammar.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="px-3 sm:px-4 py-2.5 bg-gray-50 text-sm sm:text-base text-gray-900 font-medium leading-relaxed">
                      <span className="text-xs text-gray-400 mr-2">{i + 1}.</span>
                      {ex.ja}
                    </div>
                    <div className="px-3 sm:px-4 py-2 text-sm text-blue-700 bg-blue-50/50 leading-relaxed">
                      → {ex.vi}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 sm:px-6 py-3 flex justify-end rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
