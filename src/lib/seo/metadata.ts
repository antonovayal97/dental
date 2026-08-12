import type { Metadata } from 'next'

import { DEMO_SEO } from '@/lib/demo-content'
import { getSEOSettings, getSiteSettings } from '@/lib/queries/settings'
import { absoluteUrl, getMediaUrl } from '@/lib/utils'

type BuildMetadataInput = {
  title?: string | null
  description?: string | null
  path?: string
  canonical?: string | null
  image?: string | { url?: string | null } | null
  noIndex?: boolean
}

async function getSiteDefaults() {
  const [seo, site] = await Promise.all([getSEOSettings(), getSiteSettings()])

  const siteName = seo?.siteName || DEMO_SEO.siteName
  const defaultTitle =
    seo?.defaultTitle ||
    site?.defaultSEO?.title ||
    DEMO_SEO.defaultTitle
  const defaultDescription =
    seo?.defaultDescription ||
    site?.defaultSEO?.description ||
    DEMO_SEO.defaultDescription
  const titleTemplate = seo?.titleTemplate || DEMO_SEO.titleTemplate
  const robotsIndex = seo?.robotsIndex ?? DEMO_SEO.robotsIndex
  const ogImage = getMediaUrl(
    (site?.defaultSEO?.ogImage as { url?: string | null } | null) ?? null,
  )
  const favicon = getMediaUrl(
    (site?.favicon as { url?: string | null } | null) ?? null,
  )

  return {
    siteName,
    defaultTitle,
    defaultDescription,
    titleTemplate,
    robotsIndex,
    ogImage,
    favicon,
    googleSiteVerification: seo?.googleSiteVerification ?? undefined,
  }
}

function applyTitleTemplate(title: string, template: string, siteName: string) {
  if (!template.includes('%s')) return title
  return template.replace('%s', title).replace('{{siteName}}', siteName)
}

export async function buildMetadata({
  title,
  description,
  path = '/',
  canonical,
  image,
  noIndex,
}: BuildMetadataInput = {}): Promise<Metadata> {
  const defaults = await getSiteDefaults()
  const pageTitle = title?.trim() || defaults.defaultTitle
  const fullTitle =
    title?.trim()
      ? applyTitleTemplate(pageTitle, defaults.titleTemplate, defaults.siteName)
      : pageTitle
  const pageDescription =
    description?.trim() || defaults.defaultDescription
  const canonicalUrl = canonical?.trim() || absoluteUrl(path)
  const imageUrl =
    getMediaUrl(image) ||
    defaults.ogImage ||
    absoluteUrl('/images/og-default.jpg')
  const shouldIndex = noIndex === true ? false : Boolean(defaults.robotsIndex)

  return {
    title: fullTitle,
    description: pageDescription,
    metadataBase: new URL(absoluteUrl('/')),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: false },
    icons: defaults.favicon
      ? { icon: defaults.favicon }
      : undefined,
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: canonicalUrl,
      siteName: defaults.siteName,
      title: fullTitle,
      description: pageDescription,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: fullTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: pageDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
    verification: defaults.googleSiteVerification
      ? { google: defaults.googleSiteVerification }
      : undefined,
  }
}
