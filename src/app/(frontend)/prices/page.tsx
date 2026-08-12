import Link from 'next/link'

import { PricesTable } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { safeGetPrices } from '@/lib/content'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

export async function generateMetadata() {
  return buildMetadata({
    path: '/prices',
    title: 'Цены',
    description:
      'Ориентиры по стоимости услуг. Точная цена определяется после консультации и диагностики.',
  })
}

export default async function PricesPage() {
  const { items, isDemo } = await safeGetPrices()

  return (
    <>
      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-10 sm:pb-12">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Цены' },
            ]}
          />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Прайс"
              title="Цены на услуги"
              description="Ниже — ориентиры «от». Итоговая стоимость фиксируется после осмотра, диагностики и согласования плана."
              as="h1"
            />
            <div className="flex items-center gap-3">
              {isDemo ? <DemoBadge /> : null}
              <Link
                href="/#appointment"
                className={cn(buttonVariants({ size: 'lg' }), 'shrink-0')}
              >
                Уточнить стоимость
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container className="space-y-8">
          <PricesTable
            items={items.map((item) => ({
              id: String(item.id),
              title: String(item.title || 'Позиция'),
              categorySlug: String(item.categorySlug || 'other'),
              categoryTitle: String(item.categoryTitle || 'Без категории'),
              priceFrom:
                typeof item.priceFrom === 'number' ? item.priceFrom : null,
              unit: typeof item.unit === 'string' ? item.unit : '₽',
              isDemo: Boolean(item.isDemo) || isDemo,
            }))}
          />

          <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-5 py-5 text-caption">
            <p>
              Точная стоимость зависит от клинической ситуации, объёма работ и
              выбранных материалов. Актуальный расчёт вы получите после
              консультации и диагностики.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
