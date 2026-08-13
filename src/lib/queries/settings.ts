import { cache } from 'react'

import { getPayloadClient } from '@/lib/payload'

export type SiteSettingsDoc = Record<string, unknown> & {
  clinicName?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  district?: string | null
  ctaPrimaryText?: string | null
  ctaSecondaryText?: string | null
  workingHours?: Array<{ day?: string; hours?: string }> | null
  social?: Record<string, string | null | undefined> | null
  trustStats?: Array<{ label?: string; value?: string }> | null
  defaultSEO?: {
    title?: string | null
    description?: string | null
    ogImage?: unknown
  } | null
  logo?: unknown
  favicon?: unknown
  mapEmbedUrl?: string | null
}

export type HeaderSettingsDoc = Record<string, unknown> & {
  showPhone?: boolean | null
  ctaText?: string | null
  navLinks?: Array<{ label?: string; href?: string }> | null
}

export type FooterSettingsDoc = Record<string, unknown> & {
  description?: string | null
  copyright?: string | null
  columns?: Array<{
    title?: string
    links?: Array<{ label?: string; href?: string }> | null
  }> | null
}

export type SEOSettingsDoc = Record<string, unknown> & {
  siteName?: string
  defaultTitle?: string
  titleTemplate?: string | null
  defaultDescription?: string
  robotsIndex?: boolean | null
  googleSiteVerification?: string | null
}

export type HomepageSectionHeading = {
  enabled?: boolean | null
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  limit?: number | null
  disclaimer?: string | null
}

export type HomepageSettingsDoc = Record<string, unknown> & {
  seo?: {
    title?: string | null
    description?: string | null
  } | null
  hero?: {
    enabled?: boolean | null
    eyebrow?: string | null
    title?: string | null
    subtitle?: string | null
    primaryCtaLabel?: string | null
    secondaryCtaLabel?: string | null
    secondaryCtaHref?: string | null
    image?: unknown
    imageAlt?: string | null
    statsLabel?: string | null
  } | null
  trustBar?: {
    enabled?: boolean | null
    items?: Array<{
      id?: string
      icon?: string | null
      title?: string | null
      description?: string | null
    }> | null
  } | null
  services?: HomepageSectionHeading | null
  whyUs?: HomepageSectionHeading | null
  doctors?: HomepageSectionHeading | null
  technology?: (HomepageSectionHeading & {
    items?: Array<{
      id?: string
      title?: string | null
      description?: string | null
      icon?: string | null
      image?: unknown
    }> | null
  }) | null
  cases?: HomepageSectionHeading | null
  reviews?: HomepageSectionHeading | null
  about?: {
    enabled?: boolean | null
    eyebrow?: string | null
    title?: string | null
    blurb?: string | null
    image?: unknown
    ctaLabel?: string | null
    ctaHref?: string | null
  } | null
  faq?: HomepageSectionHeading | null
  blog?: HomepageSectionHeading | null
  cta?: {
    enabled?: boolean | null
    eyebrow?: string | null
    title?: string | null
    description?: string | null
    benefits?: Array<{ id?: string; text?: string | null }> | null
  } | null
  contacts?: {
    enabled?: boolean | null
    eyebrow?: string | null
    description?: string | null
    ctaLabel?: string | null
  } | null
}

export const getSiteSettings = cache(async (): Promise<SiteSettingsDoc | null> => {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })
    return doc as unknown as SiteSettingsDoc
  } catch {
    return null
  }
})

export const getHeaderSettings = cache(async (): Promise<HeaderSettingsDoc | null> => {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'header-settings',
      depth: 0,
    })
    return doc as unknown as HeaderSettingsDoc
  } catch {
    return null
  }
})

export const getFooterSettings = cache(async (): Promise<FooterSettingsDoc | null> => {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'footer-settings',
      depth: 0,
    })
    return doc as unknown as FooterSettingsDoc
  } catch {
    return null
  }
})

export const getSEOSettings = cache(async (): Promise<SEOSettingsDoc | null> => {
  try {
    const payload = await getPayloadClient()
    const doc = await payload.findGlobal({
      slug: 'seo-settings',
      depth: 0,
    })
    return doc as unknown as SEOSettingsDoc
  } catch {
    return null
  }
})

export const getHomepageSettings = cache(
  async (): Promise<HomepageSettingsDoc | null> => {
    try {
      const payload = await getPayloadClient()
      const doc = await payload.findGlobal({
        slug: 'homepage-settings',
        depth: 1,
      })
      return doc as unknown as HomepageSettingsDoc
    } catch {
      return null
    }
  },
)
