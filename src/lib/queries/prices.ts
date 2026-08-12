import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'

export type PriceDoc = Record<string, unknown> & {
  id: string | number
  title?: string
  category?: unknown
  service?: unknown
  priceFrom?: number
  unit?: string | null
  order?: number | null
  isFeatured?: boolean | null
}

export type PriceCategoryGroup = {
  categoryId: string | number | null
  categoryTitle: string
  categorySlug: string | null
  items: PriceDoc[]
}

function getCategoryMeta(category: unknown): {
  id: string | number | null
  title: string
  slug: string | null
} {
  if (category && typeof category === 'object') {
    const doc = category as unknown as Record<string, unknown>
    return {
      id:
        typeof doc.id === 'string' || typeof doc.id === 'number' ? doc.id : null,
      title: typeof doc.title === 'string' ? doc.title : 'Без категории',
      slug: typeof doc.slug === 'string' ? doc.slug : null,
    }
  }

  if (typeof category === 'string' || typeof category === 'number') {
    return {
      id: category,
      title: 'Категория',
      slug: null,
    }
  }

  return {
    id: null,
    title: 'Без категории',
    slug: null,
  }
}

export async function getPrices(options?: {
  limit?: number
  categoryId?: string | number
  featuredOnly?: boolean
  depth?: number
}): Promise<PriceDoc[]> {
  const payload = await getPayloadClient()
  const filters: Where[] = []

  if (options?.categoryId != null) {
    filters.push({
      category: {
        equals: options.categoryId,
      },
    })
  }

  if (options?.featuredOnly) {
    filters.push({
      isFeatured: {
        equals: true,
      },
    })
  }

  const result = await payload.find({
    collection: 'prices',
    depth: options?.depth ?? 1,
    limit: options?.limit ?? 100,
    sort: 'order',
    where: filters.length > 0 ? { and: filters } : undefined,
  })

  return result.docs as unknown as PriceDoc[]
}

export async function getPricesGroupedByCategory(options?: {
  limit?: number
  depth?: number
}): Promise<PriceCategoryGroup[]> {
  const prices = await getPrices({
    limit: options?.limit ?? 100,
    depth: options?.depth ?? 1,
  })

  const groups = new Map<string, PriceCategoryGroup>()

  for (const price of prices) {
    const meta = getCategoryMeta(price.category)
    const key = String(meta.id ?? meta.slug ?? meta.title)

    const existing = groups.get(key)
    if (existing) {
      existing.items.push(price)
    } else {
      groups.set(key, {
        categoryId: meta.id,
        categoryTitle: meta.title,
        categorySlug: meta.slug,
        items: [price],
      })
    }
  }

  return Array.from(groups.values())
}
