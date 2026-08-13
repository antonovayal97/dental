import Link from 'next/link'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'

import { DemoBadge } from '@/components/shared/demo-badge'
import { SlideUp } from '@/components/shared/motion'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { DEMO_CLINIC } from '@/lib/demo-content'
import { cn, formatPhone, phoneHref } from '@/lib/utils'

export type ContactsPreviewHours = {
  day: string
  hours: string
}

export type ContactsPreviewProps = {
  clinicName?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  workingHours?: ContactsPreviewHours[] | null
  href?: string
  eyebrow?: string
  description?: string
  ctaLabel?: string
  isDemo?: boolean
  className?: string
}

export function ContactsPreview({
  clinicName = DEMO_CLINIC.clinicName,
  phone = DEMO_CLINIC.phone,
  email = DEMO_CLINIC.email,
  address = DEMO_CLINIC.address,
  city = DEMO_CLINIC.city,
  workingHours,
  href = '/contacts',
  eyebrow = 'Контакты',
  description = 'Приезжайте в удобное время или оставьте заявку — поможем сориентироваться по услугам и записи.',
  ctaLabel = 'Все контакты и схема проезда',
  isDemo,
  className,
}: ContactsPreviewProps) {
  const hours =
    workingHours?.length
      ? workingHours
      : DEMO_CLINIC.workingHours.map((item) => ({
          day: item.day,
          hours: item.hours,
        }))

  const showDemo =
    isDemo ??
    (phone === DEMO_CLINIC.phone ||
      email === DEMO_CLINIC.email ||
      address === DEMO_CLINIC.address)

  return (
    <section
      className={cn('section-padding', className)}
      aria-labelledby="contacts-preview-heading"
    >
      <Container>
        <SlideUp>
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-card">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-border/80 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3">
                  <p className="text-label">{eyebrow}</p>
                  {showDemo ? <DemoBadge /> : null}
                </div>
                <h2
                  id="contacts-preview-heading"
                  className="mt-3 text-heading"
                >
                  {clinicName}
                </h2>
                <p className="mt-3 max-w-md text-body">{description}</p>

                <dl className="mt-8 space-y-4">
                  <div className="flex gap-3">
                    <MapPin
                      className="mt-0.5 size-5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="sr-only">Адрес</dt>
                      <dd className="text-sm font-medium text-foreground">
                        {address}
                      </dd>
                      {city ? (
                        <p className="mt-1 text-caption">{city}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone
                      className="mt-0.5 size-5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="sr-only">Телефон</dt>
                      <dd>
                        <a
                          href={phoneHref(phone)}
                          className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                        >
                          {formatPhone(phone)}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail
                      className="mt-0.5 size-5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${email}`}
                          className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                        >
                          {email}
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>

                <Link
                  href={href}
                  className={cn(buttonVariants({ variant: 'outline' }), 'mt-8')}
                >
                  {ctaLabel}
                </Link>
              </div>

              <div className="bg-gradient-to-br from-accent-soft/80 via-muted to-secondary p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <Clock3 className="size-5 text-accent" aria-hidden="true" />
                  <h3 className="text-lg font-semibold tracking-tight">
                    Часы работы
                  </h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {hours.map((item) => (
                    <li
                      key={`${item.day}-${item.hours}`}
                      className="flex items-center justify-between gap-4 border-b border-border/60 pb-3 text-sm last:border-b-0 last:pb-0"
                    >
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className="font-medium text-foreground">
                        {item.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </SlideUp>
      </Container>
    </section>
  )
}
