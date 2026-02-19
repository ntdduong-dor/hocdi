import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import type { MatchPair } from '../../lib/quizGenerator'

interface MatchPairsProps {
  pairs: MatchPair[]
  onComplete: (attempts: number, time: number) => void
}

function shuffleArray<T>(arr: T[]): T[] {
  const s = [...arr]
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[s[i], s[j]] = [s[j], s[i]]
  }
  return s
}

export default function MatchPairs({ pairs, onComplete }: MatchPairsProps) {
  const [matchState, setMatchState] = useState<MatchPair[]>(pairs.map((p) => ({ ...p })))
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null)
  const [startTime] = useState(Date.now())

  const shuffledRight = useMemo(() => shuffleArray(pairs.map((p) => ({ id: p.id, text: p.right }))), [pairs])

  const handleLeftClick = (id: string) => {
    if (matchState.find((p) => p.id === id)?.matched) return
    setSelectedLeft(id)
    setWrongPair(null)
    if (selectedRight) {
      tryMatch(id, selectedRight)
    }
  }

  const handleRightClick = (id: string) => {
    if (matchState.find((p) => p.id === id)?.matched) return
    setSelectedRight(id)
    setWrongPair(null)
    if (selectedLeft) {
      tryMatch(selectedLeft, id)
    }
  }

  const tryMatch = (leftId: string, rightId: string) => {
    setAttempts((a) => a + 1)
    if (leftId === rightId) {
      const updated = matchState.map((p) => p.id === leftId ? { ...p, matched: true } : p)
      setMatchState(updated)
      setSelectedLeft(null)
      setSelectedRight(null)
      if (updated.every((p) => p.matched)) {
        onComplete(attempts + 1, Math.round((Date.now() - startTime) / 1000))
      }
    } else {
      setWrongPair({ left: leftId, right: rightId })
      setTimeout(() => {
        setSelectedLeft(null)
        setSelectedRight(null)
        setWrongPair(null)
      }, 800)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-sm text-gray-500 mb-4">
        Nối cặp tương ứng | Số lần thử: {attempts}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          {matchState.map((pair) => (
            <motion.button
              key={`left-${pair.id}`}
              onClick={() => handleLeftClick(pair.id)}
              disabled={pair.matched}
              className={`w-full text-left px-4 py-3 rounded-lg border text-lg transition-colors ${
                pair.matched
                  ? 'bg-green-50 border-green-300 text-green-700 opacity-60'
                  : selectedLeft === pair.id
                  ? wrongPair?.left === pair.id
                    ? 'bg-red-50 border-red-500'
                    : 'bg-blue-50 border-blue-500'
                  : 'bg-white border-gray-200 hover:border-gray-400'
              }`}
              whileTap={!pair.matched ? { scale: 0.98 } : {}}
            >
              {pair.left}
            </motion.button>
          ))}
        </div>
        <div className="space-y-2">
          {shuffledRight.map((item) => {
            const pair = matchState.find((p) => p.id === item.id)!
            return (
              <motion.button
                key={`right-${item.id}`}
                onClick={() => handleRightClick(item.id)}
                disabled={pair.matched}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                  pair.matched
                    ? 'bg-green-50 border-green-300 text-green-700 opacity-60'
                    : selectedRight === item.id
                    ? wrongPair?.right === item.id
                      ? 'bg-red-50 border-red-500'
                      : 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-200 hover:border-gray-400'
                }`}
                whileTap={!pair.matched ? { scale: 0.98 } : {}}
              >
                {item.text}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
