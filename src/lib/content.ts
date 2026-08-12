/**
 * Безопасные обёртки над CMS-запросами с fallback на демо-контент.
 * Страницы не должны падать белым экраном при недоступной БД.
 */

import {
  DEMO_ADVANTAGES,
  DEMO_ARTICLES,
  DEMO_CLINIC,
  DEMO_DISCLAIMER,
  DEMO_DOCTORS,
  DEMO_FAQS,
  DEMO_IMAGES,
  DEMO_PRICES,
  DEMO_REVIEWS,
  DEMO_SERVICES,
  DEMO_TECHNOLOGIES,
  DEMO_TRUST_STATS,
  DEMO_ABOUT,
} from '@/lib/demo-content'
import {
  getAdvantages,
  getAggregateRating,
  getArticleBySlug,
  getArticles,
  getCaseBySlug,
  getCases,
  getDoctorBySlug,
  getDoctors,
  getFAQs,
  getFeaturedReviews,
  getHomepageSettings,
  getPageBySlug,
  getPrices,
  getRelatedServices,
  getReviews,
  getServiceBySlug,
  getServiceCategories,
  getServices,
  getSiteSettings,
  getTechnologies,
  type AdvantageDoc,
  type AggregateRating,
  type ArticleDoc,
  type CaseDoc,
  type DoctorDoc,
  type FAQDoc,
  type HomepageSettingsDoc,
  type PageDoc,
  type PriceDoc,
  type ReviewDoc,
  type ServiceCategoryDoc,
  type ServiceDoc,
  type SiteSettingsDoc,
  type TechnologyDoc,
} from '@/lib/queries'
import { toRelativeMediaUrl } from '@/lib/utils'

export { DEMO_DISCLAIMER }

export async function safeGetSiteSettings(): Promise<{
  data: SiteSettingsDoc
  isDemo: boolean
}> {
  try {
    const data = await getSiteSettings()
    if (data?.clinicName) {
      return { data, isDemo: false }
    }
  } catch {
    // fall through
  }

  return {
    data: {
      clinicName: DEMO_CLINIC.clinicName,
      phone: DEMO_CLINIC.phone,
      email: DEMO_CLINIC.email,
      address: DEMO_CLINIC.address,
      city: DEMO_CLINIC.city,
      district: DEMO_CLINIC.district,
      ctaPrimaryText: DEMO_CLINIC.ctaPrimaryText,
      ctaSecondaryText: DEMO_CLINIC.ctaSecondaryText,
      workingHours: [...DEMO_CLINIC.workingHours],
      social: { ...DEMO_CLINIC.social },
      trustStats: DEMO_TRUST_STATS.map((item) => ({
        label: item.label,
        value: item.value,
      })),
      defaultSEO: { ...DEMO_CLINIC.defaultSEO },
    },
    isDemo: true,
  }
}

export async function safeGetServices(limit = 50): Promise<{
  items: Array<ServiceDoc & { isDemo?: boolean }>
  isDemo: boolean
}> {
  try {
    const items = await getServices({ limit })
    if (items.length > 0) return { items, isDemo: false }
  } catch {
    // fall through
  }

  return {
    items: DEMO_SERVICES.map((service) => ({ ...service })),
    isDemo: true,
  }
}

export {
  type ServiceOption,
  getDefaultServiceOptions,
  mapServiceOptions,
} from '@/lib/forms/service-options'

export async function safeGetServiceBySlug(slug: string): Promise<{
  item: (ServiceDoc & { isDemo?: boolean }) | null
  isDemo: boolean
}> {
  try {
    const item = await getServiceBySlug(slug)
    if (item) return { item, isDemo: false }
  } catch {
    // fall through
  }

  const demo = DEMO_SERVICES.find((service) => service.slug === slug)
  return {
    item: demo
      ? {
          ...demo,
          whenNeeded: [
            { item: 'Есть дискомфорт или эстетический запрос' },
            { item: 'Нужен понятный план лечения' },
            { item: 'Требуется диагностика и консультация' },
          ],
          process:
            'На консультации врач оценивает ситуацию, объясняет варианты и этапы. Далее согласуем план, сроки и ориентир по стоимости.',
          stages: [
            {
              title: 'Диагностика',
              description: 'Осмотр и при необходимости снимки.',
            },
            {
              title: 'План лечения',
              description: 'Согласуем этапы и ожидания по результату.',
            },
            {
              title: 'Лечение',
              description: 'Работаем аккуратно и по утверждённому плану.',
            },
          ],
          priceNote: demo.priceNote,
        }
      : null,
    isDemo: Boolean(demo),
  }
}

