import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent } from './card'
import { cn } from '@/shared/lib/cn'

interface MetricCardProps {
  title: string
  value: number | string
  change?: number
  unit?: string
  icon?: React.ReactNode
  className?: string
}

export function MetricCard({ title, value, change, unit, icon, className }: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0

  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-2xl font-bold">
            {value}
            {unit && <span className="ml-1 text-base font-normal text-muted-foreground">{unit}</span>}
          </p>
          {change !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
