import { RefreshCw, Check, AlertCircle, Upload, Download, CloudOff } from 'lucide-react'
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
    writable,
    isAdmin,
    hasUnsyncedChanges,
    changeCount,
    hasRemoteUpdate,
  } = useGistSync()

  const isBusy = syncStatus === 'syncing'

  // Trạng thái thông báo
  const showPush = hasUnsyncedChanges && writable && !isBusy
  const showNeedToken = hasUnsyncedChanges && isAdmin && !writable && !isBusy
  const showPull = hasRemoteUpdate && !isBusy && !showPush && !showNeedToken

  // --- Nút bấm thủ công: luôn hiện ---
  const handleManualSync = () => {
    if (isBusy) return
    if (writable) {
      pushToGist()
    } else {
      pullFromGist()
    }
  }

  const syncButtonTitle = () => {
    if (isBusy) return 'Đang đồng bộ...'
    const timeStr = lastSyncedAt ? `Lần cuối: ${formatTimeAgo(lastSyncedAt)}` : ''
    if (writable) return `Đẩy dữ liệu lên Gist${timeStr ? ` · ${timeStr}` : ''}`
    return `Tải dữ liệu từ Gist${timeStr ? ` · ${timeStr}` : ''}`
  }

  // --- Thông báo trạng thái ---
  const getNotification = () => {
    if (showNeedToken) return {
      icon: <CloudOff size={14} />,
      text: 'Cần kết nối Gist token',
      color: 'text-yellow-600 bg-yellow-50',
      dotColor: 'bg-yellow-500',
      onClick: () => {},
    }
    if (showPush) return {
      icon: <Upload size={14} />,
      text: `${changeCount} thay đổi chưa đồng bộ`,
      color: 'text-orange-600 bg-orange-50',
      dotColor: 'bg-orange-500',
      onClick: () => pushToGist(),
    }
    if (showPull) return {
      icon: <Download size={14} />,
      text: 'Có bài học mới',
      color: 'text-blue-600 bg-blue-50',
      dotColor: 'bg-blue-500',
      onClick: () => pullFromGist(),
    }
    if (syncStatus === 'error') return {
      icon: <AlertCircle size={14} />,
      text: syncError || 'Lỗi đồng bộ',
      color: 'text-red-600 bg-red-50',
      dotColor: 'bg-red-500',
      onClick: () => pullFromGist(),
    }
    return null
  }

  const notification = getNotification()

  return (
    <div className="flex items-center gap-2">
      {/* Nút đồng bộ thủ công — luôn hiện */}
      <button
        onClick={handleManualSync}
        disabled={isBusy}
        className={`p-2 rounded-lg transition-colors disabled:cursor-wait ${
          isBusy
            ? 'text-blue-600 bg-blue-50'
            : syncStatus === 'synced'
              ? 'text-green-600 bg-green-50 hover:bg-green-100'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        title={syncButtonTitle()}
      >
        {isBusy ? (
          <RefreshCw size={18} className="animate-spin" />
        ) : syncStatus === 'synced' ? (
          <Check size={18} />
        ) : (
          <RefreshCw size={18} />
        )}
      </button>

      {/* Thông báo trạng thái — chỉ hiện khi có sự kiện */}
      {notification && (
        <button
          onClick={notification.onClick}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 ${notification.color}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${notification.dotColor} flex-shrink-0`} />
          {notification.icon}
          <span className="hidden sm:inline">{notification.text}</span>
        </button>
      )}
    </div>
  )
}
