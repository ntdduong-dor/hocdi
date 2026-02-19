import { useEffect, useRef, useCallback, useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { isGistConfigured, canWriteGist, getGistConfig, fetchGist, updateGist } from '../lib/gistSync'
import type { GistSyncData } from '../lib/gistSync'

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error'

export function useGistSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle')
  const [syncError, setSyncError] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)
  const [hasUnsyncedChanges, setHasUnsyncedChanges] = useState(false)
  const [changeCount, setChangeCount] = useState(0)

  const isSyncing = useRef(false)
  const isPulling = useRef(false)
  const configured = isGistConfigured()
  const writable = canWriteGist()

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

  // Pull từ public Gist on mount (1 lần duy nhất, KHÔNG cần token)
  useEffect(() => {
    if (!configured) return

    const pullFromGist = async () => {
      if (isPulling.current) return
      isPulling.current = true
      setSyncStatus('syncing')
      setSyncError(null)

      try {
        const { gistId } = getGistConfig()
        const remoteData = await fetchGist(gistId)

        if (!remoteData) {
          isPulling.current = false
          if (writable) await pushToGist()
          else setSyncStatus('idle')
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
        } else if (localLastModified > remoteLastModified && writable) {
          isPulling.current = false
          await pushToGist()
          return
        }

        setSyncStatus('synced')
        setLastSyncedAt(Date.now())
      } catch (err) {
        setSyncStatus('error')
        setSyncError(err instanceof Error ? err.message : 'Lỗi đồng bộ')
      } finally {
        isPulling.current = false
      }
    }

    pullFromGist()
  }, [configured]) // eslint-disable-line react-hooks/exhaustive-deps

  // Theo dõi thay đổi store → đánh dấu dirty (không auto push)
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
    syncStatus,
    syncError,
    lastSyncedAt,
    configured,
    hasUnsyncedChanges,
    changeCount,
  }
}
