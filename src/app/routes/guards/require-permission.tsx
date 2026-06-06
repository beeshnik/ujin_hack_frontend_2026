import { Navigate } from 'react-router-dom'
import { useSessionStore } from '@/entities/session/model/session-store'
import type { Permission } from '@/entities/session/model/types'
import { ROUTES } from '@/shared/config/route-paths'

interface RequirePermissionProps {
  permission: Permission
  children: React.ReactNode
}

export function RequirePermission({ permission, children }: RequirePermissionProps) {
  const hasPermission = useSessionStore((s) => s.hasPermission)

  if (!hasPermission(permission)) {
    return <Navigate to={ROUTES.ACCESS_DENIED} replace />
  }

  return <>{children}</>
}
