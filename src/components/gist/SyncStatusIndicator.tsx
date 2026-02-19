import { RefreshCw, Check, AlertCircle, Upload, Download } from 'lucide-react'
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
    pullFromGist,
    syncStatus,
    syncError,
    lastSyncedAt,
    configured,
    writable,
    hasUnsyncedChanges,
    changeCount,
    hasRemoteUpdate,
  } = useGistSync()

  if (!configured) return null

  const isBusy = syncStatus === 'syncing'

  // Admin: có thay đổi local chưa push
  const showPush = hasUnsyncedChanges && writable && !isBusy
  // User: có data mới trên remote chưa pull
  const showPull = hasRemoteUpdate && !isBusy && !showPush

  const handleClick = () => {
    if (isBusy) return
    if (showPush) {
      pushToGist()
    } else if (showPull) {
      pullFromGist()
    } else if (writable) {
      pushToGist()
    } else {
      pullFromGist()
    }
  }

  const getIcon = () => {
    if (showPush) return <Upload size={18} />
    if (showPull) return <Download size={18} />
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
    if (showPush) return 'text-orange-600 bg-orange-50 hover:bg-orange-100'
    if (showPull) return 'text-blue-600 bg-blue-50 hover:bg-blue-100'
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
    if (showPush) return `Có ${changeCount} thay đổi chưa đồng bộ — Bấm để đẩy lên`
    if (showPull) return 'Có bài học mới — Bấm để cập nhật'
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

  const getMessage = () => {
    if (showPush) return 'Chưa đồng bộ'
    if (showPull) return 'Có bài học mới'
    return null
  }

  const getMessageColor = () => {
    if (showPush) return 'text-orange-600'
    if (showPull) return 'text-blue-600'
    return ''
  }

  const message = getMessage()

  return (
    <div className="relative flex items-center gap-2">
      <button
        onClick={handleClick}
        disabled={isBusy}
        className={`relative p-2 rounded-lg transition-colors disabled:cursor-wait ${getColorClass()}`}
        title={getTitle()}
      >
        {getIcon()}

        {/* Badge: push count hoặc pull dot */}
        {showPush && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
            {changeCount > 9 ? '9+' : changeCount}
          </span>
        )}
        {showPull && (
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
          </span>
        )}
      </button>

      {/* Tin nhắn */}
      {message && (
        <span
          onClick={handleClick}
          className={`hidden sm:block text-xs font-medium cursor-pointer hover:underline ${getMessageColor()}`}
        >
          {message}
        </span>
      )}
    </div>
  )
}
