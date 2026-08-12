/**
 * Uploads demo images to Payload Media and attaches them to content.
 * Prerequisites: npm run generate:images && existing seed content
 */
import 'dotenv/config'

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from 'payload'

import config from '../payload.config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.resolve(__dirname, '../../public/images')

function mediaId(id: string | number): string {
  return String(id)
}

async function ensureMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  alt: string,
) {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) return existing.docs[0]

  const filePath = path.join(imagesDir, filename)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing image file: ${filePath}`)
  }

  return payload.create({
    collection: 'media',
    data: { alt },
    filePath,
    overrideAccess: true,
  })
}

async function findBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'services' | 'doctors' | 'articles' | 'technologies' | 'cases',
  slug: string,
) {
  const result = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    draft: true,
  })
  return result.docs[0] ?? null
}

async function main() {
  const payload = await getPayload({ config })

  console.log('Uploading media...')

  const media = {
    hero: await ensureMedia(payload, 'hero.jpg', 'Интерьер Aura Dental (демо)'),
    about: await ensureMedia(payload, 'about.jpg', 'О клинике Aura Dental (демо)'),
    og: await ensureMedia(payload, 'og-default.jpg', 'Aura Dental OG (демо)'),
    doctorAnna: await ensureMedia(payload, 'doctor-anna.jpg', 'Анна Орлова (демо)'),
    doctorIgor: await ensureMedia(payload, 'doctor-igor.jpg', 'Игорь Савельев (демо)'),
    doctorMaria: await ensureMedia(payload, 'doctor-maria.jpg', 'Мария Ким (демо)'),
    therapy: await ensureMedia(payload, 'service-therapy.jpg', 'Терапия (демо)'),
    implantation: await ensureMedia(payload, 'service-implantation.jpg', 'Имплантация (демо)'),
    prosthetics: await ensureMedia(payload, 'service-prosthetics.jpg', 'Протезирование (демо)'),
    orthodontics: await ensureMedia(payload, 'service-orthodontics.jpg', 'Ортодонтия (демо)'),
    aesthetic: await ensureMedia(payload, 'service-aesthetic.jpg', 'Эстетика (демо)'),
    pediatric: await ensureMedia(payload, 'service-pediatric.jpg', 'Детская стоматология (демо)'),
    surgery: await ensureMedia(payload, 'service-surgery.jpg', 'Хирургия (демо)'),
    hygiene: await ensureMedia(payload, 'service-hygiene.jpg', 'Гигиена (демо)'),
    whitening: await ensureMedia(payload, 'service-whitening.jpg', 'Отбеливание (демо)'),
    smileBefore: await ensureMedia(payload, 'case-smile-before.jpg', 'Кейс до (демо)'),
    smileAfter: await ensureMedia(payload, 'case-smile-after.jpg', 'Кейс после (демо)'),
    hygieneBefore: await ensureMedia(payload, 'case-hygiene-before.jpg', 'Гигиена до (демо)'),
    hygieneAfter: await ensureMedia(payload, 'case-hygiene-after.jpg', 'Гигиена после (демо)'),
    blogImplant: await ensureMedia(payload, 'blog-implant.jpg', 'Статья об имплантах (демо)'),
    blogWisdom: await ensureMedia(payload, 'blog-wisdom.jpg', 'Статья о зубе мудрости (демо)'),
    blogHygiene: await ensureMedia(payload, 'blog-hygiene.jpg', 'Статья о гигиене (демо)'),
    techScanner: await ensureMedia(payload, 'tech-scanner.jpg', 'Цифровой сканер (демо)'),
    techMicroscope: await ensureMedia(payload, 'tech-microscope.jpg', 'Микроскоп (демо)'),
  }

  console.log('Linking doctors...')
  const doctorMap: Array<{ slug: string; photo: string }> = [
    { slug: 'anna-orlova', photo: mediaId(media.doctorAnna.id) },
    { slug: 'igor-savelyev', photo: mediaId(media.doctorIgor.id) },
    { slug: 'maria-kim', photo: mediaId(media.doctorMaria.id) },
  ]

  for (const item of doctorMap) {
    const doc = await findBySlug(payload, 'doctors', item.slug)
    if (!doc) continue
    await payload.update({
      collection: 'doctors',
      id: doc.id,
      data: { photo: item.photo, _status: 'published' },
      overrideAccess: true,
    })
  }

  console.log('Linking services...')
  const serviceMap: Array<{ slug: string; image: string }> = [
    { slug: 'therapy', image: mediaId(media.therapy.id) },
    { slug: 'implantation', image: mediaId(media.implantation.id) },
    { slug: 'prosthetics', image: mediaId(media.prosthetics.id) },
    { slug: 'orthodontics', image: mediaId(media.orthodontics.id) },
    { slug: 'aesthetic', image: mediaId(media.aesthetic.id) },
    { slug: 'pediatric', image: mediaId(media.pediatric.id) },
    { slug: 'surgery', image: mediaId(media.surgery.id) },
    { slug: 'hygiene', image: mediaId(media.hygiene.id) },
    { slug: 'whitening', image: mediaId(media.whitening.id) },
  ]

  for (const item of serviceMap) {
    const doc = await findBySlug(payload, 'services', item.slug)
    if (!doc) continue
    await payload.update({
      collection: 'services',
      id: doc.id,
      data: { image: item.image, _status: 'published' },
      overrideAccess: true,
    })
  }

  console.log('Linking articles...')
  const articleMap: Array<{ slug: string; cover: string }> = [
    { slug: 'how-to-choose-implant', cover: mediaId(media.blogImplant.id) },
    { slug: 'wisdom-tooth-removal', cover: mediaId(media.blogWisdom.id) },
    { slug: 'professional-hygiene-frequency', cover: mediaId(media.blogHygiene.id) },
  ]

  for (const item of articleMap) {
    const doc = await findBySlug(payload, 'articles', item.slug)
    if (!doc) continue
    await payload.update({
      collection: 'articles',
      id: doc.id,
      data: { coverImage: item.cover, _status: 'published' },
      overrideAccess: true,
    })
  }

  console.log('Linking technologies...')
  const techMap: Array<{ slug: string; image: string }> = [
    { slug: '3d-diagnostics', image: mediaId(media.techScanner.id) },
    { slug: 'digital-scanner', image: mediaId(media.techScanner.id) },
    { slug: 'microscope', image: mediaId(media.techMicroscope.id) },
  ]

  for (const item of techMap) {
    const doc = await findBySlug(payload, 'technologies', item.slug)
    if (!doc) continue
    await payload.update({
      collection: 'technologies',
      id: doc.id,
      data: { image: item.image },
      overrideAccess: true,
    })
  }

  console.log('Creating cases...')
  const implantService = await findBySlug(payload, 'services', 'implantation')
  const hygieneService = await findBySlug(payload, 'services', 'hygiene')
  const doctorIgor = await findBySlug(payload, 'doctors', 'igor-savelyev')
  const doctorAnna = await findBySlug(payload, 'doctors', 'anna-orlova')

  const cases = [
    {
      title: 'Восстановление улыбки после имплантации',
      slug: 'smile-rehab',
      service: implantService ? mediaId(implantService.id) : undefined,
      doctor: doctorIgor ? mediaId(doctorIgor.id) : undefined,
      description:
        'Демо-кейс: планирование имплантации и аккуратное протезирование. Результаты индивидуальны.',
      beforeImage: mediaId(media.smileBefore.id),
      afterImage: mediaId(media.smileAfter.id),
      duration: 'несколько этапов',
      disclaimer: 'Результаты лечения индивидуальны и могут отличаться.',
    },
    {
      title: 'Профессиональная гигиена',
      slug: 'hygiene-restore',
      service: hygieneService ? mediaId(hygieneService.id) : undefined,
      doctor: doctorAnna ? mediaId(doctorAnna.id) : undefined,
      description:
        'Демо-кейс: профессиональная гигиена с удалением налёта и полировкой. Результаты индивидуальны.',
      beforeImage: mediaId(media.hygieneBefore.id),
      afterImage: mediaId(media.hygieneAfter.id),
      duration: '1 визит',
      disclaimer: 'Результаты лечения индивидуальны и могут отличаться.',
    },
  ]

  for (const item of cases) {
    if (!item.service) continue
    const existing = await findBySlug(payload, 'cases', item.slug)
    if (existing) {
      await payload.update({
        collection: 'cases',
        id: existing.id,
        data: {
          beforeImage: item.beforeImage,
          afterImage: item.afterImage,
          doctor: item.doctor,
          service: item.service,
          description: item.description,
          duration: item.duration,
          disclaimer: item.disclaimer,
          _status: 'published',
        },
        overrideAccess: true,
      })
      continue
    }

    await payload.create({
      collection: 'cases',
      data: {
        title: item.title,
        slug: item.slug,
        service: item.service,
        doctor: item.doctor,
        description: item.description,
        beforeImage: item.beforeImage,
        afterImage: item.afterImage,
        duration: item.duration,
        disclaimer: item.disclaimer,
        _status: 'published',
      },
      overrideAccess: true,
    })
  }

  console.log('Updating site settings media...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      defaultSEO: {
        title: 'Aura Dental — современная стоматология',
        description:
          'Премиальная стоматологическая клиника: диагностика, терапия, имплантация, ортодонтия и эстетика.',
        ogImage: mediaId(media.og.id),
      },
    },
    overrideAccess: true,
  })

  console.log('Media seed completed.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
