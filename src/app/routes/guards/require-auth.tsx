import { Navigate, useLocation } from 'react-router-dom'
import { useSessionStore } from '@/entities/session/model/session-store'
import { ROUTES } from '@/shared/config/route-paths'

interface RequireAuthProps {
  children: React.ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
  const isAuthenticated = useSessionStore((s) => s.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <>{children}</>
}
