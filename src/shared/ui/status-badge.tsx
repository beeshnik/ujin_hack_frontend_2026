import { Badge } from './badge'
import { cn } from '@/shared/lib/cn'

type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral'

const STATUS_CLASSES: Record<StatusVariant, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400',
  warning: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400',
  error: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400',
  info: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400',
  neutral: 'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400',
}

interface StatusBadgeProps {
  label: string
  variant: StatusVariant
  className?: string
}

export function StatusBadge({ label, variant, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(STATUS_CLASSES[variant], className)}
    >
      {label}
    </Badge>
  )
}
