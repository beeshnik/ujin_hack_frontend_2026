import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'

interface SectionCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
  contentClassName?: string
}

export function SectionCard({
  title,
  description,
  children,
  actions,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card className={className}>
      {(title || description || actions) && (
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  )
}
