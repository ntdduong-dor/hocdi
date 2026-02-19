import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import type { Flashcard, CardField, StudyConfig } from '../../types'
import { CARD_FIELD_LABELS } from '../../types'
import { Volume2, Settings } from 'lucide-react'
import { useTTS } from '../../hooks/useTTS'

interface FlashcardViewerProps {
  card: Flashcard
  isFlipped: boolean
  onFlip: () => void
  onSwipeLeft: () => void
  onSwipeRight: () => void
  frontFields: CardField[]
  backFields: CardField[]
  cardKey: string
  onConfigChange?: (config: Partial<StudyConfig>) => void
}

// Fixed field display order: Kanji → Âm Hán Việt → Hiragana → Nghĩa
const FIELD_ORDER: CardField[] = ['kanji', 'sinoVietnamese', 'hiragana', 'meaning']

function renderFields(card: Flashcard, fields: CardField[]) {
  const ordered = FIELD_ORDER.filter((f) => fields.includes(f))

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 w-full px-2">
      {ordered.map((field) => {
        const value = card[field]
        if (!value) return null
        const isKanji = field === 'kanji'
        return (
          <div key={field} className="text-center w-full">
            {isKanji ? (
              <div className="text-6xl sm:text-7xl md:text-8xl font-normal mb-2">{value}</div>
            ) : field === 'sinoVietnamese' ? (
              <div className="text-xl sm:text-2xl md:text-3xl text-orange-600 font-medium">{value}</div>
            ) : field === 'meaning' ? (
              <div className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed break-words">{value}</div>
            ) : (
              <div className="text-xl sm:text-2xl md:text-3xl">{value}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const ALL_FIELDS: CardField[] = ['kanji', 'sinoVietnamese', 'hiragana', 'meaning']

function InlineConfigPanel({
  frontFields,
  backFields,
  onConfigChange,
  onClose,
}: {
  frontFields: CardField[]
  backFields: CardField[]
  onConfigChange: (config: Partial<StudyConfig>) => void
  onClose: () => void
}) {
  const toggleField = (side: 'frontFields' | 'backFields', field: CardField) => {
    const current = side === 'frontFields' ? frontFields : backFields
    const updated = current.includes(field)
      ? current.filter((f) => f !== field)
      : [...current, field]
    if (updated.length === 0) return
    onConfigChange({ [side]: updated })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-12 right-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-3 w-56"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase">Hiển thị</span>
        <button onClick={onClose} className="text-xs text-gray-400 hover:text-gray-600">Xong</button>
      </div>
      <div className="space-y-2">
        <div>
          <div className="text-xs text-gray-500 mb-1">Mặt trước</div>
          <div className="flex flex-wrap gap-1">
            {ALL_FIELDS.map((f) => (
              <button
                key={f}
                onClick={() => toggleField('frontFields', f)}
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
                onClick={() => toggleField('backFields', f)}
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
  )
}

export default function FlashcardViewer({
  card,
  isFlipped,
  onFlip,
  onSwipeLeft,
  onSwipeRight,
  frontFields,
  backFields,
  cardKey,
  onConfigChange,
}: FlashcardViewerProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15])
  const bgLeft = useTransform(x, [-200, 0], [0.3, 0])
  const bgRight = useTransform(x, [0, 200], [0, 0.3])
  const { supported: ttsSupported, speak: speakText } = useTTS()
  const [showConfig, setShowConfig] = useState(false)
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null)
  const configRef = useRef<HTMLDivElement>(null)
  const gearRef = useRef<HTMLButtonElement>(null)

  // Close config panel when clicking outside
  useEffect(() => {
    if (!showConfig) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (configRef.current?.contains(target)) return
      if (gearRef.current?.contains(target)) return
      setShowConfig(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showConfig])

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      setExitDirection('right')
      setTimeout(() => {
        onSwipeRight()
        setExitDirection(null)
      }, 200)
    } else if (info.offset.x < -threshold) {
      setExitDirection('left')
      setTimeout(() => {
        onSwipeLeft()
        setExitDirection(null)
      }, 200)
    }
  }

  const speakCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    const text = card.hiragana || card.kanji
    if (text) speakText(text)
  }

  const toggleConfig = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowConfig((v) => !v)
  }

  return (
    <div className="relative select-none">
      {/* Swipe background indicators */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-red-500 z-0 pointer-events-none"
        style={{ opacity: bgLeft }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl bg-green-500 z-0 pointer-events-none"
        style={{ opacity: bgRight }}
      />

      <AnimatePresence mode="popLayout">
        <motion.div
          key={cardKey}
          className="relative z-10 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, rotate }}
          whileDrag={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{
            opacity: 1,
            x: exitDirection === 'left' ? -400 : exitDirection === 'right' ? 400 : 0,
            scale: exitDirection ? 0.8 : 1,
            rotateZ: exitDirection === 'left' ? -15 : exitDirection === 'right' ? 15 : 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="perspective-1000" onClick={onFlip}>
            <motion.div
              className="relative w-full preserve-3d"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ minHeight: 'min(60vh, 420px)' }}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center p-6 sm:p-8 md:p-10">
                {renderFields(card, frontFields)}
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-50 rounded-2xl shadow-lg border border-blue-200 flex items-center justify-center p-6 sm:p-8 md:p-10">
                {renderFields(card, backFields)}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Toolbar: gear + TTS - sits OUTSIDE the 3D flip so always clickable */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-1">
        {onConfigChange && (
          <button
            ref={gearRef}
            onClick={toggleConfig}
            className={`p-2 rounded-lg transition-colors ${
              showConfig ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            title="Cài đặt hiển thị"
          >
            <Settings size={18} />
          </button>
        )}
        {ttsSupported && (
          <button
            onClick={speakCard}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Phát âm"
          >
            <Volume2 size={20} />
          </button>
        )}
      </div>

      {/* Config panel - also outside 3D flip */}
      <div ref={configRef}>
        <AnimatePresence>
          {showConfig && onConfigChange && (
            <InlineConfigPanel
              frontFields={frontFields}
              backFields={backFields}
              onConfigChange={onConfigChange}
              onClose={() => setShowConfig(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Swipe labels */}
      <motion.div
        className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 px-3 py-1 rounded-lg bg-red-500 text-white text-sm font-bold pointer-events-none"
        style={{ opacity: bgLeft }}
      >
        Chưa nhớ
      </motion.div>
      <motion.div
        className="absolute top-3 right-14 sm:top-4 sm:right-14 z-20 px-3 py-1 rounded-lg bg-green-500 text-white text-sm font-bold pointer-events-none"
        style={{ opacity: bgRight }}
      >
        Đã nhớ
      </motion.div>
    </div>
  )
}
