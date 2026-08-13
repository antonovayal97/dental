import {
  AboutPreview,
  BeforeAfter,
  BlogPreview,
  ContactsPreview,
  CtaBanner,
  DoctorsGrid,
  FaqSection,
  Hero,
  Reviews,
  ServicesGrid,
  Technology,
  TrustBar,
  WhyUs,
} from '@/components/sections'
import { JsonLd } from '@/components/shared/json-ld'
import {
  asMedia,
  getDemoAbout,
  resolveArticleCover,
  resolveCaseImages,
  resolveDoctorPhoto,
  resolveServiceImage,
  resolveAboutImage,
  mapServiceOptions,
  resolveTechnologyBlockItems,
  safeGetAdvantages,
  safeGetArticles,
  safeGetCases,
  safeGetDoctors,
  safeGetFAQs,
  safeGetHomepageSettings,
  safeGetReviews,
  safeGetServices,
  safeGetSiteSettings,
} from '@/lib/content'
import { DEMO_IMAGES } from '@/lib/demo-content'
import {
  dentistLocalBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { absoluteUrl, getMediaUrl, sanitizeHref } from '@/lib/utils'

function sectionEnabled(
  value: { enabled?: boolean | null } | null | undefined,
): boolean {
  return value?.enabled !== false
}

function textOr(
  value: string | null | undefined,
  fallback: string,
): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

export async function generateMetadata() {
  const home = await safeGetHomepageSettings()
  return buildMetadata({
    path: '/',
    title: home.data.seo?.title || undefined,
    description:
      home.data.seo?.description ||
      'Современная стоматология: услуги, врачи, кейсы и запись на консультацию.',
  })
}

export default async function HomePage() {
  const [siteResult, homeResult] = await Promise.all([
    safeGetSiteSettings(),
    safeGetHomepageSettings(),
  ])

  const home = homeResult.data
  const site = siteResult.data

  const servicesLimit = home.services?.limit ?? 9
  const doctorsLimit = home.doctors?.limit ?? 6
  const casesLimit = home.cases?.limit ?? 4
  const reviewsLimit = home.reviews?.limit ?? 8
  const faqsLimit = home.faq?.limit ?? 8
  const articlesLimit = home.blog?.limit ?? 3

  const [
    servicesResult,
    doctorsResult,
    advantagesResult,
    technologiesResult,
    casesResult,
    reviewsResult,
    faqsResult,
    articlesResult,
  ] = await Promise.all([
    safeGetServices(servicesLimit),
    safeGetDoctors(doctorsLimit),
    safeGetAdvantages(),
    resolveTechnologyBlockItems(home.technology?.items),
    safeGetCases(casesLimit),
    safeGetReviews(reviewsLimit),
    safeGetFAQs(faqsLimit),
    safeGetArticles(articlesLimit),
  ])

  const demoAbout = getDemoAbout()
  const trustStats =
    site.trustStats?.filter((item) => item.label && item.value).map((item) => ({
      label: item.label!,
      value: item.value!,
      isDemo: siteResult.isDemo,
    })) ?? null

  const serviceOptions = mapServiceOptions(servicesResult.items)

  const sameAs = Object.values(site.social ?? {})
    .filter((value): value is string => Boolean(value && String(value).trim()))
    .map(String)

  const jsonLdSettings = {
    clinicName: site.clinicName,
    phone: site.phone,
    email: site.email,
    address: site.address,
    city: site.city,
    district: site.district,
    workingHours: site.workingHours,
    logoUrl: getMediaUrl(asMedia(site.logo)),
    sameAs,
    url: absoluteUrl('/'),
    description:
      home.seo?.description ||
      site.defaultSEO?.description ||
      'Современная стоматологическая клиника с понятным планом лечения.',
    isDemo: siteResult.isDemo,
  }

  const schemas = [
    organizationJsonLd(jsonLdSettings),
    websiteJsonLd({
      siteName: site.clinicName || 'Aura Dental',
      url: absoluteUrl('/'),
      description: jsonLdSettings.description,
      isDemo: siteResult.isDemo,
    }),
    dentistLocalBusinessJsonLd(jsonLdSettings),
  ].filter(Boolean)

  const secondaryLabel = textOr(
    home.hero?.secondaryCtaLabel,
    site.ctaSecondaryText || 'Посмотреть услуги',
  )
  const secondaryHref =
    sanitizeHref(home.hero?.secondaryCtaHref) ||
    (/цен/i.test(secondaryLabel) ? '/prices' : '/services')

  const trustBarItems =
    home.trustBar?.items
      ?.filter((item) => item.title)
      .map((item, index) => ({
        id: item.id || `trust-${index}`,
        title: item.title!,
        description: item.description || undefined,
        icon: item.icon || 'doctors',
      })) ?? []

  const ctaBenefits =
    home.cta?.benefits
      ?.map((item) => item.text?.trim())
      .filter((text): text is string => Boolean(text)) ?? []

  const aboutTitle = textOr(home.about?.title, demoAbout.title)
  const aboutBlurb = textOr(home.about?.blurb, demoAbout.blurb)
  const aboutIsDemo =
    homeResult.isDemo ||
    (!home.about?.title && !home.about?.blurb) ||
    (aboutTitle === demoAbout.title && aboutBlurb === demoAbout.blurb)

  return (
    <>
      {schemas.length > 0 ? (
        <JsonLd id="home-jsonld" data={schemas as Record<string, unknown>[]} />
      ) : null}

      {sectionEnabled(home.hero) ? (
        <Hero
          eyebrow={textOr(home.hero?.eyebrow, 'Современная стоматология')}
          title={textOr(
            home.hero?.title,
            'Здоровая улыбка,\nк которой хочется возвращаться',
          )}
          subtitle={textOr(
            home.hero?.subtitle,
            'Спокойный приём, понятный план лечения и аккуратная работа без лишней суеты — в атмосфере премиального ухода.',
          )}
          stats={trustStats}
          statsLabel={textOr(home.hero?.statsLabel, 'Показатели клиники')}
          primaryCtaLabel={textOr(
            home.hero?.primaryCtaLabel,
            site.ctaPrimaryText || 'Записаться на консультацию',
          )}
          secondaryCtaLabel={secondaryLabel}
          secondaryCtaHref={secondaryHref}
          services={serviceOptions}
          image={
            asMedia(home.hero?.image) ||
            asMedia(site.defaultSEO?.ogImage) ||
            DEMO_IMAGES.hero
          }
          imageAlt={textOr(
            home.hero?.imageAlt,
            'Атмосфера современной стоматологической клиники',
          )}
        />
      ) : null}

      {sectionEnabled(home.trustBar) ? (
        <TrustBar items={trustBarItems.length > 0 ? trustBarItems : undefined} />
      ) : null}

      {sectionEnabled(home.services) ? (
        <ServicesGrid
          eyebrow={textOr(home.services?.eyebrow, 'Услуги')}
          title={textOr(
            home.services?.title,
            'Направления, в которых мы сильны',
          )}
          description={textOr(
            home.services?.description,
            'От гигиены и терапии до имплантации и ортодонтии — спокойный путь к результату.',
          )}
          services={servicesResult.items.map((service) => ({
            id: String(service.id),
            title: String(service.title || 'Услуга'),
            slug: String(service.slug || service.id),
            shortDescription:
              typeof service.shortDescription === 'string'
                ? service.shortDescription
                : null,
            priceFrom:
              typeof service.priceFrom === 'number' ? service.priceFrom : null,
            image: resolveServiceImage(service),
            isDemo: Boolean(service.isDemo) || servicesResult.isDemo,
          }))}
        />
      ) : null}

      {sectionEnabled(home.whyUs) ? (
        <WhyUs
          eyebrow={textOr(home.whyUs?.eyebrow, 'Почему мы')}
          title={textOr(
            home.whyUs?.title,
            'Почему пациенты выбирают нас',
          )}
          description={textOr(
            home.whyUs?.description,
            'Не громкие обещания — спокойный процесс, прозрачность и внимание к деталям на каждом этапе.',
          )}
          advantages={advantagesResult.items.map((item) => ({
            id: String(item.id),
            title: String(item.title || 'Преимущество'),
            description: String(item.description || ''),
            icon: typeof item.icon === 'string' ? item.icon : null,
            isDemo: Boolean(item.isDemo) || advantagesResult.isDemo,
          }))}
        />
      ) : null}

      {sectionEnabled(home.doctors) ? (
        <DoctorsGrid
          eyebrow={textOr(home.doctors?.eyebrow, 'Команда')}
          title={textOr(home.doctors?.title, 'Врачи, с которыми спокойно')}
          description={textOr(
            home.doctors?.description,
            'Специалисты с понятной коммуникацией и вниманием к деталям — без спешки и шаблонных решений.',
          )}
          doctors={doctorsResult.items.map((doctor) => ({
            id: String(doctor.id),
            name: String(doctor.name || 'Врач'),
            slug: String(doctor.slug || doctor.id),
            specialization:
              typeof doctor.specialization === 'string'
                ? doctor.specialization
                : null,
            experienceYears:
              typeof doctor.experienceYears === 'number'
                ? doctor.experienceYears
                : null,
            position:
              typeof doctor.position === 'string' ? doctor.position : null,
            photo: resolveDoctorPhoto(doctor),
            isDemo: Boolean(doctor.isDemo) || doctorsResult.isDemo,
          }))}
        />
      ) : null}

      {sectionEnabled(home.technology) ? (
        <Technology
          eyebrow={textOr(home.technology?.eyebrow, 'Технологии')}
          title={textOr(
            home.technology?.title,
            'Технологии, которые помогают лечить точнее',
          )}
          description={textOr(
            home.technology?.description,
            'Цифровая диагностика и современное оборудование — меньше догадок, больше контроля на каждом этапе.',
          )}
          technologies={technologiesResult.items}
        />
      ) : null}

      {sectionEnabled(home.cases) ? (
        <BeforeAfter
          eyebrow={textOr(home.cases?.eyebrow, 'Кейсы')}
          title={textOr(home.cases?.title, 'До и после — честный результат')}
          description={textOr(
            home.cases?.description,
            'Подборка работ, где видно путь от исходной ситуации к аккуратному финалу.',
          )}
          disclaimer={textOr(
            home.cases?.disclaimer,
            'Результаты индивидуальны и зависят от клинической ситуации. Примеры работ носят ознакомительный характер.',
          )}
          cases={casesResult.items.map((item) => {
            const images = resolveCaseImages(item)
            return {
              id: String(item.id),
              title: String(item.title || 'Кейс'),
              slug: String(item.slug || item.id),
              description:
                typeof item.description === 'string' ? item.description : null,
              duration:
                typeof item.duration === 'string' ? item.duration : null,
              disclaimer:
                typeof item.disclaimer === 'string' ? item.disclaimer : null,
              beforeImage: images.beforeImage,
              afterImage: images.afterImage,
              isDemo: Boolean(item.isDemo) || casesResult.isDemo,
            }
          })}
        />
      ) : null}

      {sectionEnabled(home.reviews) ? (
        <Reviews
          eyebrow={textOr(home.reviews?.eyebrow, 'Отзывы')}
          title={textOr(home.reviews?.title, 'Что говорят пациенты')}
          description={textOr(
            home.reviews?.description,
            'Реальные впечатления о приёме, коммуникации и результате лечения.',
          )}
          reviews={reviewsResult.items.map((item) => ({
            id: String(item.id),
            name: String(item.name || 'Пациент'),
            text: String(item.text || ''),
            rating: typeof item.rating === 'number' ? item.rating : null,
            date: typeof item.date === 'string' ? item.date : null,
            isDemo: Boolean(item.isDemo) || reviewsResult.isDemo,
          }))}
          aggregateRating={
            !reviewsResult.isDemo && reviewsResult.aggregate
              ? {
                  ratingValue: reviewsResult.aggregate.ratingValue,
                  reviewCount: reviewsResult.aggregate.reviewCount,
                }
              : null
          }
        />
      ) : null}

      {sectionEnabled(home.about) ? (
        <AboutPreview
          eyebrow={textOr(home.about?.eyebrow, 'О клинике')}
          title={aboutTitle}
          blurb={aboutBlurb}
          href={sanitizeHref(home.about?.ctaHref) || '/about'}
          ctaLabel={textOr(home.about?.ctaLabel, 'Подробнее о клинике')}
          image={resolveAboutImage(home.about?.image)}
          isDemo={aboutIsDemo}
        />
      ) : null}

      {sectionEnabled(home.faq) ? (
        <FaqSection
          includeJsonLd={!faqsResult.isDemo}
          eyebrow={textOr(home.faq?.eyebrow, 'FAQ')}
          title={textOr(home.faq?.title, 'Частые вопросы')}
          description={textOr(
            home.faq?.description,
            'Короткие ответы о первом визите, подготовке и стоимости — без лишней воды.',
          )}
          faqs={faqsResult.items.map((item) => ({
            id: String(item.id),
            question: String(item.question || ''),
            answer: String(item.answer || ''),
            isDemo: Boolean(item.isDemo) || faqsResult.isDemo,
          }))}
        />
      ) : null}

      {sectionEnabled(home.blog) ? (
        <BlogPreview
          eyebrow={textOr(home.blog?.eyebrow, 'Блог')}
          title={textOr(
            home.blog?.title,
            'Полезные материалы для пациентов',
          )}
          description={textOr(
            home.blog?.description,
            'Короткие статьи о подготовке к приёму, профилактике и этапах лечения.',
          )}
          articles={articlesResult.items.map((article) => ({
            id: String(article.id),
            title: String(article.title || 'Статья'),
            slug: String(article.slug || article.id),
            excerpt:
              typeof article.excerpt === 'string' ? article.excerpt : null,
            category:
              article.category && typeof article.category === 'object'
                ? (article.category as { title?: string; slug?: string })
                : null,
            author:
              typeof article.author === 'string' ? article.author : null,
            publishedAt:
              typeof article.publishedAt === 'string'
                ? article.publishedAt
                : null,
            coverImage: resolveArticleCover(article),
            isDemo: Boolean(article.isDemo) || articlesResult.isDemo,
          }))}
        />
      ) : null}

      {sectionEnabled(home.cta) ? (
        <CtaBanner
          eyebrow={textOr(home.cta?.eyebrow, 'Запись')}
          title={textOr(home.cta?.title, 'Запишитесь на консультацию')}
          description={textOr(
            home.cta?.description,
            'Оставьте контакты — администратор перезвонит, уточнит задачу и подберёт удобное время.',
          )}
          benefits={ctaBenefits}
          services={serviceOptions}
        />
      ) : null}

      {sectionEnabled(home.contacts) ? (
        <ContactsPreview
          clinicName={site.clinicName}
          phone={site.phone}
          email={site.email}
          address={site.address}
          city={site.city}
          eyebrow={textOr(home.contacts?.eyebrow, 'Контакты')}
          description={textOr(
            home.contacts?.description,
            'Приезжайте в удобное время или оставьте заявку — поможем сориентироваться по услугам и записи.',
          )}
          ctaLabel={textOr(
            home.contacts?.ctaLabel,
            'Все контакты и схема проезда',
          )}
          workingHours={
            site.workingHours
              ?.filter((item) => item.day && item.hours)
              .map((item) => ({ day: item.day!, hours: item.hours! })) ?? null
          }
          isDemo={siteResult.isDemo}
        />
      ) : null}
    </>
  )
}
