import { useState, useRef, useEffect, createContext, useContext, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Volume2 } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { n3KanjiEntries } from '../../data/kanji/n3-kanji'
import { speak as ttsSpeak, isTTSSupported } from '../../lib/tts'
import type { KanjiEntry } from '../../types'

// ===== Kanji lookup map =====

interface KanjiInfo {
  character: string
  sinoVietnamese: string
  onyomi: string
  kunyomi: string
  vocabs: { word: string; reading: string; meaning: string }[]
}

type KanjiMap = Map<string, KanjiInfo>

const KanjiMapContext = createContext<KanjiMap>(new Map())

/**
 * Provider that builds a lookup map from all kanji data.
 * Place near app root (e.g. inside Layout).
 */
export function KanjiLookupProvider({ children }: { children: React.ReactNode }) {
  const kanjiLessons = useAppStore((s) => s.kanjiLessons)

  const map = useMemo(() => {
    const m: KanjiMap = new Map()

    // Seed from n3-kanji static data
    for (const entry of n3KanjiEntries) {
      m.set(entry.character, {
        character: entry.character,
        sinoVietnamese: entry.sinoVietnamese,
        onyomi: entry.onyomi,
        kunyomi: entry.kunyomi,
        vocabs: entry.vocabs,
      })
    }

    // Override/extend with user's kanji lessons
    for (const lesson of kanjiLessons) {
      for (const entry of lesson.entries) {
        m.set(entry.character, {
          character: entry.character,
          sinoVietnamese: entry.sinoVietnamese,
          onyomi: entry.onyomi,
          kunyomi: entry.kunyomi,
          vocabs: entry.vocabs,
        })
      }
    }

    return m
  }, [kanjiLessons])

  return (
    <KanjiMapContext.Provider value={map}>
      {children}
    </KanjiMapContext.Provider>
  )
}

export function useKanjiMap() {
  return useContext(KanjiMapContext)
}

// ===== Tooltip popup =====

function KanjiPopup({
  info,
  anchorRect,
  onClose,
}: {
  info: KanjiInfo
  anchorRect: DOMRect
  onClose: () => void
}) {
  const popupRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const update = () => {
      if (!popupRef.current) return
      const popup = popupRef.current.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight

      let top = anchorRect.bottom + 6
      let left = anchorRect.left + anchorRect.width / 2 - popup.width / 2

      // Clamp horizontal
      if (left < 8) left = 8
      if (left + popup.width > vw - 8) left = vw - 8 - popup.width

      // If below viewport, show above
      if (top + popup.height > vh - 8) {
        top = anchorRect.top - popup.height - 6
      }

      setPos({ top, left })
    }

    // Run after render
    requestAnimationFrame(update)
  }, [anchorRect])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [onClose])

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (isTTSSupported()) ttsSpeak(text)
  }

  return createPortal(
    <div
      ref={popupRef}
      className="fixed z-[9999] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      style={{ top: pos.top, left: pos.left, maxWidth: 320, minWidth: 200 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 border-b border-orange-100">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{info.character}</span>
          <div className="flex-1 min-w-0">
            <div className="text-base font-semibold text-orange-600">{info.sinoVietnamese}</div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
              {info.onyomi && (
                <span className="text-xs text-gray-500">
                  ON: <span className="font-medium text-gray-700">{info.onyomi}</span>
                </span>
              )}
              {info.kunyomi && (
                <span className="text-xs text-gray-500">
                  KUN: <span className="font-medium text-gray-700">{info.kunyomi}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vocabs */}
      {info.vocabs.length > 0 && (
        <div className="px-3 py-2 max-h-48 overflow-y-auto">
          {info.vocabs.slice(0, 5).map((v, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-1.5 text-xs group border-b border-gray-50 last:border-0"
            >
              <span className="font-medium text-gray-900 min-w-[50px]">{v.word}</span>
              <span className="text-blue-600 min-w-[50px]">{v.reading}</span>
              <span className="text-gray-500 flex-1">{v.meaning}</span>
              <button
                onClick={(e) => handleSpeak(v.reading || v.word, e)}
                className="p-0.5 text-gray-300 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              >
                <Volume2 size={12} />
              </button>
            </div>
          ))}
          {info.vocabs.length > 5 && (
            <div className="text-[10px] text-gray-400 text-center py-1">
              +{info.vocabs.length - 5} từ vựng khác
            </div>
          )}
        </div>
      )}
    </div>,
    document.body
  )
}

// ===== Single kanji character with tooltip =====

function KanjiChar({ char, info }: { char: string; info: KanjiInfo }) {
  const [showPopup, setShowPopup] = useState(false)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const spanRef = useRef<HTMLSpanElement>(null)

  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    if (spanRef.current) {
      setRect(spanRef.current.getBoundingClientRect())
      setShowPopup(true)
    }
  }, [])

  const handleClose = useCallback(() => {
    setShowPopup(false)
  }, [])

  return (
    <>
      <span
        ref={spanRef}
        onClick={handleClick}
        className="cursor-pointer border-b border-dotted border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-500 transition-colors rounded-sm"
      >
        {char}
      </span>
      {showPopup && rect && (
        <KanjiPopup info={info} anchorRect={rect} onClose={handleClose} />
      )}
    </>
  )
}

// ===== CJK character regex =====

const CJK_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF]/

function isKanji(char: string): boolean {
  return CJK_REGEX.test(char)
}

// ===== KanjiText: renders text with interactive kanji tooltips =====

interface KanjiTextProps {
  text: string
  className?: string
}

/**
 * Renders text with interactive kanji characters.
 * Any CJK character that exists in the kanji map becomes clickable
 * and shows a popup with reading/meaning info.
 *
 * Usage: <KanjiText text="日本語を勉強します" />
 */
export function KanjiText({ text, className }: KanjiTextProps) {
  const kanjiMap = useKanjiMap()

  const parts = useMemo(() => {
    const result: { text: string; info?: KanjiInfo }[] = []
    let buffer = ''

    for (const char of text) {
      const info = isKanji(char) ? kanjiMap.get(char) : undefined
      if (info) {
        if (buffer) {
          result.push({ text: buffer })
          buffer = ''
        }
        result.push({ text: char, info })
      } else {
        buffer += char
      }
    }
    if (buffer) result.push({ text: buffer })

    return result
  }, [text, kanjiMap])

  // If no kanji found in map, render plain text
  const hasKanji = parts.some((p) => p.info)
  if (!hasKanji) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.info ? (
          <KanjiChar key={i} char={part.text} info={part.info} />
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </span>
  )
}
