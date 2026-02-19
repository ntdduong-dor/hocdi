import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { useStudyStore } from '../../store/useStudyStore'
import { kanjiEntriesToFlashcards } from '../../lib/kanjiToFlashcard'
import StudyConfigPanel from '../study/StudyConfigPanel'
import FlashcardViewer from '../study/FlashcardViewer'
import StudyControls from '../study/StudyControls'
import ProgressBar from '../study/ProgressBar'
import { ChevronLeft, RotateCcw, Trophy, AlertCircle } from 'lucide-react'
import type { StudyConfig } from '../../types'
import { DEFAULT_STUDY_CONFIG } from '../../types'

export default function KanjiStudyPage() {
  const { kanjiLessonId } = useParams<{ kanjiLessonId: string }>()
  const navigate = useNavigate()
  const lesson = useAppStore((s) => s.kanjiLessons.find((l) => l.id === kanjiLessonId))
  const { session, startSession, flipCard, nextCard, undo, shuffle, reset, endSession, setAutoPlay, setConfig: setSessionConfig, restartWithForgotten } = useStudyStore()

  const cards = useMemo(() => {
    if (!lesson) return []
    return kanjiEntriesToFlashcards(lesson.entries)
  }, [lesson])

  const [config, setConfig] = useState<StudyConfig>(DEFAULT_STUDY_CONFIG)
  const [started, setStarted] = useState(false)

  const handleStart = useCallback(() => {
    if (!lesson) return
    startSession(lesson.id, cards, config)
    setStarted(true)
  }, [lesson, cards, config, startSession])

  // Auto-play
  useEffect(() => {
    if (!session?.config.autoPlay || session.isComplete) return
    const interval = setInterval(() => {
      if (session.isFlipped) {
        nextCard('remember')
      } else {
        flipCard()
      }
    }, session.config.autoPlayInterval * 1000)
    return () => clearInterval(interval)
  }, [session?.config.autoPlay, session?.isFlipped, session?.currentIndex, session?.isComplete, flipCard, nextCard])

  // Keyboard shortcuts
  useEffect(() => {
    if (!started || !session) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (session.isComplete) return
      switch (e.key) {
        case ' ':
          e.preventDefault()
          flipCard()
          break
        case 'ArrowLeft':
          nextCard('forget')
          break
        case 'ArrowRight':
          nextCard('remember')
          break
        case 'z':
          if (e.ctrlKey || e.metaKey) undo()
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [started, session, flipCard, nextCard, undo])

  // Cleanup on unmount
  useEffect(() => {
    return () => endSession()
  }, [endSession])

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Không tìm thấy bài học</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">Về trang chủ</Link>
      </div>
    )
  }

  if (!started) {
    return (
      <div>
        <Link
          to={`/kanji/${lesson.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> {lesson.name}
        </Link>
        <StudyConfigPanel config={config} onChange={setConfig} onStart={handleStart} />
      </div>
    )
  }

  if (!session) return null

  const currentCard = session.cards[session.currentIndex]

  // Completion screen
  if (session.isComplete) {
    const total = session.cards.length
    const remCount = session.remembered.length
    const forgCount = session.forgotten.length
    const percent = total > 0 ? Math.round((remCount / total) * 100) : 0

    return (
      <div className="max-w-2xl mx-auto text-center py-8 sm:py-12 px-2 sm:px-0">
        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
          <Trophy size={32} className="text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hoàn thành!</h2>
        <p className="text-gray-500 mb-6">
          Bạn đã nhớ {remCount}/{total} thẻ ({percent}%)
        </p>
        <ProgressBar current={total} total={total} remembered={remCount} forgotten={forgCount} />
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button
            onClick={() => { reset(); }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={16} /> Học lại
          </button>
          {forgCount > 0 && (
            <button
              onClick={restartWithForgotten}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <AlertCircle size={16} /> Học lại {forgCount} từ chưa thuộc
            </button>
          )}
          <Link
            to={`/kanji/${lesson.id}`}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Về bài học
          </Link>
          {cards.length >= 4 && (
            <button
              onClick={() => navigate(`/kanji/${lesson.id}/quiz`)}
              className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              Kiểm tra
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-0">
      <div className="flex items-center justify-between mb-4">
        <Link
          to={`/kanji/${lesson.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={16} /> <span className="truncate max-w-[120px] sm:max-w-none">{lesson.name}</span>
        </Link>
        <span className="text-xs text-gray-400 hidden sm:inline">
          Space: lật | ←: chưa nhớ | →: đã nhớ
        </span>
      </div>

      <ProgressBar
        current={session.currentIndex + 1}
        total={session.cards.length}
        remembered={session.remembered.length}
        forgotten={session.forgotten.length}
      />

      <div className="mt-6 mb-6">
        <FlashcardViewer
          card={currentCard}
          isFlipped={session.isFlipped}
          onFlip={flipCard}
          onSwipeLeft={() => nextCard('forget')}
          onSwipeRight={() => nextCard('remember')}
          frontFields={session.config.frontFields}
          backFields={session.config.backFields}
          cardKey={currentCard.id + '-' + session.currentIndex}
          onConfigChange={setSessionConfig}
        />
      </div>

      <StudyControls
        onForget={() => nextCard('forget')}
        onRemember={() => nextCard('remember')}
        onFlip={flipCard}
        onUndo={undo}
        onShuffle={shuffle}
        onReset={reset}
        onToggleAutoPlay={() => setAutoPlay(!session.config.autoPlay)}
        canUndo={session.history.length > 0}
        autoPlay={session.config.autoPlay}
        isComplete={session.isComplete}
      />
    </div>
  )
}
