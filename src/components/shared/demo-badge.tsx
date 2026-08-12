import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface DemoBadgeProps {
  className?: string
  label?: string
}

export function DemoBadge({
  className,
  label = 'Демо-данные',
}: DemoBadgeProps) {
  return (
    <Badge variant="soft" className={cn('text-[0.65rem]', className)}>
      {label}
    </Badge>
  )
}
