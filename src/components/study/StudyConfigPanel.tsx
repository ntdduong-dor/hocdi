import type { CardField, StudyConfig } from '../../types'
import { CARD_FIELD_LABELS } from '../../types'

interface StudyConfigPanelProps {
  config: StudyConfig
  onChange: (config: StudyConfig) => void
  onStart: () => void
}

const ALL_FIELDS: CardField[] = ['kanji', 'sinoVietnamese', 'hiragana', 'meaning']

export default function StudyConfigPanel({ config, onChange, onStart }: StudyConfigPanelProps) {
  const toggleField = (side: 'frontFields' | 'backFields', field: CardField) => {
    const current = config[side]
    const updated = current.includes(field)
      ? current.filter((f) => f !== field)
      : [...current, field]
    if (updated.length === 0) return // must have at least 1
    onChange({ ...config, [side]: updated })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-lg mx-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Cài đặt học</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mặt trước</label>
          <div className="flex flex-wrap gap-2">
            {ALL_FIELDS.map((field) => (
              <button
                key={field}
                onClick={() => toggleField('frontFields', field)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  config.frontFields.includes(field)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {CARD_FIELD_LABELS[field]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mặt sau</label>
          <div className="flex flex-wrap gap-2">
            {ALL_FIELDS.map((field) => (
              <button
                key={field}
                onClick={() => toggleField('backFields', field)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  config.backFields.includes(field)
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {CARD_FIELD_LABELS[field]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={config.shuffle}
              onChange={(e) => onChange({ ...config, shuffle: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Trộn thẻ
          </label>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full mt-6 px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Bắt đầu học
      </button>
    </div>
  )
}
