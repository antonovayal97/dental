import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value?: number | null, currency = '₽'): string {
  if (value == null) return 'По запросу'
  return `от ${new Intl.NumberFormat('ru-RU').format(value)} ${currency}`
}

export function formatPhone(phone?: string | null): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    const local = digits.slice(1)
    return `+7 (${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 8)}-${local.slice(8)}`
  }
  return phone
}

export function phoneHref(phone?: string | null): string {
  if (!phone) return '#'
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function absoluteUrl(path = '/'): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  if (path.startsWith('http')) return path
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

export function getMediaUrl(
  media?: { url?: string | null } | string | null,
): string | null {
  if (!media) return null
  const raw = typeof media === 'string' ? media : media.url
  if (!raw) return null
  return toRelativeMediaUrl(raw)
}

/** next/image fails on absolute same-origin URLs in some setups — keep paths relative */
export function toRelativeMediaUrl(url: string): string {
  const value = url.trim()
  if (!value) return value
  if (value.startsWith('/')) return value

  try {
    const parsed = new URL(value)
    if (
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1' ||
      (process.env.NEXT_PUBLIC_SITE_URL &&
        parsed.origin === new URL(process.env.NEXT_PUBLIC_SITE_URL).origin)
    ) {
      return `${parsed.pathname}${parsed.search}`
    }
  } catch {
    // keep original
  }

  return value
}

export function readingTime(text?: string | null): string | null {
  if (!text?.trim()) return null
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 180))
  return `${minutes} мин`
}

/** Allow only safe CMS hrefs (relative paths, http(s), mailto, tel) */
export function sanitizeHref(href?: string | null): string | null {
  if (!href) return null
  const value = href.trim()
  if (!value) return null
  if (value.startsWith('/') && !value.startsWith('//')) return value
  if (value.startsWith('#')) return value
  try {
    const url = new URL(value)
    if (['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) {
      return value
    }
  } catch {
    return null
  }
  return null
}
