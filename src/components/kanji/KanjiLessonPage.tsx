import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { useAdminStore } from '../../store/useAdminStore'
import { useTTS } from '../../hooks/useTTS'
import { kanjiEntriesToFlashcards } from '../../lib/kanjiToFlashcard'
import InlineFlashcardBrowser from '../ui/InlineFlashcardBrowser'
import {
  ChevronLeft, ArrowLeft, Trash2, Edit2, Volume2, X, BookOpen, PenTool, Play, RotateCcw,
  GraduationCap, ClipboardCheck, Home, FolderOpen, Search,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { KanjiText } from '../ui/KanjiTooltip'
import type { KanjiEntry } from '../../types'
import ConfirmDialog from '../ui/ConfirmDialog'
import LessonFormModal from '../lesson/LessonFormModal'

export default function KanjiLessonPage() {
  const { kanjiLessonId } = useParams<{ kanjiLessonId: string }>()
  const navigate = useNavigate()
  const { kanjiLessons, folders, deleteKanjiLesson, updateKanjiLesson, deleteKanjiEntry } = useAppStore()
  const { isAdmin } = useAdminStore()

  const lesson = kanjiLessons.find((l) => l.id === kanjiLessonId)
  const folder = lesson?.folderId ? folders.find((f) => f.id === lesson.folderId) : null

  const [selectedEntry, setSelectedEntry] = useState<KanjiEntry | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteEntryId, setDeleteEntryId] = useState<string | null>(null)
  const [lessonModal, setLessonModal] = useState(false)
  const [search, setSearch] = useState('')
  const { supported: ttsSupported, speak } = useTTS()

  // Convert kanji entries to vocab flashcards
  const vocabCards = useMemo(() => {
    if (!lesson) return []
    return kanjiEntriesToFlashcards(lesson.entries)
  }, [lesson])

  const filteredEntries = useMemo(() => {
    if (!lesson || !search.trim()) return lesson?.entries ?? []
    const q = search.trim().toLowerCase()
    return lesson.entries.filter((e) =>
      e.character.includes(q) ||
      e.sinoVietnamese.toLowerCase().includes(q) ||
      (e.onyomi && e.onyomi.toLowerCase().includes(q)) ||
      (e.kunyomi && e.kunyomi.toLowerCase().includes(q)) ||
      e.vocabs.some((v) =>
        v.word.toLowerCase().includes(q) ||
        v.meaning.toLowerCase().includes(q) ||
        (v.reading && v.reading.toLowerCase().includes(q))
      )
    )
  }, [lesson, search])

  if (!lesson) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Không tìm thấy bài học</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">Về trang chủ</Link>
      </div>
    )
  }

  return (
    <div>
      {/* Back button + Breadcrumb */}
      <div className="flex items-center gap-3 mb-4">
        <Link
          to={folder ? `/folder/${folder.id}` : '/'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={16} />
          {folder ? folder.name : 'Trang chủ'}
        </Link>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-gray-600 transition-colors">
            <Home size={13} /> Trang chủ
          </Link>
          {folder && (
            <>
              <ChevronLeft size={14} className="rotate-180" />
              <Link to={`/folder/${folder.id}`} className="inline-flex items-center gap-1 hover:text-gray-600 transition-colors">
                <FolderOpen size={13} /> {folder.name}
              </Link>
            </>
          )}
          <ChevronLeft size={14} className="rotate-180" />
          <span className="inline-flex items-center gap-1 text-gray-600">
            <BookOpen size={13} /> {lesson.name}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">{lesson.name}</h1>
          </div>
          {lesson.description && <p className="text-gray-500 mt-1">{lesson.description}</p>}
          <p className="text-sm text-gray-400 mt-1">
            {lesson.entries.length} Hán tự · {lesson.entries.reduce((sum, e) => sum + e.vocabs.length, 0)} từ vựng
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {lesson.entries.reduce((sum, e) => sum + e.vocabs.length, 0) > 0 && (
            <Link
              to={`/kanji/${lesson.id}/study`}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <GraduationCap size={16} /> Học
            </Link>
          )}
          {lesson.entries.reduce((sum, e) => sum + e.vocabs.length, 0) >= 4 && (
            <Link
              to={`/kanji/${lesson.id}/quiz`}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <ClipboardCheck size={16} /> Kiểm tra
            </Link>
          )}
          {isAdmin && (
            <>
              <button
                onClick={() => setLessonModal(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sửa bài học"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => setDeleteConfirm(true)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Xóa bài học"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Inline Flashcard Browser */}
      {vocabCards.length > 0 && (
        <InlineFlashcardBrowser cards={vocabCards} accent="orange" />
      )}

      {/* Search */}
      {lesson.entries.length > 0 && (
        <div className="relative mb-3">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm Hán tự, từ vựng..."
            className="w-full pl-8 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 bg-white placeholder-gray-400"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* Kanji Grid */}
      {lesson.entries.length > 0 ? (
        filteredEntries.length > 0 ? (
          <>
            {search.trim() && (
              <p className="text-xs text-gray-400 mb-2">
                Tìm thấy {filteredEntries.length}/{lesson.entries.length} Hán tự
              </p>
            )}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-6">
              {filteredEntries.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className="aspect-square rounded-xl border-2 border-gray-200 bg-white flex flex-col items-center justify-center transition-all hover:border-orange-300 hover:shadow-md"
                >
                  <span className="text-2xl sm:text-3xl font-normal">{entry.character}</span>
                  <span className="text-[10px] text-orange-600 mt-0.5 font-medium">{entry.sinoVietnamese}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Search size={36} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">Không tìm thấy "{search}"</p>
            <button onClick={() => setSearch('')} className="text-xs text-orange-500 hover:underline mt-1">Xóa tìm kiếm</button>
          </div>
        )
      ) : (
        <div className="text-center py-12 text-gray-400">
          <BookOpen size={48} className="mx-auto mb-3 opacity-50" />
          <p>Chưa có Hán tự nào</p>
        </div>
      )}

      {/* Kanji Detail Dialog */}
      <KanjiDetailDialog
        entry={selectedEntry}
        ttsSupported={ttsSupported}
        onSpeak={speak}
        onClose={() => setSelectedEntry(null)}
        onDelete={(id) => setDeleteEntryId(id)}
        isAdmin={isAdmin}
      />

      {/* Modals */}
      <LessonFormModal
        isOpen={lessonModal}
        onClose={() => setLessonModal(false)}
        onSubmit={(name, folderId, description) => updateKanjiLesson(lesson.id, { name, folderId, description })}
        lesson={{ id: lesson.id, name: lesson.name, description: lesson.description, folderId: lesson.folderId } as any}
      />

      <ConfirmDialog
        isOpen={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        onConfirm={() => { deleteKanjiLesson(lesson.id); navigate('/') }}
        title="Xóa bài Hán tự"
        message={`Bạn có chắc muốn xóa "${lesson.name}"? Tất cả dữ liệu sẽ bị xóa.`}
        confirmLabel="Xóa"
        danger
      />

      <ConfirmDialog
        isOpen={!!deleteEntryId}
        onClose={() => setDeleteEntryId(null)}
        onConfirm={() => {
          if (deleteEntryId) {
            deleteKanjiEntry(lesson.id, deleteEntryId)
            if (selectedEntry?.id === deleteEntryId) setSelectedEntry(null)
          }
        }}
        title="Xóa Hán tự"
        message="Bạn có chắc muốn xóa Hán tự này?"
        confirmLabel="Xóa"
        danger
      />
    </div>
  )
}

// ===== Stroke Order Component =====
function KanjiStrokeOrder({ character }: { character: string }) {
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [strokeCount, setStrokeCount] = useState(0)
  const [showNumbers, setShowNumbers] = useState(true)
  const animationRef = useRef<number[]>([])

  const codePoint = character.codePointAt(0)?.toString(16).padStart(5, '0')

  useEffect(() => {
    if (!codePoint) return
    setLoading(true)
    setError(false)
    setSvgContent(null)

    const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${codePoint}.svg`
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Not found')
        return res.text()
      })
      .then((svg) => {
        setSvgContent(svg)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [codePoint])

  // Parse SVG: add ghost background + stroke numbers
  useEffect(() => {
    if (!svgContent || !svgContainerRef.current) return

    const container = svgContainerRef.current
    container.innerHTML = svgContent

    const svgEl = container.querySelector('svg')
    if (!svgEl) return

    svgEl.setAttribute('width', '100%')
    svgEl.setAttribute('height', '100%')
    svgEl.style.maxWidth = '220px'
    svgEl.style.maxHeight = '220px'

    // Remove existing text elements from KanjiVG
    svgEl.querySelectorAll('text').forEach((t) => t.remove())

    const paths = svgEl.querySelectorAll('path[d]')
    setStrokeCount(paths.length)

    // Create a ghost layer: clone all paths as light gray background
    const ghostGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    ghostGroup.setAttribute('class', 'ghost-layer')
    paths.forEach((path) => {
      const clone = path.cloneNode(true) as SVGPathElement
      clone.style.fill = 'none'
      clone.style.stroke = '#e5e7eb' // gray-200
      clone.style.strokeWidth = '5'
      clone.style.strokeLinecap = 'round'
      clone.style.strokeLinejoin = 'round'
      clone.style.opacity = '1'
      ghostGroup.appendChild(clone)
    })
    // Insert ghost layer before the first group (so it renders behind)
    const firstChild = svgEl.querySelector('g') || svgEl.firstChild
    if (firstChild) {
      svgEl.insertBefore(ghostGroup, firstChild)
    }

    // Style actual strokes on top
    paths.forEach((path) => {
      const p = path as SVGPathElement
      p.style.fill = 'none'
      p.style.stroke = '#1f2937'
      p.style.strokeWidth = '4'
      p.style.strokeLinecap = 'round'
      p.style.strokeLinejoin = 'round'
    })

    // Add small stroke numbers at the start of each path
    const numbersGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    numbersGroup.setAttribute('class', 'stroke-numbers')
    paths.forEach((path, i) => {
      const p = path as SVGPathElement
      try {
        const startPoint = p.getPointAtLength(0)
        const offsetX = -1
        const offsetY = -3

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', `${startPoint.x + offsetX}`)
        circle.setAttribute('cy', `${startPoint.y + offsetY}`)
        circle.setAttribute('r', '6')
        circle.setAttribute('fill', '#ea580c')
        circle.setAttribute('opacity', '0.85')
        numbersGroup.appendChild(circle)

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        text.setAttribute('x', `${startPoint.x + offsetX}`)
        text.setAttribute('y', `${startPoint.y + offsetY + 2.5}`)
        text.setAttribute('text-anchor', 'middle')
        text.setAttribute('font-size', '7')
        text.setAttribute('font-weight', '700')
        text.setAttribute('fill', 'white')
        text.setAttribute('font-family', 'system-ui, sans-serif')
        text.textContent = `${i + 1}`
        numbersGroup.appendChild(text)
      } catch {
        // getPointAtLength may fail on some paths
      }
    })
    svgEl.appendChild(numbersGroup)
  }, [svgContent])

  // Toggle stroke number visibility
  useEffect(() => {
    if (!svgContainerRef.current) return
    const numbersGroup = svgContainerRef.current.querySelector('.stroke-numbers')
    if (numbersGroup) {
      (numbersGroup as SVGElement).style.display = showNumbers ? '' : 'none'
    }
  }, [showNumbers, svgContent])

  const clearTimers = useCallback(() => {
    animationRef.current.forEach(clearTimeout)
    animationRef.current = []
  }, [])

  const animateStrokes = useCallback(() => {
    if (!svgContainerRef.current) return
    const svgEl = svgContainerRef.current.querySelector('svg')
    if (!svgEl) return

    clearTimers()
    setIsAnimating(true)

    // Hide stroke numbers during animation
    const numbersGroup = svgEl.querySelector('.stroke-numbers')
    if (numbersGroup) (numbersGroup as SVGElement).style.display = 'none'

    const paths = svgEl.querySelectorAll(':scope > g:not(.ghost-layer):not(.stroke-numbers) path[d]')

    // Hide all strokes first
    paths.forEach((path) => {
      const p = path as SVGPathElement
      const length = p.getTotalLength()
      p.style.strokeDasharray = `${length}`
      p.style.strokeDashoffset = `${length}`
      p.style.transition = 'none'
      p.style.stroke = '#1f2937'
    })

    // Animate each stroke sequentially
    let delay = 300
    paths.forEach((path) => {
      const p = path as SVGPathElement
      const length = p.getTotalLength()
      const duration = Math.min(Math.max(length * 3, 300), 800)

      const timerId = window.setTimeout(() => {
        p.style.stroke = '#ea580c'
        p.style.transition = `stroke-dashoffset ${duration}ms ease-in-out`
        p.style.strokeDashoffset = '0'

        const colorTimer = window.setTimeout(() => {
          p.style.stroke = '#1f2937'
        }, duration + 100)
        animationRef.current.push(colorTimer)
      }, delay)
      animationRef.current.push(timerId)

      delay += duration + 250
    })

    const endTimer = window.setTimeout(() => {
      setIsAnimating(false)
      // Show stroke numbers again after animation
      if (numbersGroup && showNumbers) (numbersGroup as SVGElement).style.display = ''
    }, delay)
    animationRef.current.push(endTimer)
  }, [clearTimers, showNumbers])

  const resetStrokes = useCallback(() => {
    if (!svgContainerRef.current) return
    const svgEl = svgContainerRef.current.querySelector('svg')
    if (!svgEl) return

    clearTimers()
    setIsAnimating(false)

    const paths = svgEl.querySelectorAll(':scope > g:not(.ghost-layer):not(.stroke-numbers) path[d]')
    paths.forEach((path) => {
      const p = path as SVGPathElement
      p.style.strokeDasharray = ''
      p.style.strokeDashoffset = ''
      p.style.transition = 'none'
      p.style.stroke = '#1f2937'
    })

    // Restore numbers
    const numbersGroup = svgEl.querySelector('.stroke-numbers')
    if (numbersGroup && showNumbers) (numbersGroup as SVGElement).style.display = ''
  }, [clearTimers, showNumbers])

  useEffect(() => {
    return () => clearTimers()
  }, [clearTimers])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[220px] text-gray-400">
        <div className="animate-spin w-6 h-6 border-2 border-orange-300 border-t-orange-600 rounded-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[160px] text-gray-400">
        <PenTool size={32} className="mb-2 opacity-50" />
        <p className="text-sm">Không tìm thấy nét viết</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={svgContainerRef}
        className="w-[220px] h-[220px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center p-3"
      />
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400">{strokeCount} nét</span>
        <button
          onClick={animateStrokes}
          disabled={isAnimating}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors disabled:opacity-50"
        >
          <Play size={12} /> Xem cách viết
        </button>
        <button
          onClick={resetStrokes}
          className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RotateCcw size={12} />
        </button>
        <button
          onClick={() => setShowNumbers(!showNumbers)}
          className={`px-2 py-1.5 text-xs rounded-lg transition-colors ${
            showNumbers ? 'text-orange-600 bg-orange-50' : 'text-gray-400 hover:bg-gray-100'
          }`}
          title={showNumbers ? 'Ẩn số thứ tự' : 'Hiện số thứ tự'}
        >
          1,2,3
        </button>
      </div>
    </div>
  )
}

// ===== Detail Dialog =====
function KanjiDetailDialog({
  entry,
  ttsSupported,
  onSpeak,
  onClose,
  onDelete,
  isAdmin = true,
}: {
  entry: KanjiEntry | null
  ttsSupported: boolean
  onSpeak: (text: string) => void
  onClose: () => void
  onDelete: (id: string) => void
  isAdmin?: boolean
}) {
  const [activeTab, setActiveTab] = useState<'vocab' | 'stroke'>('vocab')

  useEffect(() => {
    if (entry) {
      document.body.style.overflow = 'hidden'
      setActiveTab('vocab')
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [entry])

  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          {/* Dialog */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-5 border-b border-orange-100 shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="text-6xl font-normal text-gray-900">{entry.character}</div>
                  <div>
                    <div className="text-xl font-semibold text-orange-600">{entry.sinoVietnamese}</div>
                    <div className="flex flex-wrap gap-3 mt-1.5">
                      {entry.onyomi && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-400">Âm ON:</span>
                          <span className="text-sm font-medium text-gray-700">{entry.onyomi}</span>
                          {ttsSupported && (
                            <button onClick={() => onSpeak(entry.onyomi)} className="p-0.5 text-gray-400 hover:text-blue-600">
                              <Volume2 size={14} />
                            </button>
                          )}
                        </div>
                      )}
                      {entry.kunyomi && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-400">Âm KUN:</span>
                          <span className="text-sm font-medium text-gray-700">{entry.kunyomi}</span>
                          {ttsSupported && (
                            <button onClick={() => onSpeak(entry.kunyomi)} className="p-0.5 text-gray-400 hover:text-blue-600">
                              <Volume2 size={14} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {isAdmin && (
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 shrink-0">
              <button
                onClick={() => setActiveTab('vocab')}
                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === 'vocab'
                    ? 'text-orange-600 border-b-2 border-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BookOpen size={14} className="inline mr-1.5 -mt-0.5" />
                Từ vựng ({entry.vocabs.length})
              </button>
              <button
                onClick={() => setActiveTab('stroke')}
                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === 'stroke'
                    ? 'text-orange-600 border-b-2 border-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <PenTool size={14} className="inline mr-1.5 -mt-0.5" />
                Cách viết
              </button>
            </div>

            {/* Tab Content - scrollable */}
            <div className="overflow-y-auto flex-1">
              {activeTab === 'vocab' && entry.vocabs.length > 0 && (
                <div className="px-6 py-4">
                  <div className="space-y-1">
                    {entry.vocabs.map((vocab, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-lg font-normal text-gray-900 min-w-[80px]"><KanjiText text={vocab.word} /></span>
                        {vocab.reading && (
                          <span className="text-sm text-blue-600 min-w-[80px]">{vocab.reading}</span>
                        )}
                        <span className="text-sm text-gray-500 flex-1">{vocab.meaning}</span>
                        {ttsSupported && (
                          <button
                            onClick={() => onSpeak(vocab.reading || vocab.word)}
                            className="p-1 text-gray-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Volume2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'stroke' && (
                <div className="px-6 py-6">
                  <KanjiStrokeOrder character={entry.character} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
