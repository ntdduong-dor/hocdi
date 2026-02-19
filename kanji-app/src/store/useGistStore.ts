import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error'

interface GistState {
  // Persisted config
  token: string | null
  gistId: string | null

  // Runtime state (not persisted)
  syncStatus: SyncStatus
  lastSyncedAt: number | null
  syncError: string | null

  // Actions
  setConfig: (token: string, gistId: string) => void
  clearConfig: () => void
  setSyncStatus: (status: SyncStatus, error?: string) => void
  setLastSyncedAt: (timestamp: number) => void
}

export const useGistStore = create<GistState>()(
  persist(
    (set) => ({
      token: null,
      gistId: null,
      syncStatus: 'idle' as SyncStatus,
      lastSyncedAt: null,
      syncError: null,

      setConfig: (token, gistId) =>
        set({ token, gistId, syncStatus: 'idle', syncError: null }),

      clearConfig: () =>
        set({ token: null, gistId: null, syncStatus: 'idle', lastSyncedAt: null, syncError: null }),

      setSyncStatus: (status, error) =>
        set({ syncStatus: status, syncError: error || null }),

      setLastSyncedAt: (timestamp) =>
        set({ lastSyncedAt: timestamp }),
    }),
    {
      name: 'kanji-app-gist-config',
      partialize: (state) => ({
        token: state.token,
        gistId: state.gistId,
      }),
    },
  ),
)
