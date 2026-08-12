import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'

export type ReviewDoc = Record<string, unknown> & {
  id: string | number
  name?: string
  text?: string
  rating?: number
  date?: string
  isFeatured?: boolean | null
  isDemo?: boolean | null
  service?: unknown
  doctor?: unknown
}

export type AggregateRating = {
  ratingValue: number
  reviewCount: number
  bestRating: 5
  worstRating: 1
}

export async function getReviews(options?: {
  limit?: number
  featuredOnly?: boolean
  depth?: number
}): Promise<ReviewDoc[]> {
  const payload = await getPayloadClient()
  const where: Where | undefined = options?.featuredOnly
    ? {
        isFeatured: {
          equals: true,
        },
      }
    : undefined

  const result = await payload.find({
    collection: 'reviews',
    depth: options?.depth ?? 1,
    limit: options?.limit ?? 50,
    sort: '-date',
    where,
  })

  return result.docs as unknown as ReviewDoc[]
}

export async function getFeaturedReviews(limit = 6): Promise<ReviewDoc[]> {
  return getReviews({ limit, featuredOnly: true, depth: 1 })
}

export async function getAggregateRating(): Promise<AggregateRating | null> {
  const reviews = await getReviews({ limit: 200, depth: 0 })
  const ratings = reviews
    .map((review) => review.rating)
    .filter((value): value is number => typeof value === 'number' && value > 0)

  if (ratings.length === 0) return null

  const sum = ratings.reduce((acc, value) => acc + value, 0)

  return {
    ratingValue: Math.round((sum / ratings.length) * 10) / 10,
    reviewCount: ratings.length,
    bestRating: 5,
    worstRating: 1,
  }
}
