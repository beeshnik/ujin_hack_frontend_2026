import { ShieldX } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface AccessDeniedStateProps {
  className?: string
}

export function AccessDeniedState({ className }: AccessDeniedStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12 text-center', className)}>
      <ShieldX className="h-12 w-12 text-muted-foreground" />
      <div className="space-y-1">
        <p className="text-sm font-medium">Доступ запрещён</p>
        <p className="text-sm text-muted-foreground">
          У вас нет прав для просмотра этого раздела.
        </p>
      </div>
    </div>
  )
}
