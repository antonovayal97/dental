import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Хлебные крошки" className={cn('w-full', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-border"
                />
              ) : null}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(isLast && 'font-medium text-foreground')}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
