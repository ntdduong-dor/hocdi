import { useState, useRef, useEffect } from 'react'
import { Cloud, CloudOff, RefreshCw, Check, X, Unplug } from 'lucide-react'
import { useGistStore } from '../../store/useGistStore'
import { useGistSync } from '../../hooks/useGistSync'

interface SyncStatusIndicatorProps {
  onSetupClick: () => void
}

function formatTimeAgo(timestamp: number): string {
  const diff = Math.floor((Date.now() - timestamp) / 1000)
  if (diff < 60) return 'vừa xong'
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`
  return `${Math.floor(diff / 86400)} ngày trước`
}

export default function SyncStatusIndicator({ onSetupClick }: SyncStatusIndicatorProps) {
  const { token, gistId, syncStatus, lastSyncedAt, syncError, clearConfig } = useGistStore()
  const { pushToGist } = useGistSync()
  const isConfigured = !!(token && gistId)

  const [showPanel, setShowPanel] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close panel on outside click
  useEffect(() => {
    if (!showPanel) return
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showPanel])

  const handleClick = () => {
    if (!isConfigured) {
      onSetupClick()
    } else {
      setShowPanel((v) => !v)
    }
  }

  const handleDisconnect = () => {
    clearConfig()
    setShowPanel(false)
  }

  const handleSyncNow = () => {
    pushToGist()
  }

  const getIcon = () => {
    if (!isConfigured) return <Cloud size={18} />
    switch (syncStatus) {
      case 'syncing':
        return <RefreshCw size={18} className="animate-spin" />
      case 'synced':
        return <Check size={18} />
      case 'error':
        return <CloudOff size={18} />
      default:
        return <Cloud size={18} />
    }
  }

  const getColorClass = () => {
    if (!isConfigured) return 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
    switch (syncStatus) {
      case 'syncing':
        return 'text-blue-600 bg-blue-50'
      case 'synced':
        return 'text-green-600 bg-green-50 hover:bg-green-100'
      case 'error':
        return 'text-red-600 bg-red-50 hover:bg-red-100'
      default:
        return 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
    }
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={handleClick}
        className={`p-2 rounded-lg transition-colors ${getColorClass()}`}
        title={
          !isConfigured
            ? 'Cài đặt đồng bộ Gist'
            : syncStatus === 'synced'
              ? `Đã đồng bộ${lastSyncedAt ? ` · ${formatTimeAgo(lastSyncedAt)}` : ''}`
              : syncStatus === 'syncing'
                ? 'Đang đồng bộ...'
                : syncStatus === 'error'
                  ? 'Lỗi đồng bộ'
                  : 'Đồng bộ Gist'
        }
      >
        {getIcon()}
      </button>

      {showPanel && isConfigured && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Đồng bộ Gist</span>
            <button
              onClick={() => setShowPanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>

          {/* Status */}
          <div className="mb-3">
            {syncStatus === 'synced' && (
              <p className="text-sm text-green-600 flex items-center gap-1.5">
                <Check size={16} /> Đã đồng bộ
              </p>
            )}
            {syncStatus === 'syncing' && (
              <p className="text-sm text-blue-600 flex items-center gap-1.5">
                <RefreshCw size={16} className="animate-spin" /> Đang đồng bộ...
              </p>
            )}
            {syncStatus === 'error' && (
              <div>
                <p className="text-sm text-red-600 flex items-center gap-1.5">
                  <CloudOff size={16} /> Lỗi đồng bộ
                </p>
                {syncError && (
                  <p className="text-xs text-red-500 mt-1">{syncError}</p>
                )}
              </div>
            )}
            {syncStatus === 'idle' && (
              <p className="text-sm text-gray-500">Sẵn sàng</p>
            )}
          </div>

          {lastSyncedAt && (
            <p className="text-xs text-gray-400 mb-3">
              Lần cuối: {formatTimeAgo(lastSyncedAt)}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSyncNow}
              disabled={syncStatus === 'syncing'}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={14} /> Đồng bộ ngay
            </button>
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Unplug size={14} /> Ngắt kết nối
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
