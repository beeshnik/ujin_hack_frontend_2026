import { SectionCard } from '@/shared/ui/section-card'
import { Skeleton } from '@/shared/ui/skeleton'
import { EmptyState } from '@/shared/ui/states/empty-state'

interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  isLoading?: boolean
  isEmpty?: boolean
}

export function ChartCard({
  title,
  description,
  children,
  actions,
  isLoading,
  isEmpty,
}: ChartCardProps) {
  return (
    <SectionCard title={title} description={description} actions={actions}>
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-[200px] w-full" />
        </div>
      ) : isEmpty ? (
        <EmptyState title="Нет данных" description="Данные для графика отсутствуют" />
      ) : (
        children
      )}
    </SectionCard>
  )
}
