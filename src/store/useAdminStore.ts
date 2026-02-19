import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const ADMIN_CODE = '1207'

interface AdminState {
  isAdmin: boolean
  gistToken: string | null
  login: (code: string) => boolean
  logout: () => void
  setGistToken: (token: string) => void
  clearGistToken: () => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAdmin: false,
      gistToken: null,

      login: (code: string) => {
        if (code === ADMIN_CODE) {
          set({ isAdmin: true })
          return true
        }
        return false
      },
      logout: () => set({ isAdmin: false }),

      setGistToken: (token: string) => set({ gistToken: token }),
      clearGistToken: () => set({ gistToken: null }),
    }),
    { name: 'admin-store' },
  ),
)
