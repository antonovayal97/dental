import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CtaBanner, ServicesGrid } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import { JsonLd } from '@/components/shared/json-ld'
import { MediaImage } from '@/components/shared/media-image'
import { SlideUp } from '@/components/shared/motion'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import {
  asMedia,
  asTextList,
  relationTitle,
  resolveDoctorPhoto,
  resolveServiceImage,
  safeGetDoctorBySlug,
  safeGetDoctors,
} from '@/lib/content'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { items } = await safeGetDoctors(100)
    return items
      .map((item) => item.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const { item } = await safeGetDoctorBySlug(slug)

  if (!item) {
    return buildMetadata({
      path: `/doctors/${slug}`,
      title: 'Врач не найден',
      noIndex: true,
    })
  }

  const seo =
    item.seo && typeof item.seo === 'object'
      ? (item.seo as {
          metaTitle?: string | null
          metaDescription?: string | null
          ogImage?: unknown
        })
      : null

  return buildMetadata({
    path: `/doctors/${slug}`,
    title: seo?.metaTitle || String(item.name || 'Врач'),
    description:
      seo?.metaDescription ||
      [item.position, item.specialization, item.approach]
        .filter((value) => typeof value === 'string' && value)
        .join(' — '),
    image: asMedia(seo?.ogImage) || asMedia(item.photo),
  })
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { item, isDemo } = await safeGetDoctorBySlug(slug)

  if (!item) notFound()

  const education = asTextList(item.education)
  const certificates = asTextList(item.certificates)
  const servicesRaw = Array.isArray(item.services) ? item.services : []
  const services = servicesRaw
    .filter((service): service is Record<string, unknown> =>
      Boolean(service && typeof service === 'object' && 'slug' in service),
    )
    .map((service) => ({
      id: String(service.id ?? service.slug),
      title: String(service.title || relationTitle(service) || 'Услуга'),
      slug: String(service.slug),
      shortDescription:
        typeof service.shortDescription === 'string'
          ? service.shortDescription
          : null,
      priceFrom:
        typeof service.priceFrom === 'number' ? service.priceFrom : null,
      image: resolveServiceImage(service),
      isDemo,
    }))

  const crumbsLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Врачи', path: '/doctors' },
    { name: String(item.name || 'Врач'), path: `/doctors/${slug}` },
  ])

  return (
    <>
      {crumbsLd ? <JsonLd id="doctor-breadcrumb-jsonld" data={crumbsLd} /> : null}

      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-12 sm:pb-16">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Врачи', href: '/doctors' },
              { label: String(item.name || 'Врач') },
            ]}
          />

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <MediaImage
              media={resolveDoctorPhoto(item)}
              alt={String(item.name || 'Фото врача')}
              fill
              className="aspect-[4/5] rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 36vw"
            />

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-label text-accent">
                  {typeof item.position === 'string'
                    ? item.position
                    : 'Специалист'}
                </p>
                {isDemo ? <DemoBadge /> : null}
              </div>
              <h1 className="mt-4 text-display">{String(item.name)}</h1>
              {typeof item.specialization === 'string' ? (
                <p className="mt-4 text-body">{item.specialization}</p>
              ) : null}
              {typeof item.experienceYears === 'number' ? (
                <p className="mt-3 text-caption">
                  Стаж: {item.experienceYears}{' '}
                  {pluralYears(item.experienceYears)}
                </p>
              ) : null}
              {typeof item.approach === 'string' && item.approach ? (
                <p className="mt-6 max-w-2xl text-body">{item.approach}</p>
              ) : null}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#appointment"
                  className={cn(buttonVariants({ size: 'lg' }))}
                >
                  Записаться к врачу
                </Link>
                <Link
                  href="/services"
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                  )}
                >
                  Смотреть услуги
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <SlideUp>
            <h2 className="text-heading">Образование</h2>
            {education.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {education.map((entry) => (
                  <li key={entry} className="flex gap-3 text-body">
                    <span
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-body">
                Информация об образовании появится после наполнения профиля в
                CMS.
              </p>
            )}
          </SlideUp>

          <SlideUp delay={0.06}>
            <h2 className="text-heading">Сертификаты</h2>
            {certificates.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {certificates.map((entry) => (
                  <li key={entry} className="flex gap-3 text-body">
                    <span
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-body">
                Список сертификатов можно добавить в карточке врача в админке.
              </p>
            )}
          </SlideUp>
        </Container>
      </section>

      {services.length > 0 ? (
        <ServicesGrid
          services={services}
          eyebrow="Направления"
          title={`Услуги врача ${String(item.name)}`}
          description="Направления, с которыми работает специалист."
        />
      ) : null}

      <CtaBanner
        title={`Консультация с врачом ${String(item.name)}`}
        description="Оставьте контакты — администратор поможет выбрать удобное время приёма."
      />
    </>
  )
}

function pluralYears(value: number) {
  const mod10 = value % 10
  const mod100 = value % 100
  if (mod10 === 1 && mod100 !== 11) return 'год'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'года'
  return 'лет'
}
