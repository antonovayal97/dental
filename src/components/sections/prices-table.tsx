'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import { DemoBadge } from '@/components/shared/demo-badge'
import { buttonVariants } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { cn, formatPrice } from '@/lib/utils'

export type PriceTableItem = {
  id: string
  title: string
  categorySlug: string
  categoryTitle: string
  priceFrom?: number | null
  unit?: string | null
  isDemo?: boolean
}

export type PricesTableProps = {
  items: PriceTableItem[]
  className?: string
}

export function PricesTable({ items, className }: PricesTableProps) {
  const categories = useMemo(() => {
    const map = new Map<string, string>()
    for (const item of items) {
      if (!map.has(item.categorySlug)) {
        map.set(item.categorySlug, item.categoryTitle)
      }
    }
    return Array.from(map.entries()).map(([slug, title]) => ({ slug, title }))
  }, [items])

  const [active, setActive] = useState<string>('all')

  const filtered = useMemo(() => {
    if (active === 'all') return items
    return items.filter((item) => item.categorySlug === active)
  }, [active, items])

  const showDemo = items.some((item) => item.isDemo)

  if (items.length === 0) {
    return (
      <EmptyState
        title="Прайс пока не заполнен"
        description="Оставьте заявку — администратор сориентирует по стоимости после консультации."
        cta={
          <Link href="/#appointment" className={cn(buttonVariants())}>
            Записаться на консультацию
          </Link>
        }
      />
    )
  }

  return (
    <div className={cn('space-y-8', className)}>
      <div className="flex flex-wrap items-center gap-2">
        {showDemo ? <DemoBadge className="mr-1" /> : null}
        <FilterChip
          label="Все"
          active={active === 'all'}
          onClick={() => setActive('all')}
        />
        {categories.map((category) => (
          <FilterChip
            key={category.slug}
            label={category.title}
            active={active === category.slug}
            onClick={() => setActive(category.slug)}
          />
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card">
        <div className="hidden grid-cols-[1.2fr_1.6fr_0.8fr_auto] gap-4 border-b border-border/80 bg-muted/50 px-5 py-3 text-caption font-medium text-foreground md:grid">
          <span>Категория</span>
          <span>Услуга</span>
          <span>Цена</span>
          <span className="sr-only">Действие</span>
        </div>

        <ul className="divide-y divide-border/70">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="grid gap-3 px-5 py-4 transition-colors hover:bg-muted/40 md:grid-cols-[1.2fr_1.6fr_0.8fr_auto] md:items-center md:gap-4"
            >
              <p className="text-caption md:text-sm md:text-muted-foreground">
                <span className="md:hidden">Категория: </span>
                {item.categoryTitle}
              </p>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm font-semibold tracking-tight text-foreground">
                {formatPrice(item.priceFrom, item.unit || '₽')}
              </p>
              <Link
                href="/#appointment"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'justify-self-start md:justify-self-end',
                )}
              >
                Записаться
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="В этой категории пока нет позиций"
          description="Выберите другую категорию или запишитесь на консультацию."
        />
      ) : null}
    </div>
  )
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors',
        active
          ? 'border-accent bg-accent text-accent-foreground'
          : 'border-border bg-card text-foreground hover:bg-muted',
      )}
    >
      {label}
    </button>
  )
}
