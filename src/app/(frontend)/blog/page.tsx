import Link from 'next/link'

import { BlogPreview } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import { resolveArticleCover, safeGetArticles } from '@/lib/content'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

export async function generateMetadata() {
  return buildMetadata({
    path: '/blog',
    title: 'Блог',
    description:
      'Статьи для пациентов: подготовка к приёму, профилактика и этапы лечения.',
  })
}

export default async function BlogPage() {
  const { items, isDemo } = await safeGetArticles(24)

  return (
    <>
      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-10 sm:pb-12">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Блог' },
            ]}
          />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Материалы"
              title="Блог для пациентов"
              description="Короткие и понятные тексты о лечении, профилактике и подготовке к визиту."
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

      <BlogPreview
        articles={items.map((article) => ({
          id: String(article.id),
          title: String(article.title || 'Статья'),
          slug: String(article.slug || article.id),
          excerpt: typeof article.excerpt === 'string' ? article.excerpt : null,
          category:
            article.category && typeof article.category === 'object'
              ? (article.category as { title?: string; slug?: string })
              : null,
          author: typeof article.author === 'string' ? article.author : null,
          publishedAt:
            typeof article.publishedAt === 'string'
              ? article.publishedAt
              : null,
          coverImage: resolveArticleCover(article),
          isDemo: Boolean(article.isDemo) || isDemo,
        }))}
        className="!pt-10"
        showViewAll={false}
      />
    </>
  )
}
