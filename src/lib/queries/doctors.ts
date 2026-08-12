import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'

export type DoctorDoc = Record<string, unknown> & {
  id: string | number
  name?: string
  slug?: string
  position?: string
  specialization?: string
  experienceYears?: number | null
  photo?: unknown
  services?: unknown
  _status?: string
}

const publishedWhere: Where = {
  _status: {
    equals: 'published',
  },
}

export async function getDoctors(options?: {
  limit?: number
  depth?: number
}): Promise<DoctorDoc[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'doctors',
    draft: false,
    depth: options?.depth ?? 1,
    limit: options?.limit ?? 50,
    sort: 'name',
    where: publishedWhere,
  })

  return result.docs as unknown as DoctorDoc[]
}

export async function getDoctorBySlug(
  slug: string,
  depth = 1,
): Promise<DoctorDoc | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'doctors',
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

  return (result.docs[0] as unknown as DoctorDoc | undefined) ?? null
}
