import { useEffect, useRef, useCallback, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useAdminStore } from '../store/useAdminStore'
import { isGistConfigured, getGistConfig, fetchGist, updateGist } from '../lib/gistSync'
import type { GistSyncData } from '../lib/gistSync'

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error'

const CHECK_INTERVAL = 30_000 // Kiểm tra data mới mỗi 30 giây

export function useGistSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle')
  const [syncError, setSyncError] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)

  // Admin push: local thay đổi chưa push
  const [hasUnsyncedChanges, setHasUnsyncedChanges] = useState(false)
  const [changeCount, setChangeCount] = useState(0)

  // User pull: remote có data mới
  const [hasRemoteUpdate, setHasRemoteUpdate] = useState(false)

  const gistToken = useAdminStore((s) => s.gistToken)

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

      const localLastModified = useAppStore.getState()._lastModified || 0
      const remoteLastModified = remoteData._lastModified || 0

      if (remoteLastModified > localLastModified) {
        useAppStore.setState({
          folders: remoteData.folders,
          lessons: remoteData.lessons,
          kanjiLessons: remoteData.kanjiLessons,
          _lastModified: remoteData._lastModified,
        })
      }

      setSyncStatus('synced')
      setLastSyncedAt(Date.now())
      setHasRemoteUpdate(false)
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

  // ---- CHECK: kiểm tra xem remote có data mới không ----
  const checkForUpdates = useCallback(async () => {
    if (!configured || isPulling.current || isSyncing.current) return

    try {
      const { gistId } = getGistConfig()
      const remoteData = await fetchGist(gistId)
      if (!remoteData) return

      const localLastModified = useAppStore.getState()._lastModified || 0
      const remoteLastModified = remoteData._lastModified || 0

      if (remoteLastModified > localLastModified) {
        setHasRemoteUpdate(true)
      }
    } catch {
      // Lỗi check im lặng, không làm gì
    }
  }, [configured])

  // Auto pull on mount
  useEffect(() => {
    if (!configured) return
    pullFromGist()
  }, [configured]) // eslint-disable-line react-hooks/exhaustive-deps

  // Kiểm tra data mới định kỳ (polling)
  useEffect(() => {
    if (!configured) return

    const interval = setInterval(() => {
      checkForUpdates()
    }, CHECK_INTERVAL)

    return () => clearInterval(interval)
  }, [configured, checkForUpdates])

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
    checkForUpdates,
    syncStatus,
    syncError,
    lastSyncedAt,
    configured,
    writable,
    hasUnsyncedChanges,
    changeCount,
    hasRemoteUpdate,
  }
}
