import { Button } from '@/shared/ui/button'
import type { ChartPeriod } from '@/entities/analytics/model/types'

const PERIODS: { value: ChartPeriod; label: string }[] = [
  { value: '7d', label: '7 дней' },
  { value: '30d', label: '30 дней' },
  { value: '90d', label: '90 дней' },
]

interface PeriodToggleProps {
  value: ChartPeriod
  onChange: (period: ChartPeriod) => void
}

export function PeriodToggle({ value, onChange }: PeriodToggleProps) {
  return (
    <div className="flex gap-1">
      {PERIODS.map((p) => (
        <Button
          key={p.value}
          variant={value === p.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(p.value)}
        >
          {p.label}
        </Button>
      ))}
    </div>
  )
}
