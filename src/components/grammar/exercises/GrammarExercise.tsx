import { useState, useMemo, useCallback } from 'react'
import { PenLine, Languages, Link2 } from 'lucide-react'
import { generateFillBlank, generateTranslateQuiz, generateMatchPairs } from '../../../lib/grammarExercise'
import FillBlankExercise from './FillBlankExercise'
import TranslateExercise from './TranslateExercise'
import MatchPairsExercise from './MatchPairsExercise'
import type { GrammarPoint } from '../../../types/grammar'

type ExerciseType = 'fill' | 'translate' | 'match'

interface Props {
  grammar: GrammarPoint
  allGrammar: GrammarPoint[]
}

export default function GrammarExercise({ grammar, allGrammar }: Props) {
  const [activeType, setActiveType] = useState<ExerciseType>('fill')
  const [resetKey, setResetKey] = useState(0)

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1)
  }, [])

  const fillQuestions = useMemo(
    () => generateFillBlank(grammar, 5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grammar.id, resetKey]
  )

  const translateQuestions = useMemo(
    () => generateTranslateQuiz(grammar, allGrammar, 5),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grammar.id, allGrammar, resetKey]
  )

  const matchPairs = useMemo(
    () => generateMatchPairs(grammar, 4),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [grammar.id, resetKey]
  )

  const tabs: { key: ExerciseType; label: string; icon: React.ReactNode }[] = [
    { key: 'fill', label: 'Điền', icon: <PenLine size={13} /> },
    { key: 'translate', label: 'Dịch', icon: <Languages size={13} /> },
    { key: 'match', label: 'Ghép', icon: <Link2 size={13} /> },
  ]

  return (
    <div>
      {/* Exercise type tabs */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5 mb-4">
        {tabs.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => { setActiveType(key); handleReset() }}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex-1 justify-center ${
              activeType === key
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {icon} {label}
          </button>
        ))}
      </div>

      {/* Exercise content */}
      {activeType === 'fill' && (
        <FillBlankExercise key={`fill-${resetKey}`} questions={fillQuestions} onReset={handleReset} />
      )}
      {activeType === 'translate' && (
        <TranslateExercise key={`translate-${resetKey}`} questions={translateQuestions} onReset={handleReset} />
      )}
      {activeType === 'match' && (
        <MatchPairsExercise key={`match-${resetKey}`} pairs={matchPairs} onReset={handleReset} />
      )}
    </div>
  )
}
