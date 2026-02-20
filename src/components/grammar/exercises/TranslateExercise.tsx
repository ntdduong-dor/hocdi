import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, RotateCcw } from 'lucide-react'
import type { TranslateQuestion } from '../../../lib/grammarExercise'

interface Props {
  questions: TranslateQuestion[]
  onReset: () => void
}

export default function TranslateExercise({ questions, onReset }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  if (questions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        Không tạo được bài tập cho mẫu ngữ pháp này
      </div>
    )
  }

  const q = questions[currentIndex]

  const handleSelect = (option: string) => {
    if (answered) return
    setSelected(option)
    setAnswered(true)
    if (option === q.correctJa) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-2">{score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '💪'}</div>
        <p className="text-lg font-semibold text-gray-800">
          {score}/{questions.length} câu đúng
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {score === questions.length ? 'Xuất sắc!' : score >= questions.length / 2 ? 'Khá tốt!' : 'Cần ôn thêm!'}
        </p>
        <button
          onClick={() => { setCurrentIndex(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); onReset() }}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <RotateCcw size={14} /> Làm lại
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-400">Câu {currentIndex + 1}/{questions.length}</span>
        <span className="text-xs text-gray-400">{score} đúng</span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + (answered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Vietnamese prompt */}
      <div className="bg-blue-50 rounded-xl px-4 py-4 mb-4 border border-blue-100">
        <p className="text-xs text-blue-400 mb-1">Dịch sang tiếng Nhật:</p>
        <p className="text-base sm:text-lg text-blue-800 font-medium leading-relaxed text-center">
          {q.vi}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-3">
        {q.options.map((option, i) => {
          let cls = 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'
          if (answered) {
            if (option === q.correctJa) {
              cls = 'bg-green-50 border-green-500 text-green-800'
            } else if (option === selected) {
              cls = 'bg-red-50 border-red-500 text-red-800'
            } else {
              cls = 'bg-gray-50 border-gray-200 text-gray-400'
            }
          }
          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 text-sm rounded-lg border transition-all ${cls}`}
              whileTap={!answered ? { scale: 0.98 } : {}}
            >
              {option}
            </motion.button>
          )
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
        >
          {selected === q.correctJa ? (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <Check size={16} /> Chính xác!
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <X size={16} /> Sai rồi
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Đáp án: <strong className="text-gray-700">{q.correctJa}</strong>
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Next */}
      {answered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {currentIndex < questions.length - 1 ? 'Câu tiếp →' : 'Xem kết quả'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
