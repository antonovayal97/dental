import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from 'payload'

import config from '../payload.config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.resolve(__dirname, '../../public/images')

const files = [
  'hero.jpg',
  'about.jpg',
  'og-default.jpg',
  'doctor-anna.jpg',
  'doctor-igor.jpg',
  'doctor-maria.jpg',
  'service-therapy.jpg',
  'service-implantation.jpg',
  'service-prosthetics.jpg',
  'service-orthodontics.jpg',
  'service-aesthetic.jpg',
  'service-pediatric.jpg',
  'service-surgery.jpg',
  'service-hygiene.jpg',
  'service-whitening.jpg',
  'case-smile-before.jpg',
  'case-smile-after.jpg',
  'case-hygiene-before.jpg',
  'case-hygiene-after.jpg',
  'blog-implant.jpg',
  'blog-wisdom.jpg',
  'blog-hygiene.jpg',
  'tech-scanner.jpg',
  'tech-microscope.jpg',
]

async function main() {
  const payload = await getPayload({ config })

  for (const filename of files) {
    const filePath = path.join(imagesDir, filename)
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'media',
        id: existing.docs[0].id,
        data: {
          alt:
            typeof existing.docs[0].alt === 'string'
              ? existing.docs[0].alt
              : filename,
        },
        filePath,
        overwriteExistingFiles: true,
        overrideAccess: true,
      })
      console.log('updated', filename)
    } else {
      await payload.create({
        collection: 'media',
        data: { alt: filename },
        filePath,
        overrideAccess: true,
      })
      console.log('created', filename)
    }
  }

  console.log('Media files overwritten.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
