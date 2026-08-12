import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { DemoBadge } from '@/components/shared/demo-badge'
import {
  MediaImage,
  type MediaImageSource,
} from '@/components/shared/media-image'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { DEMO_SERVICES } from '@/lib/demo-content'
import { cn, formatPrice } from '@/lib/utils'

export type ServiceCardItem = {
  id: string
  title: string
  slug: string
  shortDescription?: string | null
  priceFrom?: number | null
  image?: MediaImageSource | null
  isDemo?: boolean
}

export type ServicesGridProps = {
  services?: ServiceCardItem[] | null
  eyebrow?: string
  title?: string
  description?: string
  viewAllHref?: string
  className?: string
}

const DEMO_ITEMS: ServiceCardItem[] = DEMO_SERVICES.map((service) => ({
  id: service.id,
  title: service.title,
  slug: service.slug,
  shortDescription: service.shortDescription,
  priceFrom: service.priceFrom,
  image: service.image,
  isDemo: service.isDemo,
}))

export function ServicesGrid({
  services,
  eyebrow = 'Услуги',
  title = 'Направления, в которых мы сильны',
  description = 'От гигиены и терапии до имплантации и ортодонтии — спокойный путь к результату.',
  viewAllHref = '/services',
  className,
}: ServicesGridProps) {
  const items = services === undefined || services === null ? DEMO_ITEMS : services
  const usingDemo = services == null || items.some((item) => item.isDemo)

  return (
    <section
      className={cn('section-padding', className)}
      aria-labelledby="services-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
              as="h2"
            />
            <span id="services-heading" className="sr-only">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {usingDemo ? <DemoBadge /> : null}
            <Link
              href={viewAllHref}
              className={cn(buttonVariants({ variant: 'outline' }), 'shrink-0')}
            >
              Все услуги
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState
            className="mt-12"
            title="Услуги скоро появятся"
            description="Раздел наполняется. Пока можно записаться на консультацию — подберём подходящее направление."
            cta={
              <Link href="/#appointment" className={cn(buttonVariants())}>
                Записаться
              </Link>
            }
          />
        ) : (
          <div className="mt-12">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((service) => (
                <div key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
                      <MediaImage
                        media={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="aspect-[4/3] w-full"
                        imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                            {service.title}
                          </h3>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          />
                        </div>
                        {service.shortDescription ? (
                          <p className="line-clamp-3 text-sm text-muted-foreground">
                            {service.shortDescription}
                          </p>
                        ) : null}
                        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                          <p className="text-sm font-medium text-foreground">
                            {formatPrice(service.priceFrom)}
                          </p>
                          {service.isDemo ? <DemoBadge /> : null}
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
