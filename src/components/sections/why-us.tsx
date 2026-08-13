import {
  BadgeCheck,
  ClipboardList,
  Cpu,
  HandHeart,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react'

import { DemoBadge } from '@/components/shared/demo-badge'
import { SlideUp } from '@/components/shared/motion'
import { CardsSwiper } from '@/components/ui/cards-swiper'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { DEMO_ADVANTAGES } from '@/lib/demo-content'
import { cn } from '@/lib/utils'

const ADVANTAGE_ICONS: Record<string, LucideIcon> = {
  equipment: MonitorSmartphone,
  digital: Cpu,
  sterile: Sparkles,
  specialists: Stethoscope,
  pricing: BadgeCheck,
  plan: ClipboardList,
  guarantee: ShieldCheck,
  comfort: HandHeart,
}

export type AdvantageItem = {
  id: string
  title: string
  description: string
  icon?: string | null
  isDemo?: boolean
}

export type WhyUsProps = {
  advantages?: AdvantageItem[] | null
  eyebrow?: string
  title?: string
  description?: string
  className?: string
}

const DEMO_ITEMS: AdvantageItem[] = DEMO_ADVANTAGES.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  icon: item.icon,
  isDemo: item.isDemo,
}))

export function WhyUs({
  advantages,
  eyebrow = 'Почему мы',
  title = 'Почему пациенты выбирают нас',
  description = 'Не громкие обещания — спокойный процесс, прозрачность и внимание к деталям на каждом этапе.',
  className,
}: WhyUsProps) {
  const items =
    advantages === undefined || advantages === null ? DEMO_ITEMS : advantages
  const usingDemo = advantages == null || items.some((item) => item.isDemo)

  return (
    <section
      className={cn('section-padding bg-surface/70', className)}
      aria-labelledby="why-us-heading"
    >
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            <span id="why-us-heading" className="sr-only">
              {title}
            </span>
          </div>
          {usingDemo ? <DemoBadge className="self-start lg:self-auto" /> : null}
        </div>

        {items.length === 0 ? (
          <EmptyState
            className="mt-12"
            title="Преимущества появятся позже"
            description="Мы готовим описание подхода клиники. Пока можно познакомиться с услугами и врачами."
          />
        ) : (
          <SlideUp className="mt-12">
            <CardsSwiper
              desktopClassName="gap-4 sm:grid-cols-2 lg:grid-cols-4"
              ariaLabel="Преимущества"
            >
              {items.map((item, index) => {
                const Icon =
                  ADVANTAGE_ICONS[item.icon ?? ''] ??
                  ADVANTAGE_ICONS.specialists
                const asymmetric =
                  index % 4 === 1 || index % 4 === 2
                    ? 'lg:translate-y-4'
                    : ''

                return (
                  <article
                    key={item.id}
                    className={cn(
                      'h-full rounded-2xl border border-border/80 bg-card p-6',
                      asymmetric,
                    )}
                  >
                    <div
                      className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      {item.isDemo ? <DemoBadge /> : null}
                    </div>
                    <p className="mt-2 text-caption">{item.description}</p>
                  </article>
                )
              })}
            </CardsSwiper>
          </SlideUp>
        )}
      </Container>
    </section>
  )
}
