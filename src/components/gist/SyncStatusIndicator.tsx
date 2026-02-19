import { RefreshCw, Check, AlertCircle, Upload } from 'lucide-react'
import { useGistSync } from '../../hooks/useGistSync'

function formatTimeAgo(timestamp: number): string {
  const diff = Math.floor((Date.now() - timestamp) / 1000)
  if (diff < 60) return 'vừa xong'
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`
  return `${Math.floor(diff / 86400)} ngày trước`
}

export default function SyncStatusIndicator() {
  const {
    pushToGist,
    syncStatus,
    syncError,
    lastSyncedAt,
    configured,
    hasUnsyncedChanges,
    changeCount,
  } = useGistSync()

  if (!configured) return null

  const handleClick = () => {
    if (syncStatus !== 'syncing') {
      pushToGist()
    }
  }

  // Ưu tiên: có thay đổi chưa sync > trạng thái sync
  const showDirty = hasUnsyncedChanges && syncStatus !== 'syncing'

  const getIcon = () => {
    if (showDirty) return <Upload size={18} />
    switch (syncStatus) {
      case 'syncing':
        return <RefreshCw size={18} className="animate-spin" />
      case 'synced':
        return <Check size={18} />
      case 'error':
        return <AlertCircle size={18} />
      default:
        return <RefreshCw size={18} />
    }
  }

  const getColorClass = () => {
    if (showDirty) return 'text-orange-600 bg-orange-50 hover:bg-orange-100'
    switch (syncStatus) {
      case 'syncing':
        return 'text-blue-600 bg-blue-50'
      case 'synced':
        return 'text-green-600 bg-green-50 hover:bg-green-100'
      case 'error':
        return 'text-red-600 bg-red-50 hover:bg-red-100'
      default:
        return 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    }
  }

  const getTitle = () => {
    if (showDirty) return `Có ${changeCount} thay đổi chưa đồng bộ — Bấm để đồng bộ`
    const timeStr = lastSyncedAt ? ` · ${formatTimeAgo(lastSyncedAt)}` : ''
    switch (syncStatus) {
      case 'syncing':
        return 'Đang đồng bộ...'
      case 'synced':
        return `Đã đồng bộ${timeStr}`
      case 'error':
        return syncError || 'Lỗi đồng bộ'
      default:
        return 'Bấm để đồng bộ'
    }
  }

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={handleClick}
        disabled={syncStatus === 'syncing'}
        className={`relative p-2 rounded-lg transition-colors disabled:cursor-wait ${getColorClass()}`}
        title={getTitle()}
      >
        {getIcon()}

        {/* Badge số thay đổi */}
        {showDirty && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
            {changeCount > 9 ? '9+' : changeCount}
          </span>
        )}
      </button>

      {/* Tin nhắn khi có thay đổi */}
      {showDirty && (
        <span
          onClick={handleClick}
          className="hidden sm:block text-xs text-orange-600 font-medium cursor-pointer hover:underline"
        >
          Chưa đồng bộ
        </span>
      )}
    </div>
  )
}
