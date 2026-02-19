import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const ADMIN_CODE = '1207'

interface AdminState {
  isAdmin: boolean
  login: (code: string) => boolean
  logout: () => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAdmin: false,
      login: (code: string) => {
        if (code === ADMIN_CODE) {
          set({ isAdmin: true })
          return true
        }
        return false
      },
      logout: () => set({ isAdmin: false }),
    }),
    { name: 'admin-store' },
  ),
)
