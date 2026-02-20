import { useState, useCallback, useEffect } from 'react'
import { X, BookOpen, Layers, MessageCircle, Volume2, VolumeX, Eye, EyeOff, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { loadVoice, speak as ttsSpeak, stopSpeaking, isTTSSupported } from '../../lib/tts'
import { KanjiText } from '../ui/KanjiTooltip'
import type { GrammarPoint } from '../../types/grammar'
import GrammarExercise from './exercises/GrammarExercise'

function useGrammarTTS() {
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    if (!isTTSSupported()) return
    loadVoice().then(setSupported)
  }, [])

  const speak = useCallback((text: string, index: number) => {
    if (!supported) return
    stopSpeaking()

    if (speakingIndex === index) {
      setSpeakingIndex(null)
      return
    }

    setSpeakingIndex(index)
    ttsSpeak(text)

    // Listen for end
    const check = setInterval(() => {
      if (!speechSynthesis.speaking) {
        setSpeakingIndex(null)
        clearInterval(check)
      }
    }, 100)
  }, [speakingIndex, supported])

  const stop = useCallback(() => {
    stopSpeaking()
    setSpeakingIndex(null)
  }, [])

  return { speak, stop, speakingIndex }
}

interface GrammarDetailDialogProps {
  grammar: GrammarPoint | null
  allGrammar: GrammarPoint[]
  onClose: () => void
}

export default function GrammarDetailDialog({ grammar, allGrammar, onClose }: GrammarDetailDialogProps) {
  const { speak, stop, speakingIndex } = useGrammarTTS()
  const [showExercise, setShowExercise] = useState(false)
  const [hideJa, setHideJa] = useState(false)
  const [hideVi, setHideVi] = useState(false)
  const [revealedJa, setRevealedJa] = useState<Set<number>>(new Set())
  const [revealedVi, setRevealedVi] = useState<Set<number>>(new Set())

  const toggleRevealJa = (index: number) => {
    setRevealedJa(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const toggleRevealVi = (index: number) => {
    setRevealedVi(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const handleToggleHideJa = () => {
    setHideJa(prev => !prev)
    setRevealedJa(new Set())
  }

  const handleToggleHideVi = () => {
    setHideVi(prev => !prev)
    setRevealedVi(new Set())
  }

  if (!grammar) return null

  const handleClose = () => {
    stop()
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-8 sm:pt-16 overflow-y-auto"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative my-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-4 sm:px-6 py-4 flex items-start justify-between z-10">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
                {grammar.title}
              </h2>
              <p className="text-sm sm:text-base text-blue-600 font-medium mt-1">
                {grammar.meaning}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-4 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Structure */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <Layers size={16} className="text-purple-500" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Cấu trúc
                </h3>
              </div>
              <div className="space-y-1.5">
                {grammar.structure.map((s, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 bg-purple-50 rounded-lg text-sm font-mono text-purple-800 border border-purple-100"
                  >
                    <KanjiText text={s} />
                  </div>
                ))}
              </div>
            </section>

            {/* Explanation */}
            <section>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={16} className="text-green-500" />
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Giải thích
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed bg-green-50 rounded-lg px-4 py-3 border border-green-100">
                {grammar.explanation}
              </p>
            </section>

            {/* Examples */}
            <section>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-orange-500" />
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Ví dụ ({grammar.examples.length})
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleToggleHideJa}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                      hideJa
                        ? 'bg-red-100 text-red-600 border border-red-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                    }`}
                    title={hideJa ? 'Hiện tiếng Nhật' : 'Che tiếng Nhật'}
                  >
                    {hideJa ? <EyeOff size={12} /> : <Eye size={12} />}
                    <span>日本語</span>
                  </button>
                  <button
                    onClick={handleToggleHideVi}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                      hideVi
                        ? 'bg-blue-100 text-blue-600 border border-blue-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                    }`}
                    title={hideVi ? 'Hiện tiếng Việt' : 'Che tiếng Việt'}
                  >
                    {hideVi ? <EyeOff size={12} /> : <Eye size={12} />}
                    <span>Tiếng Việt</span>
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {grammar.examples.map((ex, i) => {
                  const jaHidden = hideJa && !revealedJa.has(i)
                  const viHidden = hideVi && !revealedVi.has(i)

                  return (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-100 overflow-hidden"
                    >
                      {/* Japanese row */}
                      <div
                        className={`px-3 sm:px-4 py-2.5 bg-gray-50 text-sm sm:text-base font-medium leading-relaxed flex items-start gap-2 ${
                          jaHidden ? 'cursor-pointer' : ''
                        }`}
                        onClick={jaHidden ? () => toggleRevealJa(i) : undefined}
                      >
                        <span className="text-xs text-gray-400 mr-0 mt-1 flex-shrink-0">{i + 1}.</span>
                        {jaHidden ? (
                          <span className="flex-1 select-none text-gray-400 bg-gray-200 rounded px-2 py-0.5 text-sm italic">
                            Nhấn để xem tiếng Nhật
                          </span>
                        ) : (
                          <span className="flex-1 text-gray-900">{ex.reading ? (
                            <ruby className="leading-loose">
                              <KanjiText text={ex.ja} />
                              <rp>(</rp><rt className="text-[10px] text-gray-400 font-normal">{ex.reading}</rt><rp>)</rp>
                            </ruby>
                          ) : <KanjiText text={ex.ja} />}</span>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); speak(ex.ja, i) }}
                          className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${
                            speakingIndex === i
                              ? 'text-orange-600 bg-orange-100 animate-pulse'
                              : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'
                          }`}
                          title={speakingIndex === i ? 'Đang phát...' : 'Nghe phát âm'}
                        >
                          {speakingIndex === i ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>
                      {/* Vietnamese row */}
                      <div
                        className={`px-3 sm:px-4 py-2 text-sm leading-relaxed ${
                          viHidden
                            ? 'bg-blue-50/30 cursor-pointer'
                            : 'bg-blue-50/50 text-blue-700'
                        }`}
                        onClick={viHidden ? () => toggleRevealVi(i) : undefined}
                      >
                        {viHidden ? (
                          <span className="select-none text-gray-400 bg-gray-200 rounded px-2 py-0.5 text-xs italic">
                            Nhấn để xem nghĩa
                          </span>
                        ) : (
                          <span>→ {ex.vi}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Exercise section */}
            <section>
              <button
                onClick={() => setShowExercise(!showExercise)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  showExercise
                    ? 'bg-purple-100 text-purple-700 border border-purple-200'
                    : 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-600 border border-purple-100 hover:border-purple-200 hover:shadow-sm'
                }`}
              >
                <GraduationCap size={16} />
                {showExercise ? 'Ẩn bài tập' : 'Luyện tập'}
              </button>
              {showExercise && grammar.examples.length >= 2 && (
                <div className="mt-4 bg-purple-50/30 rounded-xl border border-purple-100 px-4 py-4">
                  <GrammarExercise grammar={grammar} allGrammar={allGrammar} />
                </div>
              )}
              {showExercise && grammar.examples.length < 2 && (
                <p className="mt-3 text-center text-xs text-gray-400">
                  Cần ít nhất 2 ví dụ để tạo bài tập
                </p>
              )}
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 sm:px-6 py-3 flex justify-end rounded-b-2xl">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