export async function safeGetServiceCategories(): Promise<{
  items: ServiceCategoryDoc[]
  isDemo: boolean
}> {
  try {
    const items = await getServiceCategories()
    if (items.length > 0) return { items, isDemo: false }
  } catch {
    // fall through
  }

  return {
    items: DEMO_SERVICES.map((service, index) => ({
      id: `demo-cat-${service.slug}`,
      title: service.category.title,
      slug: service.category.slug,
      description: service.shortDescription,
      order: index,
    })),
    isDemo: true,
  }
}

export async function safeGetRelatedServices(
  service: ServiceDoc,
  limit = 4,
): Promise<Array<ServiceDoc & { isDemo?: boolean }>> {
  try {
    const items = await getRelatedServices(service, { limit })
    if (items.length > 0) return items
  } catch {
    // fall through
  }

  // Only use static demo cards when CMS has no other published services.
  return DEMO_SERVICES.filter((item) => item.slug !== service.slug)
    .slice(0, limit)
    .map((item) => ({ ...item, isDemo: true as const }))
}

export async function safeGetDoctors(limit = 50): Promise<{
  items: Array<DoctorDoc & { isDemo?: boolean }>
  isDemo: boolean
}> {
  try {
    const items = await getDoctors({ limit })
    if (items.length > 0) return { items, isDemo: false }
  } catch {
    // fall through
  }

  return {
    items: DEMO_DOCTORS.map((doctor) => ({
      ...doctor,
      education: doctor.education.map((item) => ({ item })),
      certificates: doctor.certificates.map((item) => ({ item })),
    })),
    isDemo: true,
  }
}

export async function safeGetDoctorBySlug(slug: string): Promise<{
  item: (DoctorDoc & { isDemo?: boolean }) | null
  isDemo: boolean
}> {
  try {
    const item = await getDoctorBySlug(slug)
    if (item) return { item, isDemo: false }
  } catch {
    // fall through
  }

  const demo = DEMO_DOCTORS.find((doctor) => doctor.slug === slug)
  return {
    item: demo
      ? {
          ...demo,
          education: demo.education.map((item) => ({ item })),
          certificates: demo.certificates.map((item) => ({ item })),
        }
      : null,
    isDemo: Boolean(demo),
  }
}

export async function safeGetCases(limit = 24): Promise<{
  items: Array<CaseDoc & { isDemo?: boolean }>
  isDemo: boolean
}> {
  try {
    const items = await getCases({ limit })
    if (items.length > 0) return { items, isDemo: false }
  } catch {
    // fall through
  }

  return {
    items: [
      {
        id: 'demo-case-1',
        isDemo: true,
        title: 'Эстетическая реабилитация улыбки (демо)',
        slug: 'smile-rehab',
        description:
          'Демо-кейс: аккуратная работа с формой и цветом зубов после диагностики и согласования плана.',
        duration: '3 визита',
        disclaimer:
          'Результат индивидуален и зависит от клинической ситуации. Демонстрационный пример.',
      },
      {
        id: 'demo-case-2',
        isDemo: true,
        title: 'Гигиена и восстановление эмали (демо)',
        slug: 'hygiene-restore',
        description:
          'Демо-кейс: профессиональная гигиена и поддержка здоровья дёсен.',
        duration: '1 визит',
        disclaimer:
          'Результат индивидуален. Демонстрационный пример для наполнения сайта.',
      },
    ],
    isDemo: true,
  }
}

export async function safeGetCaseBySlug(slug: string): Promise<{
  item: (CaseDoc & { isDemo?: boolean }) | null
  isDemo: boolean
}> {
  try {
    const item = await getCaseBySlug(slug)
    if (item) return { item, isDemo: false }
  } catch {
    // fall through
  }

  const { items } = await safeGetCases()
  const demo = items.find((item) => item.slug === slug) ?? null
  return { item: demo, isDemo: Boolean(demo) }
}

