import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CtaBanner, DoctorsGrid, FaqSection, ServicesGrid } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import { JsonLd } from '@/components/shared/json-ld'
import { MediaImage } from '@/components/shared/media-image'
import { SlideUp } from '@/components/shared/motion'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import {
  asMedia,
  asStages,
  asTextList,
  relationName,
  relationSlug,
  relationTitle,
  resolveDoctorPhoto,
  resolveServiceImage,
  safeGetRelatedServices,
  safeGetServiceBySlug,
  safeGetServices,
} from '@/lib/content'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn, formatPrice } from '@/lib/utils'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { items } = await safeGetServices(100)
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
  const { item } = await safeGetServiceBySlug(slug)

  if (!item) {
    return buildMetadata({
      path: `/services/${slug}`,
      title: 'Услуга не найдена',
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
    path: `/services/${slug}`,
    title: seo?.metaTitle || String(item.title || 'Услуга'),
    description:
      seo?.metaDescription ||
      (typeof item.shortDescription === 'string'
        ? item.shortDescription
        : typeof item.description === 'string'
          ? item.description
          : undefined),
    image: asMedia(seo?.ogImage) || asMedia(item.image),
  })
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { item, isDemo } = await safeGetServiceBySlug(slug)

  if (!item) notFound()

  const related = await safeGetRelatedServices(item, 4)
  const whenNeeded = asTextList(item.whenNeeded)
  const stages = asStages(item.stages)
  const process =
    typeof item.process === 'string' && item.process.trim()
      ? item.process
      : null
  const priceNote =
    typeof item.priceNote === 'string' ? item.priceNote : null

  const doctorsRaw = Array.isArray(item.doctors) ? item.doctors : []
  const doctors = doctorsRaw
    .filter((doc): doc is Record<string, unknown> => Boolean(doc && typeof doc === 'object'))
    .map((doc) => ({
      id: String(doc.id ?? relationSlug(doc) ?? `doctor-${doc.name ?? 'unknown'}`),
      name: String(doc.name || relationName(doc) || 'Врач'),
      slug: String(doc.slug || ''),
      specialization:
        typeof doc.specialization === 'string' ? doc.specialization : null,
      experienceYears:
        typeof doc.experienceYears === 'number' ? doc.experienceYears : null,
      position: typeof doc.position === 'string' ? doc.position : null,
      photo: resolveDoctorPhoto(doc),
      isDemo,
    }))
    .filter((doc) => doc.slug)

  const faqsRaw = Array.isArray(item.faq) ? item.faq : []
  const faqs = faqsRaw
    .filter((faq): faq is Record<string, unknown> => Boolean(faq && typeof faq === 'object'))
    .map((faq, index) => ({
      id: String(faq.id ?? `faq-${index}`),
      question: String(faq.question || ''),
      answer: String(faq.answer || ''),
      isDemo,
    }))
    .filter((faq) => faq.question && faq.answer)

  const technologiesRaw = Array.isArray(item.technologies)
    ? item.technologies
    : []
  const technologies = technologiesRaw
    .filter((tech): tech is Record<string, unknown> =>
      Boolean(tech && typeof tech === 'object'),
    )
    .map((tech) => ({
      id: String(tech.id ?? tech.slug ?? `tech-${tech.title ?? 'unknown'}`),
      title: String(tech.title || 'Технология'),
      description:
        typeof tech.description === 'string' ? tech.description : '',
    }))

  const categoryTitle = relationTitle(item.category)
  const crumbs = [
    { name: 'Главная', path: '/' },
    { name: 'Услуги', path: '/services' },
    { name: String(item.title || 'Услуга'), path: `/services/${slug}` },
  ]
  const crumbsLd = breadcrumbJsonLd(crumbs)

  return (
    <>
      {crumbsLd ? <JsonLd id="service-breadcrumb-jsonld" data={crumbsLd} /> : null}

      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-12 sm:pb-16">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Услуги', href: '/services' },
              { label: String(item.title || 'Услуга') },
            ]}
          />

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-label text-accent">
                  {categoryTitle || 'Услуга'}
                </p>
                {isDemo ? <DemoBadge /> : null}
              </div>
              <h1 className="mt-4 text-display">{String(item.title)}</h1>
              <p className="mt-5 max-w-2xl text-body">
                {typeof item.shortDescription === 'string'
                  ? item.shortDescription
                  : typeof item.description === 'string'
                    ? item.description
                    : 'Подробности услуги и план лечения обсуждаются на консультации.'}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {formatPrice(
                    typeof item.priceFrom === 'number' ? item.priceFrom : null,
                  )}
                </p>
                {priceNote ? (
                  <p className="max-w-sm text-caption">{priceNote}</p>
                ) : null}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#appointment"
                  className={cn(buttonVariants({ size: 'lg' }))}
                >
                  Записаться на консультацию
                </Link>
                <Link
                  href="/prices"
                  className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
                >
                  Смотреть цены
                </Link>
              </div>
            </div>

            <MediaImage
              media={resolveServiceImage(item)}
              alt={String(item.title || 'Услуга')}
              fill
              className="aspect-[4/3] rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-10">
            <SlideUp>
              <h2 className="text-heading">Описание</h2>
              <p className="mt-4 prose-clinic whitespace-pre-line">
                {typeof item.description === 'string'
                  ? item.description
                  : 'Описание услуги появится после наполнения CMS.'}
              </p>
            </SlideUp>

            {whenNeeded.length > 0 ? (
              <SlideUp>
                <h2 className="text-heading">Когда нужна услуга</h2>
                <ul className="mt-5 space-y-3">
                  {whenNeeded.map((entry) => (
                    <li key={entry} className="flex gap-3 text-body">
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              </SlideUp>
            ) : null}

            {process ? (
              <SlideUp>
                <h2 className="text-heading">Как проходит лечение</h2>
                <p className="mt-4 prose-clinic whitespace-pre-line">{process}</p>
              </SlideUp>
            ) : null}

            {stages.length > 0 ? (
              <SlideUp>
                <h2 className="text-heading">Этапы</h2>
                <ol className="mt-6 space-y-4">
                  {stages.map((stage, index) => (
                    <li
                      key={`${stage.title}-${index}`}
                      className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft"
                    >
                      <p className="text-label text-accent">Этап {index + 1}</p>
                      <h3 className="mt-2 text-subheading">{stage.title}</h3>
                      {stage.description ? (
                        <p className="mt-2 text-body">{stage.description}</p>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </SlideUp>
            ) : null}
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
              <h2 className="text-subheading">Стоимость</h2>
              <p className="mt-3 text-3xl font-semibold tracking-tight">
                {formatPrice(
                  typeof item.priceFrom === 'number' ? item.priceFrom : null,
                )}
              </p>
              <p className="mt-3 text-caption">
                {priceNote ||
                  'Точная стоимость определяется после консультации и диагностики.'}
              </p>
              <Link
                href="#appointment"
                className={cn(buttonVariants({ size: 'lg' }), 'mt-6 w-full')}
              >
                Получить план лечения
              </Link>
            </div>

            {technologies.length > 0 ? (
              <div className="rounded-2xl border border-border/80 bg-muted/40 p-6">
                <h2 className="text-subheading">Технологии</h2>
                <ul className="mt-4 space-y-4">
                  {technologies.map((tech) => (
                    <li key={tech.id}>
                      <p className="font-medium text-foreground">{tech.title}</p>
                      {tech.description ? (
                        <p className="mt-1 text-caption">{tech.description}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </Container>
      </section>

      {doctors.length > 0 ? (
        <DoctorsGrid
          doctors={doctors}
          title="Врачи по направлению"
          description="Специалисты, которые ведут пациентов по этой услуге."
        />
      ) : null}

      {faqs.length > 0 ? (
        <FaqSection
          faqs={faqs}
          title="Вопросы об услуге"
          description="Короткие ответы до записи на консультацию."
        />
      ) : null}

      <CtaBanner
        title={`Запись: ${String(item.title)}`}
        description="Оставьте контакты — администратор уточнит детали и подберёт время."
        services={[
          {
            label: String(item.title || 'Услуга'),
            value: String(item.slug || slug),
          },
        ]}
      />

      {related.length > 0 ? (
        <ServicesGrid
          services={related.map((service) => ({
            id: String(service.id),
            title: String(service.title || 'Услуга'),
            slug: String(service.slug || service.id),
            shortDescription:
              typeof service.shortDescription === 'string'
                ? service.shortDescription
                : null,
            priceFrom:
              typeof service.priceFrom === 'number' ? service.priceFrom : null,
            image: resolveServiceImage(service),
            isDemo: Boolean(service.isDemo) || isDemo,
          }))}
          eyebrow="Смотрите также"
          title="Связанные услуги"
          description="Дополнительные направления, которые часто идут рядом с выбранной услугой."
        />
      ) : null}
    </>
  )
}
