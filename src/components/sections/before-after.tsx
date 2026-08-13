import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { DemoBadge } from '@/components/shared/demo-badge'
import {
  MediaImage,
  type MediaImageSource,
} from '@/components/shared/media-image'
import { buttonVariants } from '@/components/ui/button'
import { CardsSwiper } from '@/components/ui/cards-swiper'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { DEMO_IMAGES } from '@/lib/demo-content'
import { cn } from '@/lib/utils'

export type CasePreviewItem = {
  id: string
  title: string
  slug: string
  description?: string | null
  duration?: string | null
  disclaimer?: string | null
  beforeImage?: MediaImageSource | null
  afterImage?: MediaImageSource | null
  isDemo?: boolean
}

export type BeforeAfterProps = {
  cases?: CasePreviewItem[] | null
  eyebrow?: string
  title?: string
  description?: string
  disclaimer?: string
  viewAllHref?: string
  className?: string
}

const DEFAULT_DISCLAIMER =
  'Результаты индивидуальны и зависят от клинической ситуации. Примеры работ носят ознакомительный характер.'

const DEMO_CASES: CasePreviewItem[] = [
  {
    id: 'demo-case-1',
    title: 'Восстановление улыбки после имплантации',
    slug: 'smile-rehab',
    description:
      'Демо-кейс: планирование имплантации и аккуратное протезирование.',
    duration: 'несколько этапов',
    beforeImage: DEMO_IMAGES.cases['smile-rehab'].before,
    afterImage: DEMO_IMAGES.cases['smile-rehab'].after,
    isDemo: true,
  },
  {
    id: 'demo-case-2',
    title: 'Профессиональная гигиена',
    slug: 'hygiene-restore',
    description: 'Демо-кейс: профессиональная гигиена с удалением налёта.',
    duration: '1 визит',
    beforeImage: DEMO_IMAGES.cases['hygiene-restore'].before,
    afterImage: DEMO_IMAGES.cases['hygiene-restore'].after,
    isDemo: true,
  },
]

export function BeforeAfter({
  cases,
  eyebrow = 'Кейсы',
  title = 'До и после — честный результат',
  description = 'Подборка работ, где видно путь от исходной ситуации к аккуратному финалу.',
  disclaimer = DEFAULT_DISCLAIMER,
  viewAllHref = '/cases',
  className,
}: BeforeAfterProps) {
  const items = cases === undefined || cases === null ? DEMO_CASES : cases
  const usingDemo = cases == null || items.some((item) => item.isDemo)

  return (
    <section
      className={cn('section-padding bg-surface/60', className)}
      aria-labelledby="before-after-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            <span id="before-after-heading" className="sr-only">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {usingDemo ? <DemoBadge /> : null}
            <Link
              href={viewAllHref}
              className={cn(buttonVariants({ variant: 'outline' }), 'shrink-0')}
            >
              Все кейсы
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState
            className="mt-12"
            title="Кейсы скоро появятся"
            description="Мы готовим примеры работ. Пока можно записаться на консультацию и обсудить ваш случай."
            cta={
              <Link href="/#appointment" className={cn(buttonVariants())}>
                Записаться
              </Link>
            }
          />
        ) : (
          <>
            <CardsSwiper
              className="mt-12"
              from="lg"
              desktopClassName="gap-6 lg:grid-cols-2"
              ariaLabel="Кейсы до и после"
            >
              {items.map((item) => (
                <div key={item.id} className="h-full">
                  <Link
                    href={`/cases/${item.slug}`}
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <article className="overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 group-hover:-translate-y-1">
                      <div className="grid grid-cols-2 gap-px bg-border/80">
                        <figure className="relative aspect-[4/5] bg-muted">
                          <MediaImage
                            media={item.beforeImage}
                            alt={`${item.title} — до`}
                            fill
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            className="absolute inset-0"
                          />
                          <figcaption className="absolute bottom-3 left-3 rounded-lg bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                            До
                          </figcaption>
                        </figure>
                        <figure className="relative aspect-[4/5] bg-muted">
                          <MediaImage
                            media={item.afterImage}
                            alt={`${item.title} — после`}
                            fill
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            className="absolute inset-0"
                          />
                          <figcaption className="absolute bottom-3 left-3 rounded-lg bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
                            После
                          </figcaption>
                        </figure>
                      </div>

                      <div className="space-y-3 p-6">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                            {item.title}
                          </h3>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          />
                        </div>
                        {item.description ? (
                          <p className="text-caption line-clamp-2">
                            {item.description}
                          </p>
                        ) : null}
                        <div className="flex flex-wrap items-center gap-2">
                          {item.duration ? (
                            <span className="text-caption">
                              Срок: {item.duration}
                            </span>
                          ) : null}
                          {item.isDemo ? <DemoBadge /> : null}
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </CardsSwiper>

            <p className="mt-8 max-w-3xl text-caption">{disclaimer}</p>
          </>
        )}
      </Container>
    </section>
  )
}
