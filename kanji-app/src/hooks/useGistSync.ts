import { useEffect, useRef, useCallback } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useGistStore } from '../store/useGistStore'
import { fetchGist, updateGist } from '../lib/gistSync'
import type { GistSyncData } from '../lib/gistSync'

const DEBOUNCE_MS = 2000

export function useGistSync() {
  const { token, gistId, setSyncStatus, setLastSyncedAt } = useGistStore()
  const isConfigured = !!(token && gistId)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isSyncing = useRef(false)
  const isPulling = useRef(false)

  const pushToGist = useCallback(async () => {
    if (isSyncing.current || !token || !gistId) return
    isSyncing.current = true
    setSyncStatus('syncing')

    try {
      const state = useAppStore.getState()
      const now = Date.now()
      const data: GistSyncData = {
        folders: state.folders,
        lessons: state.lessons,
        kanjiLessons: state.kanjiLessons,
        _lastModified: now,
      }

      // Update local _lastModified
      useAppStore.setState({ _lastModified: now })

      const success = await updateGist(token, gistId, data)
      if (success) {
        setSyncStatus('synced')
        setLastSyncedAt(Date.now())
      } else {
        setSyncStatus('error', 'Không thể cập nhật Gist')
      }
    } catch (err) {
      setSyncStatus('error', err instanceof Error ? err.message : 'Lỗi đồng bộ')
    } finally {
      isSyncing.current = false
    }
  }, [token, gistId, setSyncStatus, setLastSyncedAt])

  // Pull from Gist on mount
  useEffect(() => {
    if (!isConfigured || !token || !gistId) return

    const pullFromGist = async () => {
      if (isPulling.current) return
      isPulling.current = true
      setSyncStatus('syncing')

      try {
        const remoteData = await fetchGist(token, gistId)
        if (!remoteData) {
          // Gist exists but no valid data — push local data
          await pushToGist()
          setSyncStatus('synced')
          setLastSyncedAt(Date.now())
          return
        }

        const localLastModified = useAppStore.getState()._lastModified || 0
        const remoteLastModified = remoteData._lastModified || 0

        if (remoteLastModified > localLastModified) {
          // Remote wins — replace local data
          useAppStore.setState({
            folders: remoteData.folders,
            lessons: remoteData.lessons,
            kanjiLessons: remoteData.kanjiLessons,
            _lastModified: remoteData._lastModified,
          })
        } else if (localLastModified > remoteLastModified) {
          // Local wins — push to remote
          await pushToGist()
        }

        setSyncStatus('synced')
        setLastSyncedAt(Date.now())
      } catch (err) {
        setSyncStatus('error', err instanceof Error ? err.message : 'Lỗi đồng bộ')
      } finally {
        isPulling.current = false
      }
    }

    pullFromGist()
  }, [isConfigured, token, gistId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Subscribe to store changes for debounced push
  useEffect(() => {
    if (!isConfigured || !token || !gistId) return

    const unsub = useAppStore.subscribe((state, prevState) => {
      // Only sync if domain data actually changed
      if (
        state.folders === prevState.folders &&
        state.lessons === prevState.lessons &&
        state.kanjiLessons === prevState.kanjiLessons
      ) {
        return
      }

      // Skip if currently pulling (avoid push loop)
      if (isPulling.current) return

      // Debounce push
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        pushToGist()
      }, DEBOUNCE_MS)
    })

    return () => {
      unsub()
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [isConfigured, token, gistId, pushToGist])

  return { pushToGist, isConfigured }
}
