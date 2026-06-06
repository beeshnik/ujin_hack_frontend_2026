import { AlertTriangle } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface PageErrorProps {
  message?: string
  onRetry?: () => void
}

export function PageError({
  message = 'Не удалось загрузить страницу',
  onRetry,
}: PageErrorProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <p className="text-center text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Повторить загрузку
        </Button>
      )}
    </div>
  )
}
