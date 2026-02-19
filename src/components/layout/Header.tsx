import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Home, ShieldCheck, ShieldOff, LogOut, X } from 'lucide-react'
import { useAdminStore } from '../../store/useAdminStore'
import SyncStatusIndicator from '../gist/SyncStatusIndicator'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { isAdmin, login, logout } = useAdminStore()

  const [showLogin, setShowLogin] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Focus input when panel opens
  useEffect(() => {
    if (showLogin) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [showLogin])

  // Close panel on outside click
  useEffect(() => {
    if (!showLogin) return
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowLogin(false)
        setCode('')
        setError(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showLogin])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(code.trim())
    if (success) {
      setShowLogin(false)
      setCode('')
      setError(false)
    } else {
      setError(true)
      setCode('')
      inputRef.current?.focus()
    }
  }

  const handleAdminClick = () => {
    setShowLogin(true)
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

          {/* Sync button */}
          <SyncStatusIndicator />

          {/* Admin button */}
          <div className="relative" ref={panelRef}>
            <button
              onClick={handleAdminClick}
              className={`p-2 rounded-lg transition-colors ${
                isAdmin
                  ? 'text-green-600 bg-green-50 hover:bg-green-100'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              title={isAdmin ? 'Quản trị viên' : 'Đăng nhập quản trị'}
            >
              {isAdmin ? <ShieldCheck size={20} /> : <ShieldOff size={20} />}
            </button>

            {/* Login / Logout panel */}
            {showLogin && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">
                    {isAdmin ? 'Quản trị viên' : 'Đăng nhập'}
                  </span>
                  <button
                    onClick={() => { setShowLogin(false); setCode(''); setError(false) }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>

                {isAdmin ? (
                  <div>
                    <p className="text-sm text-green-600 mb-3 flex items-center gap-1.5">
                      <ShieldCheck size={16} /> Đang ở chế độ quản trị
                    </p>
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
