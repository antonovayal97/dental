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
  resolveTechnologyImage,
  resolveAboutImage,
  mapServiceOptions,
  safeGetAdvantages,
  safeGetArticles,
  safeGetCases,
  safeGetDoctors,
  safeGetFAQs,
  safeGetReviews,
  safeGetServices,
  safeGetSiteSettings,
  safeGetTechnologies,
} from '@/lib/content'
import { DEMO_IMAGES } from '@/lib/demo-content'
import {
  dentistLocalBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { absoluteUrl, getMediaUrl } from '@/lib/utils'

export async function generateMetadata() {
  return buildMetadata({
    path: '/',
    title: undefined,
    description:
      'Современная стоматология: услуги, врачи, кейсы и запись на консультацию.',
  })
}

export default async function HomePage() {
  const [
    siteResult,
    servicesResult,
    doctorsResult,
    advantagesResult,
    technologiesResult,
    casesResult,
    reviewsResult,
    faqsResult,
    articlesResult,
  ] = await Promise.all([
    safeGetSiteSettings(),
    safeGetServices(9),
    safeGetDoctors(6),
    safeGetAdvantages(),
    safeGetTechnologies(),
    safeGetCases(4),
    safeGetReviews(8),
    safeGetFAQs(8),
    safeGetArticles(3),
  ])

  const site = siteResult.data
  const about = getDemoAbout()
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

  const secondaryLabel = site.ctaSecondaryText || 'Посмотреть услуги'
  const secondaryHref =
    /цен/i.test(secondaryLabel) ? '/prices' : '/services'

  return (
    <>
      {schemas.length > 0 ? <JsonLd id="home-jsonld" data={schemas as Record<string, unknown>[]} /> : null}

      <Hero
        stats={trustStats}
        primaryCtaLabel={site.ctaPrimaryText || 'Записаться на консультацию'}
        secondaryCtaLabel={secondaryLabel}
        secondaryCtaHref={secondaryHref}
        services={serviceOptions}
        image={
          asMedia(site.defaultSEO?.ogImage) ||
          DEMO_IMAGES.hero
        }
      />

      <TrustBar />

      <ServicesGrid
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

      <WhyUs
        advantages={advantagesResult.items.map((item) => ({
          id: String(item.id),
          title: String(item.title || 'Преимущество'),
          description: String(item.description || ''),
          icon: typeof item.icon === 'string' ? item.icon : null,
          isDemo: Boolean(item.isDemo) || advantagesResult.isDemo,
        }))}
      />

      <DoctorsGrid
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
          position: typeof doctor.position === 'string' ? doctor.position : null,
          photo: resolveDoctorPhoto(doctor),
          isDemo: Boolean(doctor.isDemo) || doctorsResult.isDemo,
        }))}
      />

      <Technology
        technologies={technologiesResult.items.map((item) => ({
          id: String(item.id),
          title: String(item.title || 'Технология'),
          slug: typeof item.slug === 'string' ? item.slug : undefined,
          description: String(item.description || ''),
          icon: typeof item.icon === 'string' ? item.icon : null,
          image: resolveTechnologyImage(item),
          isDemo: Boolean(item.isDemo) || technologiesResult.isDemo,
        }))}
      />

      <BeforeAfter
        cases={casesResult.items.map((item) => {
          const images = resolveCaseImages(item)
          return {
            id: String(item.id),
            title: String(item.title || 'Кейс'),
            slug: String(item.slug || item.id),
            description:
              typeof item.description === 'string' ? item.description : null,
            duration: typeof item.duration === 'string' ? item.duration : null,
            disclaimer:
              typeof item.disclaimer === 'string' ? item.disclaimer : null,
            beforeImage: images.beforeImage,
            afterImage: images.afterImage,
            isDemo: Boolean(item.isDemo) || casesResult.isDemo,
          }
        })}
      />

      <Reviews
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

      <AboutPreview
        title={about.title}
        blurb={about.blurb}
        image={resolveAboutImage()}
        isDemo={about.isDemo}
      />

      <FaqSection
        includeJsonLd={!faqsResult.isDemo}
        faqs={faqsResult.items.map((item) => ({
          id: String(item.id),
          question: String(item.question || ''),
          answer: String(item.answer || ''),
          isDemo: Boolean(item.isDemo) || faqsResult.isDemo,
        }))}
      />

      <BlogPreview
        articles={articlesResult.items.map((article) => ({
          id: String(article.id),
          title: String(article.title || 'Статья'),
          slug: String(article.slug || article.id),
          excerpt: typeof article.excerpt === 'string' ? article.excerpt : null,
          category:
            article.category && typeof article.category === 'object'
              ? (article.category as { title?: string; slug?: string })
              : null,
          author: typeof article.author === 'string' ? article.author : null,
          publishedAt:
            typeof article.publishedAt === 'string'
              ? article.publishedAt
              : null,
          coverImage: resolveArticleCover(article),
          isDemo: Boolean(article.isDemo) || articlesResult.isDemo,
        }))}
      />

      <CtaBanner services={serviceOptions} />

      <ContactsPreview
        clinicName={site.clinicName}
        phone={site.phone}
        email={site.email}
        address={site.address}
        city={site.city}
        workingHours={
          site.workingHours
            ?.filter((item) => item.day && item.hours)
            .map((item) => ({ day: item.day!, hours: item.hours! })) ?? null
        }
        isDemo={siteResult.isDemo}
      />
    </>
  )
}
