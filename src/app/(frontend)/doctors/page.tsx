import Link from 'next/link'

import { DoctorsGrid } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import { resolveDoctorPhoto, safeGetDoctors } from '@/lib/content'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

export async function generateMetadata() {
  return buildMetadata({
    path: '/doctors',
    title: 'Врачи',
    description:
      'Команда стоматологов: специализация, подход к лечению и запись на приём.',
  })
}

export default async function DoctorsPage() {
  const { items, isDemo } = await safeGetDoctors(50)

  return (
    <>
      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-10 sm:pb-12">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Врачи' },
            ]}
          />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Команда"
              title="Врачи клиники"
              description="Знакомьтесь со специалистами и выбирайте врача для консультации."
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

      <DoctorsGrid
        doctors={items.map((doctor) => ({
          id: String(doctor.id),
          name: String(doctor.name || 'Врач'),
          slug: String(doctor.slug || doctor.id),
          specialization:
            typeof doctor.specialization === 'string'
              ? doctor.specialization
              : null,
          experienceYears:
            typeof doctor.experienceYears === 'number'
              ? doctor.experienceYears
              : null,
          position:
            typeof doctor.position === 'string' ? doctor.position : null,
          photo: resolveDoctorPhoto(doctor),
          isDemo: Boolean(doctor.isDemo) || isDemo,
        }))}
        className="!pt-10"
        viewAllHref="/doctors"
      />
    </>
  )
}
