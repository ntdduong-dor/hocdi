import type { Folder, Lesson, KanjiLesson } from '../types'

const API_BASE = 'https://api.github.com'
const GIST_FILENAME = 'kanji-app-data.json'

export interface GistSyncData {
  folders: Folder[]
  lessons: Lesson[]
  kanjiLessons: KanjiLesson[]
  _lastModified: number
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  }
}

/** Validate GitHub PAT — returns username if valid, null if invalid */
export async function validateToken(token: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/user`, { headers: headers(token) })
    if (!res.ok) return null
    const data = await res.json()
    return data.login || null
  } catch {
    return null
  }
}

/** Create a new private Gist with app data, returns gist ID */
export async function createGist(token: string, data: GistSyncData): Promise<string> {
  const res = await fetch(`${API_BASE}/gists`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({
      description: 'Học Đi - Kanji App Data (auto-sync)',
      public: false,
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

/** Fetch data from an existing Gist, returns null if not found or invalid */
export async function fetchGist(token: string, gistId: string): Promise<GistSyncData | null> {
  try {
    const res = await fetch(`${API_BASE}/gists/${gistId}`, { headers: headers(token) })

    if (res.status === 404) {
      throw new Error('Gist không tồn tại. Có thể đã bị xóa.')
    }
    if (res.status === 401) {
      throw new Error('Token không hợp lệ hoặc đã hết hạn.')
    }
    if (!res.ok) {
      throw new Error(`Lỗi khi đọc Gist (${res.status})`)
    }

    const gist = await res.json()
    const file = gist.files?.[GIST_FILENAME]

    if (!file || !file.content) return null

    const parsed = JSON.parse(file.content)

    // Validate basic shape
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

/** Update an existing Gist with new data, returns true on success */
export async function updateGist(token: string, gistId: string, data: GistSyncData): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/gists/${gistId}`, {
      method: 'PATCH',
      headers: headers(token),
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
  } catch (err) {
    throw err
  }
}

/** Extract gist ID from a full URL or raw ID string */
export function parseGistId(input: string): string {
  const trimmed = input.trim()
  // Full URL: https://gist.github.com/user/abc123...
  const urlMatch = trimmed.match(/gist\.github\.com\/[^/]+\/([a-f0-9]+)/i)
  if (urlMatch) return urlMatch[1]
  // Raw ID (hex string)
  if (/^[a-f0-9]+$/i.test(trimmed)) return trimmed
  return trimmed
}
