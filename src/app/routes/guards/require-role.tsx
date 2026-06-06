import { Navigate } from 'react-router-dom'
import { useSessionStore } from '@/entities/session/model/session-store'
import type { UserRole } from '@/entities/session/model/types'
import { ROUTES } from '@/shared/config/route-paths'

interface RequireRoleProps {
  role: UserRole | UserRole[]
  children: React.ReactNode
}

export function RequireRole({ role, children }: RequireRoleProps) {
  const hasRole = useSessionStore((s) => s.hasRole)

  if (!hasRole(role)) {
    return <Navigate to={ROUTES.ACCESS_DENIED} replace />
  }

  return <>{children}</>
}
