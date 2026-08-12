import Link from 'next/link'

import { ServicesGrid } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { resolveServiceImage, safeGetServices } from '@/lib/content'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

export async function generateMetadata() {
  return buildMetadata({
    path: '/services',
    title: 'Услуги',
    description:
      'Направления стоматологии: терапия, имплантация, ортодонтия, гигиена и эстетика.',
  })
}

export default async function ServicesPage() {
  const { items, isDemo } = await safeGetServices(50)

  return (
    <>
      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-10 sm:pb-12">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги' },
            ]}
          />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Услуги"
              title="Направления лечения"
              description="Выберите услугу, чтобы узнать этапы, ориентир по цене и записаться на консультацию."
              as="h1"
            />
            <div className="flex items-center gap-3">
              {isDemo ? <DemoBadge /> : null}
              <Link
                href="/#appointment"
                className={cn(buttonVariants({ size: 'lg' }), 'shrink-0')}
              >
                Записаться
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServicesGrid
        services={items.map((service) => ({
          id: String(service.id),
          title: String(service.title || 'Услуга'),
          slug: String(service.slug || service.id),
          shortDescription:
            typeof service.shortDescription === 'string'
              ? service.shortDescription
              : null,
          priceFrom:
            typeof service.priceFrom === 'number' ? service.priceFrom : null,
          image: resolveServiceImage(service),
          isDemo: Boolean(service.isDemo) || isDemo,
        }))}
        eyebrow=""
        title="Все услуги клиники"
        description="Прозрачные описания и спокойный путь от диагностики до результата."
        className="!pt-10"
      />
    </>
  )
}
