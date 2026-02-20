import { useEffect, useRef, useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppStore } from '../store/useAppStore'
import { useAdminStore } from '../store/useAdminStore'
import { isGistConfigured, getGistConfig, fetchGist, updateGist, resetETagCache } from '../lib/gistSync'
import { n3KanjiEntries } from '../data/kanji/n3-kanji'
import type { GistSyncData } from '../lib/gistSync'
import type { KanjiEntry } from '../types'

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error'

export function useGistSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle')
  const [syncError, setSyncError] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)

  // Admin push: local thay đổi chưa push
  const [hasUnsyncedChanges, setHasUnsyncedChanges] = useState(false)
  const [changeCount, setChangeCount] = useState(0)

  const gistToken = useAdminStore((s) => s.gistToken)
  const isAdmin = useAdminStore((s) => s.isAdmin)

  const isSyncing = useRef(false)
  const isPulling = useRef(false)
  const configured = isGistConfigured()
  const writable = !!(gistToken && configured)

  // ---- PULL: tải data từ Gist về local ----
  const pullFromGist = useCallback(async () => {
    if (isPulling.current || !configured) return
    isPulling.current = true
    setSyncStatus('syncing')
    setSyncError(null)

    try {
      const { gistId } = getGistConfig()
      const remoteData = await fetchGist(gistId)

      if (!remoteData) {
        setSyncStatus('idle')
        return
      }

      // Xóa hết data cũ rồi ghi data mới từ remote
      useAppStore.setState({
        folders: [],
        lessons: [],
        kanjiLessons: [],
        _lastModified: 0,
      })

      // Ghi data mới từ Gist
      useAppStore.setState({
        folders: remoteData.folders,
        lessons: remoteData.lessons,
        kanjiLessons: remoteData.kanjiLessons,
        _lastModified: remoteData._lastModified,
      })

      // Seed N3 kanji nếu chưa có trong data remote
      const hasN3 = remoteData.kanjiLessons.some(
        (l) => l.name.includes('N3') && l.entries.length >= 100
      )
      if (!hasN3) {
        const entries: KanjiEntry[] = n3KanjiEntries.map((e) => ({
          ...e,
          id: uuidv4(),
        }))
        useAppStore.getState().addKanjiLesson(
          'Tổng hợp Hán tự N3',
          null,
          entries,
          '200 Hán tự N3 cơ bản với từ vựng và cách đọc'
        )
      }

      setSyncStatus('synced')
      setLastSyncedAt(Date.now())
    } catch (err) {
      setSyncStatus('error')
      setSyncError(err instanceof Error ? err.message : 'Lỗi đồng bộ')
    } finally {
      isPulling.current = false
    }
  }, [configured])

  // ---- PUSH: đẩy data local lên Gist (admin only) ----
  const pushToGist = useCallback(async () => {
    if (isSyncing.current || !writable) return
    isSyncing.current = true
    setSyncStatus('syncing')
    setSyncError(null)

    try {
      const { token, gistId } = getGistConfig()
      const state = useAppStore.getState()
      const now = Date.now()
      const data: GistSyncData = {
        folders: state.folders,
        lessons: state.lessons,
        kanjiLessons: state.kanjiLessons,
        _lastModified: now,
      }

      useAppStore.setState({ _lastModified: now })

      const success = await updateGist(token, gistId, data)
      if (success) {
        resetETagCache()
        setSyncStatus('synced')
        setLastSyncedAt(Date.now())
        setHasUnsyncedChanges(false)
        setChangeCount(0)
      } else {
        setSyncStatus('error')
        setSyncError('Không thể cập nhật Gist')
      }
    } catch (err) {
      setSyncStatus('error')
      setSyncError(err instanceof Error ? err.message : 'Lỗi đồng bộ')
    } finally {
      isSyncing.current = false
    }
  }, [writable])

  // Auto pull on mount
  useEffect(() => {
    if (!configured) return
    pullFromGist()
  }, [configured]) // eslint-disable-line react-hooks/exhaustive-deps

  // Theo dõi thay đổi store → đánh dấu dirty (cho admin push)
  useEffect(() => {
    if (!configured) return

    const unsub = useAppStore.subscribe((state, prevState) => {
      if (
        state.folders === prevState.folders &&
        state.lessons === prevState.lessons &&
        state.kanjiLessons === prevState.kanjiLessons
      ) {
        return
      }

      if (isPulling.current) return

      setHasUnsyncedChanges(true)
      setChangeCount((c) => c + 1)
    })

    return () => unsub()
  }, [configured])

  return {
    pushToGist,
    pullFromGist,
    syncStatus,
    syncError,
    lastSyncedAt,
    configured,
    writable,
    isAdmin,
    hasUnsyncedChanges,
    changeCount,
  }
}
