import Link from 'next/link'

import { BeforeAfter } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import { resolveCaseImages, safeGetCases } from '@/lib/content'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

export async function generateMetadata() {
  return buildMetadata({
    path: '/cases',
    title: 'Кейсы до и после',
    description:
      'Примеры работ клиники: результаты индивидуальны и зависят от клинической ситуации.',
  })
}

export default async function CasesPage() {
  const { items, isDemo } = await safeGetCases(24)

  return (
    <>
      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-10 sm:pb-12">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Кейсы' },
            ]}
          />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Результаты"
              title="Кейсы до и после"
              description="Ознакомительные примеры работ. Итоговый результат всегда индивидуален."
              as="h1"
            />
            <div className="flex items-center gap-3">
              {isDemo ? <DemoBadge /> : null}
              <Link
                href="/#appointment"
                className={cn(buttonVariants({ size: 'lg' }), 'shrink-0')}
              >
                Консультация
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <BeforeAfter
        cases={items.map((item) => {
          const images = resolveCaseImages(item)
          return {
            id: String(item.id),
            title: String(item.title || 'Кейс'),
            slug: String(item.slug || item.id),
            description:
              typeof item.description === 'string' ? item.description : null,
            duration: typeof item.duration === 'string' ? item.duration : null,
            disclaimer:
              typeof item.disclaimer === 'string' ? item.disclaimer : null,
            beforeImage: images.beforeImage,
            afterImage: images.afterImage,
            isDemo: Boolean(item.isDemo) || isDemo,
          }
        })}
        className="!pt-10"
      />
    </>
  )
}