export async function safeGetArticles(limit = 24): Promise<{
  items: Array<ArticleDoc & { isDemo?: boolean }>
  isDemo: boolean
}> {
  try {
    const items = await getArticles({ limit })
    if (items.length > 0) return { items, isDemo: false }
  } catch {
    // fall through
  }

  return {
    items: DEMO_ARTICLES.map((article) => ({
      ...article,
      content: `${article.excerpt}\n\nЭто демонстрационная статья Aura Dental. Замените текст реальным материалом из CMS перед публикацией.\n\nНа консультации врач ответит на вопросы и поможет выбрать спокойный план действий.`,
    })),
    isDemo: true,
  }
}

export async function safeGetArticleBySlug(slug: string): Promise<{
  item: (ArticleDoc & { isDemo?: boolean }) | null
  isDemo: boolean
}> {
  try {
    const item = await getArticleBySlug(slug)
    if (item) return { item, isDemo: false }
  } catch {
    // fall through
  }

  const { items } = await safeGetArticles()
  const demo = items.find((item) => item.slug === slug) ?? null
  return { item: demo, isDemo: Boolean(demo) }
}

export async function safeGetAdvantages(): Promise<{
  items: Array<AdvantageDoc & { isDemo?: boolean }>
  isDemo: boolean
}> {
  try {
    const items = await getAdvantages()
    if (items.length > 0) return { items, isDemo: false }
  } catch {
    // fall through
  }

  return {
    items: DEMO_ADVANTAGES.map((item) => ({ ...item })),
    isDemo: true,
  }
}

export async function safeGetTechnologies(): Promise<{
  items: Array<TechnologyDoc & { isDemo?: boolean }>
  isDemo: boolean
}> {
  try {
    const items = await getTechnologies()
    if (items.length > 0) return { items, isDemo: false }
  } catch {
    // fall through
  }

  return {
    items: DEMO_TECHNOLOGIES.map((item) => ({ ...item })),
    isDemo: true,
  }
}

export async function safeGetFAQs(limit = 20): Promise<{
  items: Array<FAQDoc & { isDemo?: boolean }>
  isDemo: boolean
}> {
  try {
    const items = await getFAQs({ limit })
    if (items.length > 0) return { items, isDemo: false }
  } catch {
    // fall through
  }

  return {
    items: DEMO_FAQS.map((item) => ({ ...item })),
    isDemo: true,
  }
}

export async function safeGetReviews(limit = 12): Promise<{
  items: Array<ReviewDoc & { isDemo?: boolean | null }>
  isDemo: boolean
  aggregate: AggregateRating | null
}> {
  try {
    const [featured, aggregate] = await Promise.all([
      getFeaturedReviews(limit),
      getAggregateRating(),
    ])
    const items =
      featured.length > 0
        ? featured
        : await getReviews({ limit, depth: 0 })
    if (items.length > 0) {
      return { items, isDemo: false, aggregate }
    }
  } catch {
    // fall through
  }

  return {
    items: DEMO_REVIEWS.map((item) => ({ ...item })),
    isDemo: true,
    aggregate: null,
  }
}

export async function safeGetPrices(): Promise<{
  items: Array<
    PriceDoc & {
      isDemo?: boolean
      categorySlug?: string
      categoryTitle?: string
    }
  >
  isDemo: boolean
}> {
  try {
    const items = await getPrices({ limit: 200, depth: 1 })
    if (items.length > 0) {
      return {
        items: items.map((item) => {
          const category =
            item.category && typeof item.category === 'object'
              ? (item.category as { title?: string; slug?: string })
              : null
          return {
            ...item,
            categoryTitle: category?.title || 'Без категории',
            categorySlug: category?.slug || 'other',
          }
        }),
        isDemo: false,
      }
    }
  } catch {
    // fall through
  }

  return {
    items: DEMO_PRICES.map((item) => ({ ...item })),
    isDemo: true,
  }
}

export async function safeGetPageBySlug(slug: string): Promise<{
  item: PageDoc | null
  isDemo: boolean
}> {
  try {
    const item = await getPageBySlug(slug)
    if (item) return { item, isDemo: false }
  } catch {
    // fall through
  }

  return { item: null, isDemo: true }
}

export function getDemoAbout() {
  return DEMO_ABOUT
}

