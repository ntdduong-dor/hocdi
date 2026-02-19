import { useState } from 'react'
import { motion } from 'framer-motion'
import { checkWrittenAnswer } from '../../lib/quizGenerator'
import type { QuizQuestion } from '../../types'
import { CARD_FIELD_LABELS } from '../../types'
import { Check, X } from 'lucide-react'

interface WrittenAnswerProps {
  questions: QuizQuestion[]
  onComplete: (results: QuizQuestion[]) => void
}

export default function WrittenAnswer({ questions, onComplete }: WrittenAnswerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<QuizQuestion[]>(questions.map((q) => ({ ...q })))
  const [userInput, setUserInput] = useState('')
  const [answered, setAnswered] = useState(false)

  const question = results[currentIndex]
  if (!question) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (answered || !userInput.trim()) return
    const isCorrect = checkWrittenAnswer(userInput, question.correctAnswer)
    const updated = [...results]
    updated[currentIndex] = { ...question, userAnswer: userInput.trim(), isCorrect }
    setResults(updated)
    setAnswered(true)
  }

  const handleNext = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserInput('')
      setAnswered(false)
    } else {
      onComplete(results)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-sm text-gray-500 mb-4">
        Câu {currentIndex + 1} / {results.length}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
        <div className="text-xs text-gray-400 mb-2">{CARD_FIELD_LABELS[question.questionField]}</div>
        <div className={`text-center mb-6 ${question.questionField === 'kanji' ? 'text-5xl py-4' : 'text-2xl py-2'}`}>
          {question.questionText}
        </div>

        <div className="text-xs text-gray-400 mb-2">Nhập {CARD_FIELD_LABELS[question.answerField]}</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={answered}
            className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors text-lg ${
              answered
                ? question.isCorrect
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Nhập đáp án..."
            autoFocus
          />
          {!answered && (
            <button
              type="submit"
              disabled={!userInput.trim()}
              className="mt-3 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Kiểm tra
            </button>
          )}
        </form>

        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            {question.isCorrect ? (
              <div className="flex items-center gap-2 text-green-600">
                <Check size={18} /> Chính xác!
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <X size={18} /> Sai rồi
                </div>
                <p className="text-sm text-gray-600">
                  Đáp án đúng: <strong>{question.correctAnswer}</strong>
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <button
            onClick={handleNext}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentIndex < results.length - 1 ? 'Câu tiếp' : 'Xem kết quả'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
