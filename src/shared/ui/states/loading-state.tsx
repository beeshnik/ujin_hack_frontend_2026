import { Loader2 } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface LoadingStateProps {
  title?: string
  className?: string
}

export function LoadingState({ title = 'Загрузка...', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12', className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  )
}
