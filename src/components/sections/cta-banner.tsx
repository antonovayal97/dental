import { SlideUp } from '@/components/shared/motion'
import {
  AppointmentForm,
  type ServiceOption,
} from '@/components/forms/appointment-form'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

export type CtaBannerProps = {
  eyebrow?: string
  title?: string
  description?: string
  services?: ServiceOption[]
  className?: string
}

export function CtaBanner({
  eyebrow = 'Запись',
  title = 'Запишитесь на консультацию',
  description = 'Оставьте контакты — администратор перезвонит, уточнит задачу и подберёт удобное время.',
  services,
  className,
}: CtaBannerProps) {
  return (
    <section
      id="appointment"
      className={cn(
        'relative border-y border-border/70 section-padding',
        className,
      )}
      aria-labelledby="cta-banner-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-soft via-background to-secondary"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 surface-grid opacity-30"
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <SlideUp>
            <p className="text-label text-accent">{eyebrow}</p>
            <h2 id="cta-banner-heading" className="mt-3 text-heading">
              {title}
            </h2>
            <p className="mt-4 max-w-md text-body">{description}</p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                Без навязчивых продаж — сначала диагностика и план
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                Понятные этапы и ориентиры по стоимости
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                Спокойный ритм приёма и бережный подход
              </li>
            </ul>
          </SlideUp>

          <SlideUp delay={0.08}>
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-lift sm:p-7">
              <AppointmentForm services={services} />
            </div>
          </SlideUp>
        </div>
      </Container>
    </section>
  )
}
