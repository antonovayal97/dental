import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'

export type ServiceDoc = Record<string, unknown> & {
  id: string | number
  title?: string
  slug?: string
  shortDescription?: string
  description?: string
  priceFrom?: number | null
  category?: unknown
  relatedServices?: unknown
  _status?: string
}

export type ServiceCategoryDoc = Record<string, unknown> & {
  id: string | number
  title?: string
  slug?: string
  description?: string | null
  order?: number | null
}

const publishedWhere: Where = {
  _status: {
    equals: 'published',
  },
}

export async function getServices(options?: {
  limit?: number
  categorySlug?: string
  depth?: number
}): Promise<ServiceDoc[]> {
  const payload = await getPayloadClient()
  const limit = options?.limit ?? 50
  const depth = options?.depth ?? 1

  let categoryId: string | number | null = null

  if (options?.categorySlug) {
    const categories = await payload.find({
      collection: 'service-categories',
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
    collection: 'services',
    draft: false,
    depth,
    limit,
    sort: '-createdAt',
    where,
  })

  return result.docs as unknown as ServiceDoc[]
}

export async function getServiceBySlug(
  slug: string,
  depth = 1,
): Promise<ServiceDoc | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
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

  return (result.docs[0] as unknown as ServiceDoc | undefined) ?? null
}

export async function getServiceCategories(options?: {
  limit?: number
}): Promise<ServiceCategoryDoc[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'service-categories',
    depth: 0,
    limit: options?.limit ?? 50,
    sort: 'order',
  })

  return result.docs as unknown as ServiceCategoryDoc[]
}

export async function getRelatedServices(
  service: ServiceDoc | { id: string | number; relatedServices?: unknown; category?: unknown },
  options?: { limit?: number; depth?: number },
): Promise<ServiceDoc[]> {
  const limit = options?.limit ?? 4
  const depth = options?.depth ?? 1
  const related = service.relatedServices

  if (Array.isArray(related) && related.length > 0) {
    const docs = related
      .filter((item): item is ServiceDoc => {
        if (!item || typeof item !== 'object') return false
        const status = (item as unknown as ServiceDoc)._status
        return !status || status === 'published'
      })
      .slice(0, limit)

    if (docs.length > 0) return docs
  }

  const payload = await getPayloadClient()
  const categoryValue = 'category' in service ? service.category : undefined
  const categoryId =
    typeof categoryValue === 'object' &&
    categoryValue !== null &&
    'id' in categoryValue
      ? (categoryValue as { id: string | number }).id
      : typeof categoryValue === 'string' || typeof categoryValue === 'number'
        ? categoryValue
        : null

  const result = await payload.find({
    collection: 'services',
    draft: false,
    depth,
    limit,
    sort: '-createdAt',
    where: {
      and: [
        publishedWhere,
        {
          id: {
            not_equals: service.id,
          },
        },
        ...(categoryId
          ? [
              {
                category: {
                  equals: categoryId,
                },
              } satisfies Where,
            ]
          : []),
      ],
    },
  })

  return result.docs as unknown as ServiceDoc[]
}
