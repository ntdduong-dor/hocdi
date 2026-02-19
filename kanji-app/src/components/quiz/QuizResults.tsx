import { Link } from 'react-router-dom'
import { Trophy, RotateCcw, Check, X } from 'lucide-react'
import type { QuizQuestion } from '../../types'
import { CARD_FIELD_LABELS } from '../../types'

interface QuizResultsProps {
  results: QuizQuestion[]
  lessonId: string
  onRetry: () => void
  matchInfo?: { attempts: number; time: number }
}

export default function QuizResults({ results, lessonId, onRetry, matchInfo }: QuizResultsProps) {
  const correct = results.filter((r) => r.isCorrect).length
  const total = results.length
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
          <Trophy size={32} className="text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kết quả kiểm tra</h2>
        <p className="text-4xl font-bold text-blue-600 mb-1">{percent}%</p>
        <p className="text-gray-500">
          {correct}/{total} câu đúng
          {matchInfo && ` | ${matchInfo.attempts} lần thử | ${matchInfo.time}s`}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            percent >= 80 ? 'bg-green-500' : percent >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Review wrong answers */}
      {results.some((r) => !r.isCorrect) && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Câu sai
          </h3>
          <div className="space-y-2">
            {results.filter((r) => !r.isCorrect).map((r, i) => (
              <div key={i} className="bg-red-50 rounded-lg p-3 border border-red-100">
                <div className="flex items-start gap-2">
                  <X size={16} className="text-red-500 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">{CARD_FIELD_LABELS[r.questionField]}:</span> {r.questionText}
                    </p>
                    <p className="text-red-600">Đáp án của bạn: {r.userAnswer || '(trống)'}</p>
                    <p className="text-green-700">Đáp án đúng: {r.correctAnswer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.some((r) => r.isCorrect) && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Câu đúng
          </h3>
          <div className="space-y-2">
            {results.filter((r) => r.isCorrect).map((r, i) => (
              <div key={i} className="bg-green-50 rounded-lg p-3 border border-green-100">
                <div className="flex items-start gap-2">
                  <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-700">
                      <span className="font-medium">{CARD_FIELD_LABELS[r.questionField]}:</span> {r.questionText} → {r.correctAnswer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3">
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RotateCcw size={16} /> Làm lại
        </button>
        <Link
          to={`/lesson/${lessonId}`}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Về bài học
        </Link>
      </div>
    </div>
  )
}
