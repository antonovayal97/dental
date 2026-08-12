import type { MetadataRoute } from 'next'

import {
  getArticles,
  getCases,
  getDoctors,
  getServices,
} from '@/lib/queries'
import { absoluteUrl } from '@/lib/utils'

const STATIC_ROUTES = [
  '/',
  '/services',
  '/doctors',
  '/cases',
  '/prices',
  '/about',
  '/blog',
  '/contacts',
  '/privacy',
  '/terms',
] as const

async function safeSlugs(
  loader: () => Promise<Array<{ slug?: string }>>,
): Promise<string[]> {
  try {
    const docs = await loader()
    return docs
      .map((doc) => doc.slug)
      .filter((slug): slug is string => Boolean(slug))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [serviceSlugs, doctorSlugs, caseSlugs, articleSlugs] = await Promise.all([
    safeSlugs(() => getServices({ limit: 200, depth: 0 })),
    safeSlugs(() => getDoctors({ limit: 100, depth: 0 })),
    safeSlugs(() => getCases({ limit: 100, depth: 0 })),
    safeSlugs(() => getArticles({ limit: 100, depth: 0 })),
  ])

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...serviceSlugs.map((slug) => ({
      url: absoluteUrl(`/services/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...doctorSlugs.map((slug) => ({
      url: absoluteUrl(`/doctors/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...caseSlugs.map((slug) => ({
      url: absoluteUrl(`/cases/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...articleSlugs.map((slug) => ({
      url: absoluteUrl(`/blog/${slug}`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticEntries, ...dynamicEntries]
}
