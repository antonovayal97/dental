import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'

export type ArticleDoc = Record<string, unknown> & {
  id: string | number
  title?: string
  slug?: string
  excerpt?: string
  content?: string
  coverImage?: unknown
  author?: string | null
  category?: unknown
  publishedAt?: string | null
  _status?: string
}

export type ArticleCategoryDoc = Record<string, unknown> & {
  id: string | number
  title?: string
  slug?: string
  description?: string | null
}

const publishedWhere: Where = {
  _status: {
    equals: 'published',
  },
}

export async function getArticles(options?: {
  limit?: number
  categorySlug?: string
  depth?: number
}): Promise<ArticleDoc[]> {
  const payload = await getPayloadClient()

  let categoryId: string | number | null = null

  if (options?.categorySlug) {
    const categories = await payload.find({
      collection: 'article-categories',
      depth: 0,
      limit: 1,
      where: {
        slug: {
          equals: options.categorySlug,
        },
      },
    })
    categoryId = categories.docs[0]?.id ?? null
    if (categoryId == null) return []
  }

  const where: Where = {
    and: [
      publishedWhere,
      ...(categoryId != null
        ? [
            {
              category: {
                equals: categoryId,
              },
            } satisfies Where,
          ]
        : []),
    ],
  }

  const result = await payload.find({
    collection: 'articles',
    draft: false,
    depth: options?.depth ?? 1,
    limit: options?.limit ?? 24,
    sort: '-publishedAt',
    where,
  })

  return result.docs as unknown as ArticleDoc[]
}

export async function getArticleBySlug(
  slug: string,
  depth = 1,
): Promise<ArticleDoc | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    draft: false,
    depth,
    limit: 1,
    where: {
      and: [
        publishedWhere,
        {
          slug: {
            equals: slug,
          },
        },
      ],
    },
  })

  return (result.docs[0] as unknown as ArticleDoc | undefined) ?? null
}

export async function getArticleCategories(options?: {
  limit?: number
}): Promise<ArticleCategoryDoc[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'article-categories',
    depth: 0,
    limit: options?.limit ?? 50,
    sort: 'title',
  })

  return result.docs as unknown as ArticleCategoryDoc[]
}