export async function safeGetHomepageSettings(): Promise<{
  data: HomepageSettingsDoc
  isDemo: boolean
}> {
  try {
    const data = await getHomepageSettings()
    if (data) return { data, isDemo: false }
  } catch {
    // fall through
  }

  return {
    data: {},
    isDemo: true,
  }
}

export function relationTitle(value: unknown): string | null {
  if (value && typeof value === 'object' && 'title' in value) {
    const title = (value as { title?: unknown }).title
    return typeof title === 'string' ? title : null
  }
  return null
}

export function relationSlug(value: unknown): string | null {
  if (value && typeof value === 'object' && 'slug' in value) {
    const slug = (value as { slug?: unknown }).slug
    return typeof slug === 'string' ? slug : null
  }
  return null
}

export function relationName(value: unknown): string | null {
  if (value && typeof value === 'object' && 'name' in value) {
    const name = (value as { name?: unknown }).name
    return typeof name === 'string' ? name : null
  }
  return null
}

export function asMedia(value: unknown) {
  if (value && typeof value === 'object' && 'url' in value) {
    const media = value as {
      url?: string | null
      alt?: string | null
      width?: number | null
      height?: number | null
    }
    return {
      ...media,
      url: media.url ? toRelativeMediaUrl(media.url) : media.url,
    }
  }
  return null
}

/** CMS media first; static /images only for explicit demo content. */
export function resolveServiceImage(
  service: {
    slug?: unknown
    image?: unknown
    isDemo?: unknown
  },
  options?: { allowDemoFallback?: boolean },
) {
  const fromCms = asMedia(service.image)
  if (fromCms) return fromCms

  const allowDemo =
    options?.allowDemoFallback === true || service.isDemo === true
  if (!allowDemo) return null

  const slug = String(service.slug || '')
  return DEMO_IMAGES.services[slug as keyof typeof DEMO_IMAGES.services] || null
}

export function resolveDoctorPhoto(doctor: {
  slug?: unknown
  photo?: unknown
}) {
  const slug = String(doctor.slug || '')
  return (
    asMedia(doctor.photo) ||
    DEMO_IMAGES.doctors[slug as keyof typeof DEMO_IMAGES.doctors] ||
    null
  )
}

export function resolveCaseImages(item: {
  slug?: unknown
  beforeImage?: unknown
  afterImage?: unknown
}) {
  const slug = String(item.slug || '')
  const demo = DEMO_IMAGES.cases[slug as keyof typeof DEMO_IMAGES.cases]
  return {
    beforeImage: asMedia(item.beforeImage) || demo?.before || null,
    afterImage: asMedia(item.afterImage) || demo?.after || null,
  }
}

export function resolveArticleCover(article: {
  slug?: unknown
  coverImage?: unknown
}) {
  const slug = String(article.slug || '')
  return (
    asMedia(article.coverImage) ||
    DEMO_IMAGES.articles[slug as keyof typeof DEMO_IMAGES.articles] ||
    null
  )
}

export function resolveTechnologyImage(item: {
  slug?: unknown
  image?: unknown
}) {
  const slug = String(item.slug || '')
  return (
    asMedia(item.image) ||
    DEMO_IMAGES.technologies[slug as keyof typeof DEMO_IMAGES.technologies] ||
    null
  )
}

export function resolveAboutImage(image?: unknown) {
  return asMedia(image) || DEMO_IMAGES.about
}

export function asTextList(
  value: unknown,
): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map((entry) => {
      if (typeof entry === 'string') return entry
      if (entry && typeof entry === 'object' && 'item' in entry) {
        const item = (entry as { item?: unknown }).item
        return typeof item === 'string' ? item : null
      }
      return null
    })
    .filter((item): item is string => Boolean(item))
}

export function asStages(
  value: unknown,
): Array<{ title: string; description?: string }> {
  if (!Array.isArray(value)) return []
  const stages: Array<{ title: string; description?: string }> = []

  for (const entry of value) {
    if (!entry || typeof entry !== 'object') continue
    const stage = entry as { title?: unknown; description?: unknown }
    if (typeof stage.title !== 'string') continue
    stages.push({
      title: stage.title,
      description:
        typeof stage.description === 'string' ? stage.description : undefined,
    })
  }

  return stages
}
