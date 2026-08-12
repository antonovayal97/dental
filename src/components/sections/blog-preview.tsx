import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { DemoBadge } from '@/components/shared/demo-badge'
import {
  MediaImage,
  type MediaImageSource,
} from '@/components/shared/media-image'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { DEMO_ARTICLES } from '@/lib/demo-content'
import { cn } from '@/lib/utils'

export type BlogPreviewItem = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  category?: { title?: string | null; slug?: string | null } | null
  author?: string | null
  publishedAt?: string | null
  coverImage?: MediaImageSource | null
  isDemo?: boolean
}

export type BlogPreviewProps = {
  articles?: BlogPreviewItem[] | null
  eyebrow?: string
  title?: string
  description?: string
  viewAllHref?: string
  className?: string
}

const DEMO_ITEMS: BlogPreviewItem[] = DEMO_ARTICLES.map((article) => ({
  id: article.id,
  title: article.title,
  slug: article.slug,
  excerpt: article.excerpt,
  category: article.category,
  author: article.author,
  publishedAt: article.publishedAt,
  coverImage: article.coverImage,
  isDemo: article.isDemo,
}))

export function BlogPreview({
  articles,
  eyebrow = 'Блог',
  title = 'Полезные материалы для пациентов',
  description = 'Короткие статьи о подготовке к приёму, профилактике и этапах лечения.',
  viewAllHref = '/blog',
  className,
}: BlogPreviewProps) {
  const items =
    articles === undefined || articles === null ? DEMO_ITEMS : articles
  const usingDemo = articles == null || items.some((item) => item.isDemo)

  return (
    <section
      className={cn('section-padding', className)}
      aria-labelledby="blog-preview-heading"
    >
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            <span id="blog-preview-heading" className="sr-only">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {usingDemo ? <DemoBadge /> : null}
            <Link
              href={viewAllHref}
              className={cn(buttonVariants({ variant: 'outline' }), 'shrink-0')}
            >
              Все статьи
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyState
            className="mt-12"
            title="Статьи скоро появятся"
            description="Мы готовим полезные материалы для пациентов."
          />
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((article) => (
              <div key={article.id}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
                    <MediaImage
                      media={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="aspect-[16/10] rounded-none border-b border-border/70"
                      imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <CardHeader>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        {article.category?.title ? (
                          <span className="text-label text-[0.65rem]">
                            {article.category.title}
                          </span>
                        ) : null}
                        {article.isDemo ? <DemoBadge /> : null}
                      </div>
                      <CardTitle className="transition-colors group-hover:text-accent">
                        {article.title}
                      </CardTitle>
                      {article.excerpt ? (
                        <CardDescription className="line-clamp-3">
                          {article.excerpt}
                        </CardDescription>
                      ) : null}
                    </CardHeader>
                    <CardContent className="flex items-center justify-between gap-3">
                      <p className="text-caption">
                        {article.publishedAt
                          ? formatArticleDate(article.publishedAt)
                          : 'Скоро'}
                      </p>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

function formatArticleDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
