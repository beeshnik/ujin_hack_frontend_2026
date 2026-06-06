import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session, Permission, UserRole } from './types'
import { ROLE_PERMISSIONS } from './permissions'

interface SessionState {
  session: Session | null
  isAuthenticated: boolean
  setSession: (session: Session) => void
  clearSession: () => void
  hasPermission: (permission: Permission) => boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      session: null,
      isAuthenticated: false,

      setSession: (session) => set({ session, isAuthenticated: true }),

      clearSession: () => set({ session: null, isAuthenticated: false }),

      hasPermission: (permission) => {
        const { session } = get()
        if (!session) return false
        return session.permissions.includes(permission)
      },

      hasRole: (role) => {
        const { session } = get()
        if (!session) return false
        if (Array.isArray(role)) return role.includes(session.user.role)
        return session.user.role === role
      },
    }),
    {
      name: 'session-storage',
      partialize: (state) => ({ session: state.session, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        if (state?.session) {
          const role = state.session.user.role
          state.session.permissions = ROLE_PERMISSIONS[role]
        }
      },
    },
  ),
)
