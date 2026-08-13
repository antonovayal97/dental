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
import { DEMO_DOCTORS } from '@/lib/demo-content'
import { cn } from '@/lib/utils'

export type DoctorCardItem = {
  id: string
  name: string
  slug: string
  specialization?: string | null
  experienceYears?: number | null
  position?: string | null
  photo?: MediaImageSource | null
  isDemo?: boolean
}

export type DoctorsGridProps = {
  doctors?: DoctorCardItem[] | null
  eyebrow?: string
  title?: string
  description?: string
  viewAllHref?: string
  className?: string
}

const DEMO_ITEMS: DoctorCardItem[] = DEMO_DOCTORS.map((doctor) => ({
  id: doctor.id,
  name: doctor.name,
  slug: doctor.slug,
  specialization: doctor.specialization,
  experienceYears: doctor.experienceYears,
  position: doctor.position,
  photo: doctor.photo,
  isDemo: doctor.isDemo,
}))

export function DoctorsGrid({
  doctors,
  eyebrow = 'Команда',
  title = 'Врачи, с которыми спокойно',
  description = 'Специалисты с понятной коммуникацией и вниманием к деталям — без спешки и шаблонных решений.',
  viewAllHref = '/doctors',
  className,
}: DoctorsGridProps) {
  const items = doctors === undefined || doctors === null ? DEMO_ITEMS : doctors
  const usingDemo = doctors == null || items.some((item) => item.isDemo)

  return (
    <section
      className={cn('section-padding', className)}
      aria-labelledby="doctors-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            <span id="doctors-heading" className="sr-only">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {usingDemo ? <DemoBadge /> : null}
            <Link
              href={viewAllHref}
              className={cn(buttonVariants({ variant: 'outline' }), 'shrink-0')}
            >
              Все врачи
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState
            className="mt-12"
            title="Врачи скоро появятся"
            description="Раздел команды наполняется. Запишитесь на консультацию — администратор подскажет специалиста."
            cta={
              <Link
                href="/#appointment"
                className={cn(buttonVariants())}
              >
                Записаться
              </Link>
            }
          />
        ) : (
          <CardsSwiper
            className="mt-12"
            desktopClassName="gap-5 sm:grid-cols-2 lg:grid-cols-3"
            ariaLabel="Врачи"
          >
            {items.map((doctor) => (
              <div key={doctor.id} className="h-full">
                <Link
                  href={`/doctors/${doctor.slug}`}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <article className="overflow-hidden rounded-2xl border border-border/80 bg-card transition-all duration-300 group-hover:-translate-y-1">
                    <MediaImage
                      media={doctor.photo}
                      alt={doctor.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="aspect-[4/5] w-full"
                      imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="space-y-2 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                            {doctor.name}
                          </h3>
                          {doctor.position ? (
                            <p className="mt-1 text-caption">{doctor.position}</p>
                          ) : null}
                        </div>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                      </div>
                      {doctor.specialization ? (
                        <p className="text-sm text-foreground/80">
                          {doctor.specialization}
                        </p>
                      ) : null}
                      <div className="flex items-center justify-between gap-3 pt-1">
                        {typeof doctor.experienceYears === 'number' ? (
                          <p className="text-caption">
                            Опыт: {doctor.experienceYears}{' '}
                            {yearsLabel(doctor.experienceYears)}
                          </p>
                        ) : (
                          <span />
                        )}
                        {doctor.isDemo ? <DemoBadge /> : null}
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </CardsSwiper>
        )}
      </Container>
    </section>
  )
}

function yearsLabel(years: number): string {
  const mod10 = years % 10
  const mod100 = years % 100
  if (mod10 === 1 && mod100 !== 11) return 'год'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'года'
  return 'лет'
}
