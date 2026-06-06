import { WifiOff } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface OfflineStateProps {
  className?: string
  variant?: 'banner' | 'full'
}

export function OfflineState({ className, variant = 'full' }: OfflineStateProps) {
  if (variant === 'banner') {
    return (
      <div className={cn('flex items-center justify-center gap-2 bg-destructive/10 px-4 py-2 text-sm text-destructive', className)}>
        <WifiOff className="h-4 w-4" />
        <span>Нет подключения к интернету</span>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12 text-center', className)}>
      <WifiOff className="h-12 w-12 text-muted-foreground" />
      <div className="space-y-1">
        <p className="text-sm font-medium">Вы офлайн</p>
        <p className="text-sm text-muted-foreground">
          Некоторые данные могут быть недоступны. Проверьте подключение к интернету.
        </p>
      </div>
    </div>
  )
}
