import { revalidatePath } from 'next/cache'

const STATIC_PATHS = [
  '/',
  '/about',
  '/contacts',
  '/services',
  '/doctors',
  '/prices',
  '/cases',
  '/blog',
  '/privacy',
  '/terms',
] as const

const DYNAMIC_PATHS = [
  '/services/[slug]',
  '/doctors/[slug]',
  '/blog/[slug]',
  '/cases/[slug]',
] as const

/** Сбрасывает ISR-кеш публичных страниц сайта. */
export function revalidateSiteCache(): void {
  for (const path of STATIC_PATHS) {
    revalidatePath(path)
  }

  for (const path of DYNAMIC_PATHS) {
    revalidatePath(path, 'page')
  }

  revalidatePath('/', 'layout')
}
