import Link from 'next/link'

import { AppointmentDialog } from '@/components/forms/appointment-dialog'
import type { ServiceOption } from '@/components/forms/appointment-form'
import { DemoBadge } from '@/components/shared/demo-badge'
import {
  MediaImage,
  type MediaImageSource,
} from '@/components/shared/media-image'
import { Container } from '@/components/ui/container'
import { buttonVariants } from '@/components/ui/button'
import { DEMO_TRUST_STATS } from '@/lib/demo-content'
import { cn } from '@/lib/utils'

export type HeroStat = {
  label: string
  value: string
  isDemo?: boolean
}

export type HeroProps = {
  eyebrow?: string
  title?: string
  subtitle?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  stats?: HeroStat[] | null
  image?: MediaImageSource | null
  services?: ServiceOption[]
  className?: string
}

const DEFAULT_STATS: HeroStat[] = DEMO_TRUST_STATS.map((stat) => ({
  label: stat.label,
  value: stat.value,
  isDemo: stat.isDemo,
}))

export function Hero({
  eyebrow = 'Современная стоматология',
  title = 'Здоровая улыбка,\nк которой хочется возвращаться',
  subtitle = 'Спокойный приём, понятный план лечения и аккуратная работа без лишней суеты — в атмосфере премиального ухода.',
  primaryCtaLabel = 'Записаться на консультацию',
  secondaryCtaLabel = 'Посмотреть услуги',
  secondaryCtaHref = '/services',
  stats,
  image,
  services,
  className,
}: HeroProps) {
  const trustStats = stats?.length ? stats : DEFAULT_STATS
  const usingDemoStats = !stats?.length || trustStats.some((item) => item.isDemo)

  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-border/70 pt-28 sm:pt-32 lg:pt-36',
        className,
      )}
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 surface-grid opacity-[0.35]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)]"
      />

      <Container className="relative section-padding !pt-0">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-label text-accent">{eyebrow}</p>

            <h1
              id="hero-heading"
              className="mt-4 text-display whitespace-pre-line"
            >
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-body">{subtitle}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <AppointmentDialog
                triggerLabel={primaryCtaLabel}
                triggerSize="lg"
                services={services}
              />
              <Link
                href={secondaryCtaHref}
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                {secondaryCtaLabel}
              </Link>
            </div>

            <div className="mt-12 border-t border-border/80 pt-8">
              <div className="mb-4 flex items-center gap-2">
                <p className="text-caption">Показатели клиники</p>
                {usingDemoStats ? <DemoBadge /> : null}
              </div>
              <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {trustStats.slice(0, 3).map((stat) => (
                  <div key={`${stat.value}-${stat.label}`} className="min-w-0">
                    <dt className="text-caption">{stat.label}</dt>
                    <dd className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/6] lg:aspect-[4/5]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-accent-soft via-muted to-secondary"
              />
              <MediaImage
                media={image}
                alt="Атмосфера современной стоматологической клиники"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="absolute inset-0"
                imageClassName="object-cover"
                fallbackClassName="bg-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
