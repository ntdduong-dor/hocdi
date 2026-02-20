import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Check, RotateCcw } from 'lucide-react'
import type { MatchPair } from '../../../lib/grammarExercise'

interface Props {
  pairs: MatchPair[]
  onReset: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function MatchPairsExercise({ pairs, onReset }: Props) {
  const shuffledJa = useMemo(() => shuffle(pairs.map((p, i) => ({ text: p.ja, idx: i }))), [pairs])
  const shuffledVi = useMemo(() => shuffle(pairs.map((p, i) => ({ text: p.vi, idx: i }))), [pairs])

  const [selectedJa, setSelectedJa] = useState<number | null>(null)
  const [selectedVi, setSelectedVi] = useState<number | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [wrongPair, setWrongPair] = useState<{ ja: number; vi: number } | null>(null)

  if (pairs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        Không tạo được bài tập cho mẫu ngữ pháp này
      </div>
    )
  }

  const finished = matched.size === pairs.length

  const handleSelectJa = (idx: number) => {
    if (matched.has(idx)) return
    setWrongPair(null)
    setSelectedJa(idx)
    if (selectedVi !== null) {
      tryMatch(idx, selectedVi)
    }
  }

  const handleSelectVi = (idx: number) => {
    if (matched.has(idx)) return
    setWrongPair(null)
    setSelectedVi(idx)
    if (selectedJa !== null) {
      tryMatch(selectedJa, idx)
    }
  }

  const tryMatch = (jaIdx: number, viIdx: number) => {
    if (jaIdx === viIdx) {
      // Correct match
      setMatched((prev) => new Set([...prev, jaIdx]))
      setSelectedJa(null)
      setSelectedVi(null)
      setWrongPair(null)
    } else {
      // Wrong match
      setWrongPair({ ja: jaIdx, vi: viIdx })
      setTimeout(() => {
        setWrongPair(null)
        setSelectedJa(null)
        setSelectedVi(null)
      }, 800)
    }
  }

  const handleReset = () => {
    setSelectedJa(null)
    setSelectedVi(null)
    setMatched(new Set())
    setWrongPair(null)
    onReset()
  }

  if (finished) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-2">🎉</div>
        <p className="text-lg font-semibold text-gray-800">
          Ghép đúng {pairs.length}/{pairs.length} cặp!
        </p>
        <button
          onClick={handleReset}
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
        <span className="text-xs text-gray-400">Ghép cặp câu Nhật - Việt</span>
        <span className="text-xs text-gray-400">{matched.size}/{pairs.length}</span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${(matched.size / pairs.length) * 100}%` }}
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-2">
        {/* Japanese column */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">日本語</p>
          {shuffledJa.map((item) => {
            const isMatched = matched.has(item.idx)
            const isSelected = selectedJa === item.idx
            const isWrong = wrongPair?.ja === item.idx

            let cls = 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
            if (isMatched) cls = 'bg-green-50 border-green-300 text-green-600 opacity-60'
            else if (isWrong) cls = 'bg-red-50 border-red-400 text-red-700'
            else if (isSelected) cls = 'bg-purple-50 border-purple-400 text-purple-700 ring-2 ring-purple-200'

            return (
              <motion.button
                key={item.idx}
                onClick={() => handleSelectJa(item.idx)}
                disabled={isMatched}
                className={`w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg border transition-all leading-relaxed ${cls}`}
                whileTap={!isMatched ? { scale: 0.97 } : {}}
              >
                {isMatched && <Check size={12} className="inline mr-1 text-green-500" />}
                {item.text}
              </motion.button>
            )
          })}
        </div>

        {/* Vietnamese column */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Tiếng Việt</p>
          {shuffledVi.map((item) => {
            const isMatched = matched.has(item.idx)
            const isSelected = selectedVi === item.idx
            const isWrong = wrongPair?.vi === item.idx

            let cls = 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
            if (isMatched) cls = 'bg-green-50 border-green-300 text-green-600 opacity-60'
            else if (isWrong) cls = 'bg-red-50 border-red-400 text-red-700'
            else if (isSelected) cls = 'bg-blue-50 border-blue-400 text-blue-700 ring-2 ring-blue-200'

            return (
              <motion.button
                key={item.idx}
                onClick={() => handleSelectVi(item.idx)}
                disabled={isMatched}
                className={`w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg border transition-all leading-relaxed ${cls}`}
                whileTap={!isMatched ? { scale: 0.97 } : {}}
              >
                {isMatched && <Check size={12} className="inline mr-1 text-green-500" />}
                {item.text}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
