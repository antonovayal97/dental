import * as React from 'react'

import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  title: string
  description?: string
  /** Кнопка или ссылка призыва к действию */
  cta?: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  cta,
  className,
  icon,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-14 text-center',
        className,
      )}
      role="status"
    >
      {icon ? (
        <div className="mb-4 text-muted-foreground" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <h3 className="text-subheading">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-body">{description}</p>
      ) : null}
      {cta ? <div className="mt-6">{cta}</div> : null}
    </div>
  )
}
