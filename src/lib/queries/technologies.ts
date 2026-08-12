import { getPayloadClient } from '@/lib/payload'

export type TechnologyDoc = Record<string, unknown> & {
  id: string | number
  title?: string
  slug?: string
  description?: string
  icon?: string
  image?: unknown
  order?: number | null
}

export async function getTechnologies(options?: {
  limit?: number
  depth?: number
}): Promise<TechnologyDoc[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'technologies',
    depth: options?.depth ?? 1,
    limit: options?.limit ?? 50,
    sort: 'order',
  })

  return result.docs as unknown as TechnologyDoc[]
}
