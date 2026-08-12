import Link from 'next/link'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'

import { AppointmentForm } from '@/components/forms/appointment-form'
import { DemoBadge } from '@/components/shared/demo-badge'
import { SlideUp } from '@/components/shared/motion'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { safeGetServices, safeGetSiteSettings } from '@/lib/content'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn, formatPhone, phoneHref } from '@/lib/utils'

export async function generateMetadata() {
  return buildMetadata({
    path: '/contacts',
    title: 'Контакты',
    description:
      'Адрес, телефон, часы работы и форма записи на консультацию.',
  })
}

export default async function ContactsPage() {
  const [siteResult, servicesResult] = await Promise.all([
    safeGetSiteSettings(),
    safeGetServices(30),
  ])

  const site = siteResult.data
  const mapsUrl = getMapsUrl(site)
  const hours =
    site.workingHours
      ?.filter((item) => item.day && item.hours)
      .map((item) => ({ day: item.day!, hours: item.hours! })) ?? []

  const serviceOptions = servicesResult.items
    .filter((item) => item.title && item.slug)
    .map((item) => ({
      label: String(item.title),
      value: String(item.slug),
    }))

  return (
    <>
      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-10 sm:pb-12">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Контакты' },
            ]}
          />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Контакты"
              title="Как с нами связаться"
              description="Телефон, адрес, часы работы и быстрая запись на консультацию."
              as="h1"
            />
            {siteResult.isDemo ? <DemoBadge /> : null}
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <SlideUp>
            <div className="space-y-6 rounded-2xl border border-border/80 bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-subheading">{site.clinicName}</h2>

              <div className="space-y-4 text-body">
                <p className="flex gap-3">
                  <Phone className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <a
                    href={phoneHref(site.phone)}
                    className="font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {formatPhone(site.phone)}
                  </a>
                </p>
                <p className="flex gap-3">
                  <Mail className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </p>
                <p className="flex gap-3">
                  <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    {site.address}
                    {site.city ? `, ${site.city}` : ''}
                    {site.district ? ` · ${site.district}` : ''}
                  </span>
                </p>
              </div>

              {hours.length > 0 ? (
                <div>
                  <p className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Clock3 className="size-4 text-accent" aria-hidden="true" />
                    Часы работы
                  </p>
                  <ul className="space-y-2 text-caption">
                    {hours.map((item) => (
                      <li
                        key={`${item.day}-${item.hours}`}
                        className="flex justify-between gap-4 border-b border-border/60 pb-2 last:border-0"
                      >
                        <span>{item.day}</span>
                        <span className="font-medium text-foreground">
                          {item.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <Link
                href="/#appointment"
                className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}
              >
                {site.ctaPrimaryText || 'Записаться на приём'}
              </Link>
            </div>
          </SlideUp>

          <SlideUp delay={0.08}>
            <div
              id="appointment"
              className="rounded-2xl border border-border/80 bg-card p-6 shadow-lift sm:p-8"
            >
              <h2 className="text-subheading">Запись на консультацию</h2>
              <p className="mt-2 text-caption">
                Оставьте контакты — администратор перезвонит и подберёт удобное
                время.
              </p>
              <div className="mt-6">
                <AppointmentForm services={serviceOptions} />
              </div>
            </div>
          </SlideUp>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <h2 className="text-heading">Как нас найти</h2>
          <p className="mt-3 max-w-2xl text-body">
            {site.address}
            {site.city ? `, ${site.city}` : ''}. Если нужна навигация —
            добавьте ссылку на карту в настройках сайта.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border/80 bg-muted/40">
            {mapsUrl ? (
              <iframe
                title={`Карта: ${site.clinicName}`}
                src={mapsUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full border-0 sm:h-[28rem]"
                allowFullScreen
              />
            ) : (
              <div className="relative flex min-h-[18rem] flex-col justify-end overflow-hidden p-6 sm:min-h-[22rem] sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 surface-grid opacity-40"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_70%)]"
                />
                <div className="relative max-w-lg rounded-2xl border border-border/70 bg-card/90 p-5 shadow-soft backdrop-blur-sm">
                  <p className="text-label text-accent">Адрес</p>
                  <p className="mt-2 text-subheading">{site.clinicName}</p>
                  <p className="mt-2 text-body">
                    {site.address}
                    {site.city ? `, ${site.city}` : ''}
                  </p>
                  <p className="mt-4 text-caption">
                    Карта появится здесь, когда в настройках сайта будет указан
                    URL встраивания (mapsUrl / mapEmbedUrl).
                  </p>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}

function getMapsUrl(site: Record<string, unknown>): string | null {
  const candidates = [
    site.mapsUrl,
    site.mapUrl,
    site.mapEmbedUrl,
    site.yandexMapsUrl,
    site.googleMapsUrl,
  ]

  for (const value of candidates) {
    if (typeof value === 'string' && /^https?:\/\//i.test(value.trim())) {
      return value.trim()
    }
  }

  return null
}
