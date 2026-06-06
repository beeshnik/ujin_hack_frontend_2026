import { useNavigate } from 'react-router-dom'
import { ShieldX } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { ROUTES } from '@/shared/config/route-paths'

export default function AccessDeniedPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <ShieldX className="h-16 w-16 text-muted-foreground" />
      <h1 className="text-2xl font-bold">Доступ запрещён</h1>
      <p className="text-muted-foreground">У вас нет прав для просмотра этой страницы.</p>
      <Button onClick={() => navigate(ROUTES.DASHBOARD)}>На главную</Button>
    </div>
  )
}
