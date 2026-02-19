import { useState } from 'react'
import { motion } from 'framer-motion'
import type { QuizQuestion } from '../../types'
import { CARD_FIELD_LABELS } from '../../types'

interface MultipleChoiceProps {
  questions: QuizQuestion[]
  onComplete: (results: QuizQuestion[]) => void
}

export default function MultipleChoice({ questions, onComplete }: MultipleChoiceProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<QuizQuestion[]>(questions.map((q) => ({ ...q })))
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)

  const question = results[currentIndex]
  if (!question) return null

  const handleSelect = (answer: string) => {
    if (answered) return
    setSelectedAnswer(answer)
    setAnswered(true)
    const isCorrect = answer === question.correctAnswer
    const updated = [...results]
    updated[currentIndex] = { ...question, userAnswer: answer, isCorrect }
    setResults(updated)
  }

  const handleNext = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
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

        <div className="space-y-2">
          {question.options.map((option, i) => {
            let bgClass = 'bg-gray-50 hover:bg-gray-100 border-gray-200'
            if (answered) {
              if (option === question.correctAnswer) {
                bgClass = 'bg-green-50 border-green-500 text-green-800'
              } else if (option === selectedAnswer && option !== question.correctAnswer) {
                bgClass = 'bg-red-50 border-red-500 text-red-800'
              } else {
                bgClass = 'bg-gray-50 border-gray-200 opacity-50'
              }
            }

            return (
              <motion.button
                key={i}
                onClick={() => handleSelect(option)}
                disabled={answered}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${bgClass}`}
                whileTap={!answered ? { scale: 0.98 } : {}}
              >
                {option}
              </motion.button>
            )
          })}
        </div>
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
