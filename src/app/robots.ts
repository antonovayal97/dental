import type { MetadataRoute } from 'next'

import { getSEOSettings } from '@/lib/queries/settings'
import { absoluteUrl } from '@/lib/utils'

export default async function robots(): Promise<MetadataRoute.Robots> {
  let allowIndex = false

  try {
    const seo = await getSEOSettings()
    allowIndex = Boolean(seo?.robotsIndex)
  } catch {
    allowIndex = false
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: allowIndex ? '/' : undefined,
        disallow: allowIndex
          ? ['/admin', '/api']
          : ['/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/').replace(/\/$/, ''),
  }
}
