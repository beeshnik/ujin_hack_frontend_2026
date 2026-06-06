import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '@/entities/session/model/session-store'
import { queryClient } from '@/shared/api/query-client'
import { ROUTES } from '@/shared/config/route-paths'

export function useLogout() {
  const clearSession = useSessionStore((s) => s.clearSession)
  const navigate = useNavigate()

  const logout = () => {
    clearSession()
    queryClient.clear()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return { logout }
}
