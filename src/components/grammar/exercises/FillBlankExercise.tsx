import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, RotateCcw } from 'lucide-react'
import type { FillBlankQuestion } from '../../../lib/grammarExercise'

interface Props {
  questions: FillBlankQuestion[]
  onReset: () => void
}

export default function FillBlankExercise({ questions, onReset }: Props) {
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
    if (option === q.answer) setScore((s) => s + 1)
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

      {/* Sentence with blank */}
      <div className="bg-gray-50 rounded-xl px-4 py-4 mb-4 border border-gray-100">
        <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed text-center">
          {q.sentence.split('______').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className={`inline-block min-w-[80px] mx-1 px-2 py-0.5 rounded border-b-2 text-center ${
                  answered
                    ? selected === q.answer
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : 'bg-red-100 border-red-500 text-red-700'
                    : 'bg-purple-50 border-purple-300 text-purple-400'
                }`}>
                  {answered ? q.answer : '???'}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {q.options.map((option, i) => {
          let cls = 'bg-white border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'
          if (answered) {
            if (option === q.answer) {
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
              className={`px-3 py-2.5 text-sm font-medium rounded-lg border transition-all ${cls}`}
              whileTap={!answered ? { scale: 0.97 } : {}}
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
          {selected === q.answer ? (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <Check size={16} /> Chính xác!
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <X size={16} /> Đáp án: <strong>{q.answer}</strong>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">→ {q.translation}</p>
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
