import { X, Check, RotateCcw, Shuffle, Undo2, RefreshCw, Play, Pause } from 'lucide-react'

interface StudyControlsProps {
  onForget: () => void
  onRemember: () => void
  onFlip: () => void
  onUndo: () => void
  onShuffle: () => void
  onReset: () => void
  onToggleAutoPlay: () => void
  canUndo: boolean
  autoPlay: boolean
  isComplete: boolean
}

export default function StudyControls({
  onForget,
  onRemember,
  onFlip,
  onUndo,
  onShuffle,
  onReset,
  onToggleAutoPlay,
  canUndo,
  autoPlay,
  isComplete,
}: StudyControlsProps) {
  return (
    <div className="space-y-4">
      {/* Main controls */}
      {!isComplete && (
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onForget}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center transition-colors active:scale-95"
            title="Chưa nhớ"
          >
            <X size={24} className="sm:w-7 sm:h-7" />
          </button>
          <button
            onClick={onFlip}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors active:scale-95"
            title="Lật thẻ"
          >
            <RotateCcw size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={onRemember}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center transition-colors active:scale-95"
            title="Đã nhớ"
          >
            <Check size={24} className="sm:w-7 sm:h-7" />
          </button>
        </div>
      )}

      {/* Secondary controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Hoàn tác"
        >
          <Undo2 size={14} /> Hoàn tác
        </button>
        <button
          onClick={onShuffle}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          title="Trộn thẻ"
        >
          <Shuffle size={14} /> Trộn
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          title="Đặt lại"
        >
          <RefreshCw size={14} /> Đặt lại
        </button>
        <button
          onClick={onToggleAutoPlay}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            autoPlay
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
          }`}
          title="Phát tự động"
        >
          {autoPlay ? <Pause size={14} /> : <Play size={14} />}
          Tự động
        </button>
      </div>
    </div>
  )
}
