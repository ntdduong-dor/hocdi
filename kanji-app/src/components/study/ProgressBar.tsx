interface ProgressBarProps {
  current: number
  total: number
  remembered: number
  forgotten: number
}

export default function ProgressBar({ current, total, remembered, forgotten }: ProgressBarProps) {
  const progress = total > 0 ? ((remembered + forgotten) / total) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {current} / {total}
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-green-600">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {remembered}
          </span>
          <span className="flex items-center gap-1 text-red-600">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {forgotten}
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
