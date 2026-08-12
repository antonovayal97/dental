import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'

export type FAQDoc = Record<string, unknown> & {
  id: string | number
  question?: string
  answer?: string
  category?: string
  order?: number | null
  relatedService?: unknown
}

export async function getFAQs(options?: {
  limit?: number
  category?: string
  serviceId?: string | number
  depth?: number
}): Promise<FAQDoc[]> {
  const payload = await getPayloadClient()
  const filters: Where[] = []

  if (options?.category) {
    filters.push({
      category: {
        equals: options.category,
      },
    })
  }

  if (options?.serviceId != null) {
    filters.push({
      relatedService: {
        equals: options.serviceId,
      },
    })
  }

  const result = await payload.find({
    collection: 'faqs',
    depth: options?.depth ?? 0,
    limit: options?.limit ?? 50,
    sort: 'order',
    where: filters.length > 0 ? { and: filters } : undefined,
  })

  return result.docs as unknown as FAQDoc[]
}
