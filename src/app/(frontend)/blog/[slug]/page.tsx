import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CtaBanner } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import { JsonLd } from '@/components/shared/json-ld'
import { MediaImage } from '@/components/shared/media-image'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import {
  asMedia,
  relationTitle,
  resolveArticleCover,
  safeGetArticleBySlug,
  safeGetArticles,
} from '@/lib/content'
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn, getMediaUrl, readingTime } from '@/lib/utils'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const { items } = await safeGetArticles(100)
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
  const { item } = await safeGetArticleBySlug(slug)

  if (!item) {
    return buildMetadata({
      path: `/blog/${slug}`,
      title: 'Статья не найдена',
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
    path: `/blog/${slug}`,
    title: seo?.metaTitle || String(item.title || 'Статья'),
    description:
      seo?.metaDescription ||
      (typeof item.excerpt === 'string' ? item.excerpt : undefined),
    image: asMedia(seo?.ogImage) || asMedia(item.coverImage),
  })
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const { item, isDemo } = await safeGetArticleBySlug(slug)

  if (!item) notFound()

  const categoryTitle = relationTitle(item.category)
  const content =
    typeof item.content === 'string' && item.content.trim()
      ? item.content
      : typeof item.excerpt === 'string'
        ? item.excerpt
        : 'Текст статьи появится после публикации в CMS.'

  const publishedAt =
    typeof item.publishedAt === 'string' ? item.publishedAt : null
  const author =
    typeof item.author === 'string' && item.author
      ? item.author
      : 'Команда клиники'

  const articleLd = articleJsonLd({
    title: String(item.title || 'Статья'),
    description:
      typeof item.excerpt === 'string' ? item.excerpt : undefined,
    path: `/blog/${slug}`,
    imageUrl: getMediaUrl(asMedia(item.coverImage)),
    datePublished: publishedAt,
    dateModified: publishedAt,
    authorName: author,
    isDemo,
  })

  const crumbsLd = breadcrumbJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Блог', path: '/blog' },
    { name: String(item.title || 'Статья'), path: `/blog/${slug}` },
  ])

  return (
    <>
      {articleLd ? <JsonLd id="article-jsonld" data={articleLd} /> : null}
      {crumbsLd ? <JsonLd id="article-breadcrumb-jsonld" data={crumbsLd} /> : null}

      <article>
        <section className="border-b border-border/70 pt-10 sm:pt-12">
          <Container className="pb-10 sm:pb-12">
            <Breadcrumbs
              items={[
                { label: 'Главная', href: '/' },
                { label: 'Блог', href: '/blog' },
                { label: String(item.title || 'Статья') },
              ]}
            />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-label text-accent">
                    {categoryTitle || 'Статья'}
                  </p>
                  {isDemo ? <DemoBadge /> : null}
                </div>
                <h1 className="mt-4 text-display">{String(item.title)}</h1>
                {typeof item.excerpt === 'string' ? (
                  <p className="mt-5 text-body">{item.excerpt}</p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-4 text-caption">
                  <span>{author}</span>
                  {publishedAt ? (
                    <time dateTime={publishedAt}>
                      {new Date(publishedAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  ) : null}
                  {readingTime(content) ? (
                    <span>{readingTime(content)}</span>
                  ) : null}
                </div>
              </div>

              <MediaImage
                media={resolveArticleCover(item)}
                alt={String(item.title || 'Обложка статьи')}
                fill
                className="aspect-[16/10] rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Container>
        </section>

        <section className="section-padding">
          <Container>
            <div className="prose-clinic whitespace-pre-line">{content}</div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#appointment"
                className={cn(buttonVariants({ size: 'lg' }))}
              >
                Записаться на консультацию
              </Link>
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                Все статьи
              </Link>
            </div>
          </Container>
        </section>
      </article>

      <CtaBanner />
    </>
  )
}
