import { getPayloadClient } from '@/lib/payload'

export type AdvantageDoc = Record<string, unknown> & {
  id: string | number
  title?: string
  description?: string
  icon?: string
  order?: number | null
}

export async function getAdvantages(options?: {
  limit?: number
}): Promise<AdvantageDoc[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'clinic-advantages',
    depth: 0,
    limit: options?.limit ?? 50,
    sort: 'order',
  })

  return result.docs as unknown as AdvantageDoc[]
}
