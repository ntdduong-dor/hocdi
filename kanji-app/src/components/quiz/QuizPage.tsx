import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import MultipleChoice from './MultipleChoice'
import WrittenAnswer from './WrittenAnswer'
import MatchPairs from './MatchPairs'
import QuizResults from './QuizResults'
import { generateMultipleChoice, generateWrittenAnswer, generateMatchPairs } from '../../lib/quizGenerator'
import { ChevronLeft, ListChecks, PenLine, Link2 } from 'lucide-react'
import type { QuizType, CardField, QuizQuestion } from '../../types'
import { CARD_FIELD_LABELS } from '../../types'

type QuizState = 'config' | 'playing' | 'results'

const QUIZ_TYPES: { key: QuizType; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: 'multipleChoice', label: 'Trắc nghiệm', icon: <ListChecks size={20} />, desc: 'Chọn đáp án đúng từ 4 lựa chọn' },
  { key: 'writtenAnswer', label: 'Tự luận', icon: <PenLine size={20} />, desc: 'Gõ đáp án cho mỗi câu hỏi' },
  { key: 'matchPairs', label: 'Nối cặp', icon: <Link2 size={20} />, desc: 'Nối Hán tự với nghĩa tương ứng' },
]

const FIELD_OPTIONS: CardField[] = ['kanji', 'hiragana', 'meaning', 'sinoVietnamese']

export default function QuizPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = useAppStore((s) => s.lessons.find((l) => l.id === lessonId))

  const [quizType, setQuizType] = useState<QuizType>('multipleChoice')
  const [questionField, setQuestionField] = useState<CardField>('kanji')
  const [answerField, setAnswerField] = useState<CardField>('meaning')
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

  if (lesson.cards.length < 4) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Cần ít nhất 4 thẻ để kiểm tra</p>
        <Link to={`/lesson/${lesson.id}`} className="text-blue-600 hover:underline mt-2 inline-block">Về bài học</Link>
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

  if (state === 'results') {
    return (
      <div>
        <Link
          to={`/lesson/${lesson.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> {lesson.name}
        </Link>
        <QuizResults
          results={quizResults}
          lessonId={lesson.id}
          onRetry={handleRetry}
          matchInfo={matchInfo}
        />
      </div>
    )
  }

  if (state === 'playing') {
    return (
      <div>
        <Link
          to={`/lesson/${lesson.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> {lesson.name}
        </Link>

        {quizType === 'multipleChoice' && (
          <MultipleChoice
            key={quizKey}
            questions={generateMultipleChoice(lesson.cards, questionField, answerField)}
            onComplete={(results) => { setQuizResults(results); setState('results') }}
          />
        )}

        {quizType === 'writtenAnswer' && (
          <WrittenAnswer
            key={quizKey}
            questions={generateWrittenAnswer(lesson.cards, questionField, answerField)}
            onComplete={(results) => { setQuizResults(results); setState('results') }}
          />
        )}

        {quizType === 'matchPairs' && (
          <MatchPairs
            key={quizKey}
            pairs={generateMatchPairs(lesson.cards, questionField, answerField, 6)}
            onComplete={(attempts, time) => {
              const pairs = generateMatchPairs(lesson.cards, questionField, answerField, 6)
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

  return (
    <div>
      <Link
        to={`/lesson/${lesson.id}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> {lesson.name}
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Kiểm tra</h1>

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
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={quizType === key ? 'text-blue-600' : 'text-gray-400'}>{icon}</div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              {FIELD_OPTIONS.filter((f) => f !== questionField).map((f) => (
                <option key={f} value={f}>{CARD_FIELD_LABELS[f]}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="w-full px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Bắt đầu kiểm tra
        </button>
      </div>
    </div>
  )
}
