import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { kanjiEntriesToFlashcards } from '../../lib/kanjiToFlashcard'
import MultipleChoice from '../quiz/MultipleChoice'
import WrittenAnswer from '../quiz/WrittenAnswer'
import MatchPairs from '../quiz/MatchPairs'
import { generateMultipleChoice, generateWrittenAnswer, generateMatchPairs } from '../../lib/quizGenerator'
import { ChevronLeft, ListChecks, PenLine, Link2, Trophy, RotateCcw, Check, X } from 'lucide-react'
import type { QuizType, CardField, QuizQuestion } from '../../types'
import { CARD_FIELD_LABELS } from '../../types'

type QuizState = 'config' | 'playing' | 'results'

const QUIZ_TYPES: { key: QuizType; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'multipleChoice', label: 'Trắc nghiệm', icon: <ListChecks size={20} />, desc: 'Chọn đáp án đúng từ 4 lựa chọn' },
  { key: 'writtenAnswer', label: 'Tự luận', icon: <PenLine size={20} />, desc: 'Gõ đáp án cho mỗi câu hỏi' },
  { key: 'matchPairs', label: 'Nối cặp', icon: <Link2 size={20} />, desc: 'Nối Hán tự với nghĩa tương ứng' },
]

const FIELD_OPTIONS: CardField[] = ['kanji', 'hiragana', 'meaning', 'sinoVietnamese']

export default function KanjiQuizPage() {
  const { kanjiLessonId } = useParams<{ kanjiLessonId: string }>()
  const lesson = useAppStore((s) => s.kanjiLessons.find((l) => l.id === kanjiLessonId))

  const cards = useMemo(() => {
    if (!lesson) return []
    return kanjiEntriesToFlashcards(lesson.entries)
  }, [lesson])

  const [quizType, setQuizType] = useState<QuizType>('multipleChoice')
  const [questionField, setQuestionField] = useState<CardField>('kanji')
  const [answerField, setAnswerField] = useState<CardField>('hiragana')
  const [state, setState] = useState<QuizState>('config')
  const [quizResults, setQuizResults] = useState<QuizQuestion[]>([])
  const [matchInfo, setMatchInfo] = useState<{ attempts: number; time: number } | undefined>()
  const [quizKey, setQuizKey] = useState(0)

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Không tìm thấy bài học</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">Về trang chủ</Link>
      </div>
    )
  }

  if (cards.length < 4) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Cần ít nhất 4 Hán tự để kiểm tra</p>
        <Link to={`/kanji/${lesson.id}`} className="text-blue-600 hover:underline mt-2 inline-block">Về bài học</Link>
      </div>
    )
  }

  const startQuiz = () => {
    setMatchInfo(undefined)
    setState('playing')
    setQuizKey((k) => k + 1)
  }

  const handleRetry = () => {
    setState('config')
    setQuizResults([])
    setMatchInfo(undefined)
  }

  // Results screen
  if (state === 'results') {
    const correct = quizResults.filter((r) => r.isCorrect).length
    const total = quizResults.length
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0

    return (
      <div>
        <Link
          to={`/kanji/${lesson.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> {lesson.name}
        </Link>

        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <Trophy size={32} className="text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Kết quả kiểm tra</h2>
            <p className="text-4xl font-bold text-orange-600 mb-1">{percent}%</p>
            <p className="text-gray-500">
              {correct}/{total} câu đúng
              {matchInfo && ` | ${matchInfo.attempts} lần thử | ${matchInfo.time}s`}
            </p>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percent >= 80 ? 'bg-green-500' : percent >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          {quizResults.some((r) => !r.isCorrect) && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Câu sai</h3>
              <div className="space-y-2">
                {quizResults.filter((r) => !r.isCorrect).map((r, i) => (
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

          {quizResults.some((r) => r.isCorrect) && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Câu đúng</h3>
              <div className="space-y-2">
                {quizResults.filter((r) => r.isCorrect).map((r, i) => (
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
              onClick={handleRetry}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw size={16} /> Làm lại
            </button>
            <Link
              to={`/kanji/${lesson.id}`}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Về bài học
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Playing screen
  if (state === 'playing') {
    return (
      <div>
        <Link
          to={`/kanji/${lesson.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> {lesson.name}
        </Link>

        {quizType === 'multipleChoice' && (
          <MultipleChoice
            key={quizKey}
            questions={generateMultipleChoice(cards, questionField, answerField)}
            onComplete={(results) => { setQuizResults(results); setState('results') }}
          />
        )}

        {quizType === 'writtenAnswer' && (
          <WrittenAnswer
            key={quizKey}
            questions={generateWrittenAnswer(cards, questionField, answerField)}
            onComplete={(results) => { setQuizResults(results); setState('results') }}
          />
        )}

        {quizType === 'matchPairs' && (
          <MatchPairs
            key={quizKey}
            pairs={generateMatchPairs(cards, questionField, answerField, 6)}
            onComplete={(attempts, time) => {
              const pairs = generateMatchPairs(cards, questionField, answerField, 6)
              const results: QuizQuestion[] = pairs.map((p) => ({
                cardId: p.id,
                questionField,
                answerField,
                questionText: p.left,
                correctAnswer: p.right,
                options: [],
                userAnswer: p.right,
                isCorrect: true,
              }))
              setMatchInfo({ attempts, time })
              setQuizResults(results)
              setState('results')
            }}
          />
        )}
      </div>
    )
  }

  // Config screen
  return (
    <div>
      <Link
        to={`/kanji/${lesson.id}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> {lesson.name}
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Kiểm tra Hán tự</h1>

        {/* Quiz type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Loại kiểm tra</label>
          <div className="space-y-2">
            {QUIZ_TYPES.map(({ key, label, icon, desc }) => (
              <button
                key={key}
                onClick={() => setQuizType(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-colors ${
                  quizType === key
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={quizType === key ? 'text-orange-600' : 'text-gray-400'}>{icon}</div>
                <div>
                  <div className="font-medium text-sm">{label}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Field selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Câu hỏi</label>
            <select
              value={questionField}
              onChange={(e) => setQuestionField(e.target.value as CardField)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            >
              {FIELD_OPTIONS.map((f) => (
                <option key={f} value={f}>{CARD_FIELD_LABELS[f]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Đáp án</label>
            <select
              value={answerField}
              onChange={(e) => setAnswerField(e.target.value as CardField)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            >
              {FIELD_OPTIONS.filter((f) => f !== questionField).map((f) => (
                <option key={f} value={f}>{CARD_FIELD_LABELS[f]}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="w-full px-4 py-3 text-base font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Bắt đầu kiểm tra
        </button>
      </div>
    </div>
  )
}
