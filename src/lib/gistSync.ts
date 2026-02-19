import type { Folder, Lesson, KanjiLesson } from '../types'
import { useAdminStore } from '../store/useAdminStore'

const API_BASE = 'https://api.github.com'
const GIST_FILENAME = 'kanji-app-data.json'

// Gist ID là public, hardcode được
const GIST_ID = '' // Paste gist ID vào đây sau khi tạo xong

export function getGistConfig() {
  const token = useAdminStore.getState().gistToken || ''
  return { token, gistId: GIST_ID }
}

/** Gist đã được cấu hình (có ID) → có thể đọc */
export function isGistConfigured(): boolean {
  return !!GIST_ID
}

/** Admin đã nhập token → có thể ghi */
export function canWriteGist(): boolean {
  const token = useAdminStore.getState().gistToken
  return !!(token && GIST_ID)
}

export interface GistSyncData {
  folders: Folder[]
  lessons: Lesson[]
  kanjiLessons: KanjiLesson[]
  _lastModified: number
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  }
}

/** Create a new public Gist with app data, returns gist ID */
export async function createGist(token: string, data: GistSyncData): Promise<string> {
  const res = await fetch(`${API_BASE}/gists`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      description: 'Học Đi - Kanji App Data (auto-sync)',
      public: true,
      files: {
        [GIST_FILENAME]: {
          content: JSON.stringify(data, null, 2),
        },
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Không thể tạo Gist (${res.status})`)
  }

  const gist = await res.json()
  return gist.id
}

/** Fetch data from a public Gist — KHÔNG cần token */
export async function fetchGist(gistId: string): Promise<GistSyncData | null> {
  try {
    const res = await fetch(`${API_BASE}/gists/${gistId}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })

    if (res.status === 404) {
      throw new Error('Gist không tồn tại. Có thể đã bị xóa.')
    }
    if (!res.ok) {
      throw new Error(`Lỗi khi đọc Gist (${res.status})`)
    }

    const gist = await res.json()
    const file = gist.files?.[GIST_FILENAME]

    if (!file || !file.content) return null

    const parsed = JSON.parse(file.content)

    if (!Array.isArray(parsed.folders) || !Array.isArray(parsed.lessons)) {
      return null
    }

    return {
      folders: parsed.folders || [],
      lessons: parsed.lessons || [],
      kanjiLessons: parsed.kanjiLessons || [],
      _lastModified: parsed._lastModified || 0,
    }
  } catch (err) {
    if (err instanceof SyntaxError) return null
    throw err
  }
}

/** Update an existing Gist with new data — CẦN token */
export async function updateGist(token: string, gistId: string, data: GistSyncData): Promise<boolean> {
  const res = await fetch(`${API_BASE}/gists/${gistId}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify({
      files: {
        [GIST_FILENAME]: {
          content: JSON.stringify(data, null, 2),
        },
      },
    }),
  })

  if (res.status === 401) {
    throw new Error('Token không hợp lệ hoặc đã hết hạn.')
  }
  if (res.status === 404) {
    throw new Error('Gist không tồn tại. Có thể đã bị xóa.')
  }

  return res.ok
}
