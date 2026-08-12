import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'

export type CaseDoc = Record<string, unknown> & {
  id: string | number
  title?: string
  slug?: string
  description?: string
  service?: unknown
  doctor?: unknown
  beforeImage?: unknown
  afterImage?: unknown
  duration?: string | null
  disclaimer?: string | null
  _status?: string
}

const publishedWhere: Where = {
  _status: {
    equals: 'published',
  },
}

export async function getCases(options?: {
  limit?: number
  depth?: number
}): Promise<CaseDoc[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'cases',
    draft: false,
    depth: options?.depth ?? 1,
    limit: options?.limit ?? 24,
    sort: '-createdAt',
    where: publishedWhere,
  })

  return result.docs as unknown as CaseDoc[]
}

export async function getCaseBySlug(
  slug: string,
  depth = 1,
): Promise<CaseDoc | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'cases',
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

  return (result.docs[0] as unknown as CaseDoc | undefined) ?? null
}
