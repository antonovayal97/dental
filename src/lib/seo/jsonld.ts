import { absoluteUrl } from '@/lib/utils'

type JsonLd = Record<string, unknown>

type ContactSettings = {
  clinicName?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  city?: string | null
  district?: string | null
  workingHours?: Array<{ day?: string | null; hours?: string | null }> | null
  logoUrl?: string | null
  sameAs?: string[]
  url?: string | null
  description?: string | null
  isDemo?: boolean
}

type BreadcrumbItem = {
  name: string
  path: string
}

type ArticleInput = {
  title: string
  description?: string | null
  path: string
  imageUrl?: string | null
  datePublished?: string | null
  dateModified?: string | null
  authorName?: string | null
}

type FAQItem = {
  question: string
  answer: string
}

function compact<T extends JsonLd>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => {
      if (entry == null) return false
      if (typeof entry === 'string' && entry.trim() === '') return false
      if (Array.isArray(entry) && entry.length === 0) return false
      return true
    }),
  ) as T
}

/**
 * Строит JSON-LD только из переданных настроек.
 * Не добавляет лицензии, рейтинги и другие недостоверные поля.
 * При isDemo возвращает null — демо-NAP нельзя отдавать поисковикам.
 */
export function organizationJsonLd(settings: ContactSettings): JsonLd | null {
  if (settings.isDemo) return null
  if (!settings.clinicName) return null

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.clinicName,
    url: settings.url || absoluteUrl('/'),
    logo: settings.logoUrl || undefined,
    email: settings.email || undefined,
    telephone: settings.phone || undefined,
    description: settings.description || undefined,
    address: settings.address
      ? compact({
          '@type': 'PostalAddress',
          streetAddress: settings.address,
          addressLocality: settings.city || undefined,
          addressCountry: 'RU',
        })
      : undefined,
    sameAs: settings.sameAs?.filter(Boolean),
  })
}

export function dentistLocalBusinessJsonLd(
  settings: ContactSettings,
): JsonLd | null {
  if (settings.isDemo) return null
  if (!settings.clinicName || !settings.address) return null

  return compact({
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness'],
    name: settings.clinicName,
    url: settings.url || absoluteUrl('/'),
    image: settings.logoUrl || undefined,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    description: settings.description || undefined,
    address: compact({
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: settings.city || undefined,
      addressCountry: 'RU',
    }),
    sameAs: settings.sameAs?.filter(Boolean),
  })
}

export function websiteJsonLd(input: {
  siteName: string
  url?: string
  description?: string | null
  isDemo?: boolean
}): JsonLd | null {
  if (!input.siteName) return null

  const url = input.url || absoluteUrl('/')

  return compact({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: input.siteName,
    url,
    description: input.isDemo ? undefined : input.description || undefined,
  })
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd | null {
  if (!items.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function articleJsonLd(article: ArticleInput & { isDemo?: boolean }): JsonLd | null {
  if (article.isDemo) return null
  if (!article.title || !article.path) return null

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description || undefined,
    image: article.imageUrl || undefined,
    datePublished: article.datePublished || undefined,
    dateModified: article.dateModified || article.datePublished || undefined,
    author: article.authorName
      ? {
          '@type': 'Person',
          name: article.authorName,
        }
      : undefined,
    mainEntityOfPage: absoluteUrl(article.path),
  })
}

export function faqPageJsonLd(
  items: FAQItem[],
  options?: { isDemo?: boolean },
): JsonLd | null {
  if (options?.isDemo) return null

  const valid = items.filter(
    (item) => item.question?.trim() && item.answer?.trim(),
  )
  if (!valid.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function jsonLdScript(data: JsonLd | JsonLd[] | null | undefined) {
  if (!data) return null
  return JSON.stringify(data)
}
