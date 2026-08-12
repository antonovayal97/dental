import { getPayloadClient } from '@/lib/payload'

export type PageDoc = Record<string, unknown> & {
  id: string | number
  title?: string
  slug?: string
  content?: string
  seo?: Record<string, unknown> | null
}

export async function getPageBySlug(
  slug: string,
  depth = 1,
): Promise<PageDoc | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    depth,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs[0] as unknown as PageDoc | undefined) ?? null
}
