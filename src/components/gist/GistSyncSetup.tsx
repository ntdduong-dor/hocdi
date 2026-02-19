import { useState } from 'react'
import Modal from '../ui/Modal'
import { useGistStore } from '../../store/useGistStore'
import { useAppStore } from '../../store/useAppStore'
import { validateToken, createGist, fetchGist, parseGistId } from '../../lib/gistSync'
import type { GistSyncData } from '../../lib/gistSync'
import { Key, Loader2, Check, Link, CloudUpload, ExternalLink } from 'lucide-react'

interface GistSyncSetupProps {
  isOpen: boolean
  onClose: () => void
}

type Step = 'token' | 'choose'

export default function GistSyncSetup({ isOpen, onClose }: GistSyncSetupProps) {
  const { setConfig } = useGistStore()

  const [step, setStep] = useState<Step>('token')
  const [token, setToken] = useState('')
  const [username, setUsername] = useState('')
  const [validating, setValidating] = useState(false)
  const [tokenError, setTokenError] = useState('')
  const [tokenValid, setTokenValid] = useState(false)

  // Step 2 state
  const [mode, setMode] = useState<'create' | 'link'>('create')
  const [gistInput, setGistInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [linkPreview, setLinkPreview] = useState<{ folders: number; lessons: number; kanjiLessons: number } | null>(null)

  const reset = () => {
    setStep('token')
    setToken('')
    setUsername('')
    setValidating(false)
    setTokenError('')
    setTokenValid(false)
    setMode('create')
    setGistInput('')
    setLoading(false)
    setError('')
    setLinkPreview(null)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleValidateToken = async () => {
    if (!token.trim()) return
    setValidating(true)
    setTokenError('')

    const user = await validateToken(token.trim())
    if (user) {
      setUsername(user)
      setTokenValid(true)
      setStep('choose')
    } else {
      setTokenError('Token không hợp lệ. Hãy kiểm tra lại.')
    }
    setValidating(false)
  }

  const handleCreateGist = async () => {
    setLoading(true)
    setError('')

    try {
      const state = useAppStore.getState()
      const data: GistSyncData = {
        folders: state.folders,
        lessons: state.lessons,
        kanjiLessons: state.kanjiLessons,
        _lastModified: Date.now(),
      }

      const gistId = await createGist(token.trim(), data)
      useAppStore.setState({ _lastModified: data._lastModified })
      setConfig(token.trim(), gistId)
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tạo Gist')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyGist = async () => {
    if (!gistInput.trim()) return
    setLoading(true)
    setError('')
    setLinkPreview(null)

    try {
      const gistId = parseGistId(gistInput.trim())
      const data = await fetchGist(token.trim(), gistId)

      if (!data) {
        setError('Gist không chứa dữ liệu hợp lệ của ứng dụng.')
        return
      }

      setLinkPreview({
        folders: data.folders.length,
        lessons: data.lessons.length,
        kanjiLessons: data.kanjiLessons.length,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể đọc Gist')
    } finally {
      setLoading(false)
    }
  }

  const handleLinkGist = async () => {
    setLoading(true)
    setError('')

    try {
      const gistId = parseGistId(gistInput.trim())
      const data = await fetchGist(token.trim(), gistId)

      if (data) {
        // Import remote data
        useAppStore.setState({
          folders: data.folders,
          lessons: data.lessons,
          kanjiLessons: data.kanjiLessons,
          _lastModified: data._lastModified,
        })
      }

      setConfig(token.trim(), gistId)
      handleClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể liên kết Gist')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Cài đặt đồng bộ GitHub Gist" size="md">
      {step === 'token' && (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Đồng bộ dữ liệu qua GitHub Gist để dùng trên nhiều thiết bị.
            Bạn cần tạo một <strong>Personal Access Token</strong> với quyền <code className="bg-gray-100 px-1 rounded text-xs">gist</code>.
          </p>

          <a
            href="https://github.com/settings/tokens/new?scopes=gist&description=Hoc+Di+Kanji+App"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4"
          >
            <ExternalLink size={14} /> Tạo token trên GitHub
          </a>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Token</label>
            <div className="relative">
              <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={token}
                onChange={(e) => { setToken(e.target.value); setTokenError('') }}
                placeholder="ghp_xxxxxxxxxxxx"
                className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg outline-none transition-colors ${
                  tokenError ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                onKeyDown={(e) => e.key === 'Enter' && handleValidateToken()}
              />
            </div>
            {tokenError && <p className="text-xs text-red-500 mt-1">{tokenError}</p>}
          </div>

          <button
            onClick={handleValidateToken}
            disabled={!token.trim() || validating}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {validating ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
            Xác thực token
          </button>
        </div>
      )}

      {step === 'choose' && (
        <div>
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-green-50 rounded-lg text-sm text-green-700">
            <Check size={16} />
            Đã xác thực: <strong>{username}</strong>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => { setMode('create'); setError(''); setLinkPreview(null) }}
              className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                mode === 'create' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <CloudUpload size={14} className="inline mr-1" /> Tạo Gist mới
            </button>
            <button
              onClick={() => { setMode('link'); setError('') }}
              className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                mode === 'link' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Link size={14} className="inline mr-1" /> Liên kết có sẵn
            </button>
          </div>

          {mode === 'create' && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Tạo một Gist mới (private) và upload dữ liệu hiện tại lên. Dùng khi bạn thiết lập lần đầu.
              </p>
              <button
                onClick={handleCreateGist}
                disabled={loading}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <CloudUpload size={16} />}
                Tạo Gist & Bắt đầu đồng bộ
              </button>
            </div>
          )}

          {mode === 'link' && (
            <div>
              <p className="text-sm text-gray-600 mb-3">
                Nhập URL hoặc ID của Gist đã tạo trước đó. Dữ liệu từ Gist sẽ được tải về thiết bị này.
              </p>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gist URL hoặc ID</label>
                <div className="relative">
                  <Link size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={gistInput}
                    onChange={(e) => { setGistInput(e.target.value); setError(''); setLinkPreview(null) }}
                    placeholder="https://gist.github.com/user/abc123... hoặc abc123..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {!linkPreview && (
                <button
                  onClick={handleVerifyGist}
                  disabled={!gistInput.trim() || loading}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors mb-2"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  Kiểm tra Gist
                </button>
              )}

              {linkPreview && (
                <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium mb-1">Dữ liệu tìm thấy:</p>
                  <p className="text-xs text-blue-600">
                    {linkPreview.folders} thư mục · {linkPreview.lessons} bài học · {linkPreview.kanjiLessons} bài Hán tự
                  </p>
                  <button
                    onClick={handleLinkGist}
                    disabled={loading}
                    className="w-full mt-3 flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Link size={16} />}
                    Liên kết & Tải dữ liệu
                  </button>
                </div>
              )}
            </div>
          )}

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <button
            onClick={() => { setStep('token'); setTokenValid(false); setError('') }}
            className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Quay lại nhập token
          </button>
        </div>
      )}
    </Modal>
  )
}
