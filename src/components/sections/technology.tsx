import {
  Crosshair,
  Microscope,
  ScanLine,
  ShieldPlus,
  Syringe,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

import { DemoBadge } from '@/components/shared/demo-badge'
import {
  MediaImage,
  type MediaImageSource,
} from '@/components/shared/media-image'
import { SlideUp } from '@/components/shared/motion'
import { CardsSwiper } from '@/components/ui/cards-swiper'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { DEMO_TECHNOLOGIES } from '@/lib/demo-content'
import { cn } from '@/lib/utils'

const TECH_ICONS: Record<string, LucideIcon> = {
  scan: ScanLine,
  microscope: Microscope,
  cadcam: Workflow,
  anesthesia: Syringe,
  sterilization: ShieldPlus,
  diagnostics: Crosshair,
}

export type TechnologyItem = {
  id: string
  title: string
  slug?: string
  description: string
  icon?: string | null
  image?: MediaImageSource | null
  isDemo?: boolean
}

export type TechnologyProps = {
  technologies?: TechnologyItem[] | null
  eyebrow?: string
  title?: string
  description?: string
  className?: string
}

const DEMO_ITEMS: TechnologyItem[] = DEMO_TECHNOLOGIES.map((item) => ({
  id: item.id,
  title: item.title,
  slug: item.slug,
  description: item.description,
  icon: item.icon,
  image: item.image,
  isDemo: item.isDemo,
}))

export function Technology({
  technologies,
  eyebrow = 'Технологии',
  title = 'Технологии, которые помогают лечить точнее',
  description = 'Цифровая диагностика и современное оборудование — меньше догадок, больше контроля на каждом этапе.',
  className,
}: TechnologyProps) {
  const items =
    technologies === undefined || technologies === null
      ? DEMO_ITEMS
      : technologies
  const usingDemo = technologies == null || items.some((item) => item.isDemo)

  return (
    <section
      id="technologies"
      className={cn('section-padding border-y border-border/70', className)}
      aria-labelledby="technology-heading"
    >
      <Container>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            <span id="technology-heading" className="sr-only">
              {title}
            </span>
            {usingDemo ? <DemoBadge className="mt-4" /> : null}
          </div>

          <div className="min-w-0">
            {items.length === 0 ? (
              <EmptyState
                title="Технологии скоро появятся"
                description="Мы готовим описание оборудования клиники."
              />
            ) : (
              <SlideUp className="min-w-0">
                <CardsSwiper
                  from="lg"
                  layout="stack"
                  desktopClassName="space-y-4"
                  slidesPerView={1.15}
                  ariaLabel="Технологии"
                >
                  {items.map((item, index) => {
                    const Icon = TECH_ICONS[item.icon ?? ''] ?? ScanLine
                    const isWide = index % 3 === 0

                    return (
                      <article
                        key={item.id}
                        className={cn(
                          'flex h-full min-w-0 w-full max-w-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card',
                          isWide ? 'lg:grid lg:grid-cols-[1.1fr_0.9fr]' : '',
                        )}
                      >
                        <div className="flex min-w-0 flex-col justify-between p-5 sm:p-8">
                          <div className="min-w-0">
                            <div className="mb-4 flex items-center gap-3">
                              <div
                                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"
                                aria-hidden="true"
                              >
                                <Icon className="size-5" />
                              </div>
                              {item.isDemo ? <DemoBadge /> : null}
                            </div>
                            <h3 className="text-subheading break-words">
                              {item.title}
                            </h3>
                            <p className="mt-3 text-body text-base sm:text-base">
                              {item.description}
                            </p>
                          </div>
                          <p className="mt-6 text-label text-accent/80">
                            {String(index + 1).padStart(2, '0')}
                          </p>
                        </div>

                        {isWide ? (
                          <div className="relative min-h-44 shrink-0 border-t border-border/70 lg:min-h-full lg:border-l lg:border-t-0">
                            <MediaImage
                              media={item.image}
                              alt={item.title}
                              fill
                              sizes="(max-width: 1024px) 85vw, 30vw"
                              className="absolute inset-0 h-full min-h-44"
                            />
                          </div>
                        ) : null}
                      </article>
                    )
                  })}
                </CardsSwiper>
              </SlideUp>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
