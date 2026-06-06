import { useNavigate } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { ROUTES } from '@/shared/config/route-paths'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />
      <h1 className="text-2xl font-bold">404 — Страница не найдена</h1>
      <p className="text-muted-foreground">Запрашиваемая страница не существует.</p>
      <Button onClick={() => navigate(ROUTES.DASHBOARD)}>На главную</Button>
    </div>
  )
}
