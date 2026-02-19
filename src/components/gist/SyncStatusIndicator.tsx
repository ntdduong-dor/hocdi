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
  } = useGistSync()

  const isBusy = syncStatus === 'syncing'

  // Admin có token + có thay đổi
  const showPush = hasUnsyncedChanges && writable && !isBusy
  // Admin chưa nhập token nhưng có thay đổi
  const showNeedToken = hasUnsyncedChanges && isAdmin && !writable && !isBusy

  // --- Pull: tải data từ Gist ---
  const handlePull = async () => {
    if (isBusy) return
    await pullFromGist()
    window.location.reload()
  }

  // --- Push: đẩy data lên Gist ---
  const handlePush = () => {
    if (isBusy) return
    pushToGist()
  }

  const timeStr = lastSyncedAt ? formatTimeAgo(lastSyncedAt) : ''

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
      onClick: handlePush,
    }
    if (syncStatus === 'error') return {
      icon: <AlertCircle size={14} />,
      text: syncError || 'Lỗi đồng bộ',
      color: 'text-red-600 bg-red-50',
      dotColor: 'bg-red-500',
      onClick: handlePull,
    }
    return null
  }

  const notification = getNotification()

  return (
    <div className="flex items-center gap-2">
      {/* Nút Pull — luôn hiện */}
      <button
        onClick={handlePull}
        disabled={isBusy}
        className={`p-2 rounded-lg transition-colors disabled:cursor-wait ${
          isBusy
            ? 'text-blue-600 bg-blue-50'
            : syncStatus === 'synced'
              ? 'text-green-600 bg-green-50 hover:bg-green-100'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        title={isBusy ? 'Đang đồng bộ...' : `Tải dữ liệu từ Gist${timeStr ? ` · ${timeStr}` : ''}`}
      >
        {isBusy ? (
          <RefreshCw size={18} className="animate-spin" />
        ) : syncStatus === 'synced' ? (
          <Check size={18} />
        ) : (
          <Download size={18} />
        )}
      </button>

      {/* Nút Push — chỉ hiện khi admin có token */}
      {writable && (
        <button
          onClick={handlePush}
          disabled={isBusy}
          className={`relative p-2 rounded-lg transition-colors disabled:cursor-wait ${
            showPush
              ? 'text-orange-600 bg-orange-50 hover:bg-orange-100'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          title={showPush ? `Đẩy ${changeCount} thay đổi lên Gist` : 'Đẩy dữ liệu lên Gist'}
        >
          <Upload size={18} />
          {showPush && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
              {changeCount > 9 ? '9+' : changeCount}
            </span>
          )}
        </button>
      )}

      {/* Thông báo trạng thái */}
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
