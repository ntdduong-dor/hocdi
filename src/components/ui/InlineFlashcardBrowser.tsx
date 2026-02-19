import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Volume2, Settings } from 'lucide-react'
import { useTTS } from '../../hooks/useTTS'
import type { Flashcard, CardField, StudyConfig } from '../../types'
import { CARD_FIELD_LABELS } from '../../types'

const ALL_FIELDS: CardField[] = ['kanji', 'sinoVietnamese', 'hiragana', 'meaning']
const FIELD_ORDER: CardField[] = ['kanji', 'sinoVietnamese', 'hiragana', 'meaning']

interface InlineFlashcardBrowserProps {
  cards: Flashcard[]
  accent?: 'blue' | 'orange'
}

export default function InlineFlashcardBrowser({
  cards,
  accent = 'blue',
}: InlineFlashcardBrowserProps) {
  const [cardIndex, setCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)
  const [frontFields, setFrontFields] = useState<CardField[]>(['kanji'])
  const [backFields, setBackFields] = useState<CardField[]>(['sinoVietnamese', 'hiragana', 'meaning'])
  const [showConfig, setShowConfig] = useState(false)
  const configRef = useRef<HTMLDivElement>(null)
  const gearRef = useRef<HTMLButtonElement>(null)
  const { supported: ttsSupported, speak } = useTTS()

  const card = cards[cardIndex] ?? null

  // Reset on cards change
  useEffect(() => {
    setCardIndex(0)
    setIsFlipped(false)
  }, [cards.length])

  // Close config panel when clicking outside
  useEffect(() => {
    if (!showConfig) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (configRef.current?.contains(target)) return
      if (gearRef.current?.contains(target)) return
      setShowConfig(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showConfig])

  const goNext = useCallback(() => {
    if (cards.length === 0) return
    setDirection(1)
    setIsFlipped(false)
    setCardIndex((i) => (i + 1) % cards.length)
  }, [cards.length])

  const goPrev = useCallback(() => {
    if (cards.length === 0) return
    setDirection(-1)
    setIsFlipped(false)
    setCardIndex((i) => (i - 1 + cards.length) % cards.length)
  }, [cards.length])

  const goTo = useCallback((i: number) => {
    setDirection(i > cardIndex ? 1 : -1)
    setIsFlipped(false)
    setCardIndex(i)
  }, [cardIndex])

  const flip = useCallback(() => setIsFlipped((f) => !f), [])

  // Swipe handling
  const dragStartX = useRef(0)
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    dragStartX.current = clientX
  }
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const diff = clientX - dragStartX.current
    if (Math.abs(diff) > 60) {
      if (diff > 0) goPrev()
      else goNext()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (document.body.style.overflow === 'hidden') return
      // Don't trigger if user is typing in an input
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
      else if (e.key === ' ') { e.preventDefault(); flip() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goPrev, goNext, flip])

  const toggleField = (side: 'front' | 'back', field: CardField) => {
    if (side === 'front') {
      const updated = frontFields.includes(field)
        ? frontFields.filter((f) => f !== field)
        : [...frontFields, field]
      if (updated.length === 0) return
      setFrontFields(updated)
    } else {
      const updated = backFields.includes(field)
        ? backFields.filter((f) => f !== field)
        : [...backFields, field]
      if (updated.length === 0) return
      setBackFields(updated)
    }
  }

  if (!card || cards.length === 0) return null

  const isOrange = accent === 'orange'
  const accentDot = isOrange ? 'bg-orange-500' : 'bg-blue-500'
  const backBg = isOrange ? 'bg-orange-50' : 'bg-blue-50'
  const backBorder = isOrange ? 'border-orange-200' : 'border-blue-200'

  const renderFieldValues = (c: Flashcard, fields: CardField[]) => {
    const ordered = FIELD_ORDER.filter((f) => fields.includes(f))
    return (
      <div className="flex flex-col items-center gap-2">
        {ordered.map((field) => {
          const value = c[field]
          if (!value) return null
          const isKanjiField = field === 'kanji'
          return (
            <div key={field} className="text-center">
              {isKanjiField ? (
                <div className="text-4xl sm:text-5xl font-normal mb-1">{value}</div>
              ) : (
                <div className={`text-lg sm:text-xl ${field === 'sinoVietnamese' ? 'text-orange-600 font-medium' : field === 'hiragana' ? 'text-blue-600' : 'text-gray-600'}`}>
                  {value}
                </div>
              )}
              {/* no label */}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">
          {cardIndex + 1} / {cards.length} thẻ
        </span>
        <span className="text-xs text-gray-400">
          ← → lướt · Space lật
        </span>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            onClick={goPrev}
            className="shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Card */}
          <div
            className="flex-1 relative select-none cursor-pointer overflow-hidden"
            style={{ minHeight: '200px' }}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={card.id + '-' + cardIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -80 : 80 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                onClick={flip}
              >
                <div className="perspective-1000">
                  <motion.div
                    className="relative w-full preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ minHeight: '200px' }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col items-center justify-center p-6">
                      {renderFieldValues(card, frontFields)}
                    </div>

                    {/* Back */}
                    <div className={`absolute inset-0 backface-hidden rotate-y-180 ${backBg} rounded-2xl shadow-md border ${backBorder} flex flex-col items-center justify-center p-6`}>
                      {renderFieldValues(card, backFields)}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Toolbar: gear + TTS */}
            <div className="absolute top-2 right-2 z-30 flex items-center gap-0.5">
              <button
                ref={gearRef}
                onClick={(e) => { e.stopPropagation(); setShowConfig((v) => !v) }}
                className={`p-1.5 rounded-lg transition-colors ${
                  showConfig ? 'text-blue-600 bg-blue-50' : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100'
                }`}
                title="Cài đặt hiển thị"
              >
                <Settings size={16} />
              </button>
              {ttsSupported && (
                <button
                  onClick={(e) => { e.stopPropagation(); speak(card.hiragana || card.kanji) }}
                  className="p-1.5 text-gray-300 hover:text-blue-600 rounded-lg transition-colors"
                  title="Phát âm"
                >
                  <Volume2 size={16} />
                </button>
              )}
            </div>

            {/* Config panel */}
            <AnimatePresence>
              {showConfig && (
                <motion.div
                  ref={configRef}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-10 right-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-3 w-52"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Hiển thị</span>
                    <button onClick={() => setShowConfig(false)} className="text-xs text-gray-400 hover:text-gray-600">Xong</button>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Mặt trước</div>
                      <div className="flex flex-wrap gap-1">
                        {ALL_FIELDS.map((f) => (
                          <button
                            key={f}
                            onClick={() => toggleField('front', f)}
                            className={`px-2 py-0.5 text-xs rounded-md border transition-colors ${
                              frontFields.includes(f)
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {CARD_FIELD_LABELS[f]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Mặt sau</div>
                      <div className="flex flex-wrap gap-1">
                        {ALL_FIELDS.map((f) => (
                          <button
                            key={f}
                            onClick={() => toggleField('back', f)}
                            className={`px-2 py-0.5 text-xs rounded-md border transition-colors ${
                              backFields.includes(f)
                                ? 'bg-green-600 text-white border-green-600'
                                : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {CARD_FIELD_LABELS[f]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Next */}
          <button
            onClick={goNext}
            className="shrink-0 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        {cards.length > 1 && (
          <div className="flex items-center justify-center gap-1 mt-3">
            {cards.length <= 20 ? (
              cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === cardIndex ? `${accentDot} w-3` : 'bg-gray-300'
                  }`}
                />
              ))
            ) : (
              <span className="text-xs text-gray-400">{cardIndex + 1} / {cards.length}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
