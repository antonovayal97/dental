import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BeforeAfterSlider, CtaBanner } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import { JsonLd } from '@/components/shared/json-ld'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import {
  asMedia,
  relationName,
  relationTitle,
  resolveCaseImages,
  safeGetCaseBySlug,
  safeGetCases,
} from '@/lib/content'
import { breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

type PageProps = {
  params: Promise<{ slug: string }>
}

const DEFAULT_DISCLAIMER =
  'Результаты индивидуальны и зависят от клинической ситуации, исходного состояния и выбранного плана лечения. Пример носит ознакомительный характер.'

export async function generateStaticParams() {
  try {
    const { items } = await safeGetCases(100)
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
  const { item } = await safeGetCaseBySlug(slug)

  if (!item) {
    return buildMetadata({
      path: `/cases/${slug}`,
      title: 'Кейс не найден',
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
    path: `/cases/${slug}`,
    title: seo?.metaTitle || String(item.title || 'Кейс'),
    description:
      seo?.metaDescription ||
      (typeof item.description === 'string' ? item.description : undefined),
    image:
      asMedia(seo?.ogImage) ||
      asMedia(item.afterImage) ||
      asMedia(item.beforeImage),
  })
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { item, isDemo } = await safeGetCaseBySlug(slug)

  if (!item) notFound()

  const images = resolveCaseImages(item)
  const serviceTitle = relationTitle(item.service)
  const doctorName = relationName(item.doctor)
  const disclaimer =
    typeof item.disclaimer === 'string' && item.disclaimer.trim()
      ? item.disclaimer
      : DEFAULT_DISCLAIMER

  const crumbsLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Кейсы', path: '/cases' },
    { name: String(item.title || 'Кейс'), path: `/cases/${slug}` },
  ])

  return (
    <>
      {crumbsLd ? <JsonLd id="case-breadcrumb-jsonld" data={crumbsLd} /> : null}

      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-10 sm:pb-12">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Кейсы', href: '/cases' },
              { label: String(item.title || 'Кейс') },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-label text-accent">Кейс</p>
              {isDemo ? <DemoBadge /> : null}
            </div>
            <h1 className="mt-4 text-display">{String(item.title)}</h1>
            {typeof item.description === 'string' ? (
              <p className="mt-5 text-body">{item.description}</p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-4 text-caption">
              {serviceTitle ? <span>Услуга: {serviceTitle}</span> : null}
              {doctorName ? <span>Врач: {doctorName}</span> : null}
              {typeof item.duration === 'string' && item.duration ? (
                <span>Срок: {item.duration}</span>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container className="space-y-8">
          <BeforeAfterSlider
            beforeImage={images.beforeImage}
            afterImage={images.afterImage}
            disclaimer={disclaimer}
          />

          <div className="rounded-2xl border border-border/80 bg-muted/50 px-5 py-4 text-caption">
            <p>
              <strong className="font-medium text-foreground">Важно: </strong>
              {disclaimer}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/#appointment" className={cn(buttonVariants({ size: 'lg' }))}>
              Обсудить похожий случай
            </Link>
            <Link
              href="/cases"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Все кейсы
            </Link>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Хотите понятный план лечения?"
        description="Запишитесь на консультацию — врач оценит ситуацию и предложит спокойный путь к результату."
      />
    </>
  )
}
