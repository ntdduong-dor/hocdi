import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Home, ShieldCheck, ShieldOff, LogOut, X, Key, Check, Trash2, Loader2, Wifi, WifiOff } from 'lucide-react'
import { useAdminStore } from '../../store/useAdminStore'
import { validateTokenWithGist } from '../../lib/gistSync'
import SyncStatusIndicator from '../gist/SyncStatusIndicator'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { isAdmin, login, logout, gistToken, setGistToken, clearGistToken } = useAdminStore()

  const [showLogin, setShowLogin] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [tokenInput, setTokenInput] = useState('')
  const [connecting, setConnecting] = useState(false)
  const [tokenError, setTokenError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showLogin && !isAdmin) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [showLogin, isAdmin])

  useEffect(() => {
    if (!showLogin) return
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowLogin(false)
        setCode('')
        setError(false)
        setTokenInput('')
        setTokenError('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showLogin])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(code.trim())
    if (success) {
      setCode('')
      setError(false)
    } else {
      setError(true)
      setCode('')
      inputRef.current?.focus()
    }
  }

  const handleConnect = async () => {
    if (!tokenInput.trim()) return
    setConnecting(true)
    setTokenError('')

    const valid = await validateTokenWithGist(tokenInput.trim())
    if (valid) {
      setGistToken(tokenInput.trim())
      setTokenInput('')
    } else {
      setTokenError('Token không hợp lệ hoặc không có quyền ghi Gist')
    }
    setConnecting(false)
  }

  const handleDisconnect = () => {
    clearGistToken()
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
          <BookOpen size={24} />
          <span className="font-bold text-lg">Học Đi</span>
        </Link>

        <div className="flex items-center gap-3">
          {!isHome && (
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home size={16} />
              Trang chủ
            </Link>
          )}

          <SyncStatusIndicator />

          <div className="relative" ref={panelRef}>
            <button
              onClick={() => setShowLogin(true)}
              className={`p-2 rounded-lg transition-colors ${
                isAdmin
                  ? 'text-green-600 bg-green-50 hover:bg-green-100'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              title={isAdmin ? 'Quản trị viên' : 'Đăng nhập quản trị'}
            >
              {isAdmin ? <ShieldCheck size={20} /> : <ShieldOff size={20} />}
            </button>

            {showLogin && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">
                    {isAdmin ? 'Quản trị viên' : 'Đăng nhập'}
                  </span>
                  <button
                    onClick={() => { setShowLogin(false); setCode(''); setError(false); setTokenInput(''); setTokenError('') }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>

                {isAdmin ? (
                  <div>
                    <p className="text-sm text-green-600 mb-4 flex items-center gap-1.5">
                      <ShieldCheck size={16} /> Đang ở chế độ quản trị
                    </p>

                    {/* Gist connection section */}
                    <div className="border-t border-gray-100 pt-3 mb-4">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Kết nối GitHub Gist
                      </label>

                      {gistToken ? (
                        <div>
                          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg mb-2">
                            <Wifi size={14} className="text-green-600 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-green-700">Đã kết nối</p>
                              <p className="text-[10px] text-green-600 font-mono truncate">
                                {gistToken.slice(0, 8)}...{gistToken.slice(-4)}
                              </p>
                            </div>
                            <button
                              onClick={handleDisconnect}
                              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                              title="Ngắt kết nối"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg mb-3">
                            <WifiOff size={14} className="text-gray-400" />
                            <p className="text-xs text-gray-500">Chưa kết nối — nhập token để đồng bộ</p>
                          </div>

                          <div className="flex gap-1.5 mb-1">
                            <div className="relative flex-1">
                              <Key size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                              <input
                                type="password"
                                value={tokenInput}
                                onChange={(e) => { setTokenInput(e.target.value); setTokenError('') }}
                                placeholder="ghp_xxxx..."
                                className={`w-full pl-8 pr-2 py-1.5 text-xs border rounded-lg outline-none transition-colors ${
                                  tokenError ? 'border-red-400' : 'border-gray-300 focus:border-blue-500'
                                }`}
                                onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
                              />
                            </div>
                            <button
                              onClick={handleConnect}
                              disabled={!tokenInput.trim() || connecting}
                              className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors flex items-center gap-1"
                            >
                              {connecting ? <Loader2 size={12} className="animate-spin" /> : <Wifi size={12} />}
                              Kết nối
                            </button>
                          </div>
                          {tokenError && (
                            <p className="text-[11px] text-red-500 mt-1">{tokenError}</p>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => { logout(); setShowLogin(false) }}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <LogOut size={16} /> Đăng xuất
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input
                      ref={inputRef}
                      type="password"
                      value={code}
                      onChange={(e) => { setCode(e.target.value); setError(false) }}
                      placeholder="Nhập mã quản trị"
                      className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors ${
                        error
                          ? 'border-red-400 bg-red-50 focus:border-red-500'
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                    />
                    {error && (
                      <p className="text-xs text-red-500 mt-1">Mã không đúng</p>
                    )}
                    <button
                      type="submit"
                      className="w-full mt-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Xác nhận
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
