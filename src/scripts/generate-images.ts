/**
 * Generates premium demo images for Aura Dental.
 * Run: npx tsx src/scripts/generate-images.ts
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../../public/images')

type Spec = {
  file: string
  width: number
  height: number
  title: string
  subtitle?: string
  from: string
  to: string
  accent?: string
}

const specs: Spec[] = [
  {
    file: 'hero.jpg',
    width: 1600,
    height: 2000,
    title: 'Aura Dental',
    subtitle: 'Современная клиника',
    from: '#E8F3F2',
    to: '#D5E5E3',
    accent: '#2F7F7A',
  },
  {
    file: 'about.jpg',
    width: 1600,
    height: 1200,
    title: 'О клинике',
    subtitle: 'Пространство спокойствия',
    from: '#F3F1EC',
    to: '#E4E8E6',
    accent: '#2F7F7A',
  },
  {
    file: 'doctor-anna.jpg',
    width: 900,
    height: 1100,
    title: 'Анна Орлова',
    subtitle: 'Терапевт',
    from: '#F0F4F3',
    to: '#DDE8E6',
    accent: '#2F7F7A',
  },
  {
    file: 'doctor-igor.jpg',
    width: 900,
    height: 1100,
    title: 'Игорь Савельев',
    subtitle: 'Имплантолог',
    from: '#EEF2F1',
    to: '#D9E4E2',
    accent: '#2F7F7A',
  },
  {
    file: 'doctor-maria.jpg',
    width: 900,
    height: 1100,
    title: 'Мария Ким',
    subtitle: 'Ортодонт',
    from: '#F2F0EB',
    to: '#E5E3DC',
    accent: '#2F7F7A',
  },
  {
    file: 'service-therapy.jpg',
    width: 1200,
    height: 900,
    title: 'Терапия',
    from: '#EAF4F3',
    to: '#D7E7E5',
  },
  {
    file: 'service-implantation.jpg',
    width: 1200,
    height: 900,
    title: 'Имплантация',
    from: '#E9F0EF',
    to: '#D4E0DE',
  },
  {
    file: 'service-prosthetics.jpg',
    width: 1200,
    height: 900,
    title: 'Протезирование',
    from: '#F1EEE8',
    to: '#E3DED5',
  },
  {
    file: 'service-orthodontics.jpg',
    width: 1200,
    height: 900,
    title: 'Ортодонтия',
    from: '#ECF3F2',
    to: '#D9E6E4',
  },
  {
    file: 'service-aesthetic.jpg',
    width: 1200,
    height: 900,
    title: 'Эстетика',
    from: '#F4F1EB',
    to: '#E7E1D6',
  },
  {
    file: 'service-pediatric.jpg',
    width: 1200,
    height: 900,
    title: 'Детская',
    from: '#EEF5F2',
    to: '#DCE9E4',
  },
  {
    file: 'service-surgery.jpg',
    width: 1200,
    height: 900,
    title: 'Хирургия',
    from: '#EBF0F0',
    to: '#D8E1E1',
  },
  {
    file: 'service-hygiene.jpg',
    width: 1200,
    height: 900,
    title: 'Гигиена',
    from: '#EAF6F4',
    to: '#D5EAE6',
  },
  {
    file: 'service-whitening.jpg',
    width: 1200,
    height: 900,
    title: 'Отбеливание',
    from: '#F5F3EE',
    to: '#E8E4DB',
  },
  {
    file: 'case-smile-before.jpg',
    width: 1200,
    height: 900,
    title: 'До',
    subtitle: 'Демо-кейс',
    from: '#E6E6E4',
    to: '#D4D4D0',
  },
  {
    file: 'case-smile-after.jpg',
    width: 1200,
    height: 900,
    title: 'После',
    subtitle: 'Демо-кейс',
    from: '#E8F2F1',
    to: '#C9E0DD',
    accent: '#2F7F7A',
  },
  {
    file: 'case-hygiene-before.jpg',
    width: 1200,
    height: 900,
    title: 'До',
    subtitle: 'Гигиена',
    from: '#E8E7E3',
    to: '#D5D4CF',
  },
  {
    file: 'case-hygiene-after.jpg',
    width: 1200,
    height: 900,
    title: 'После',
    subtitle: 'Гигиена',
    from: '#E7F3F1',
    to: '#C8DFDB',
    accent: '#2F7F7A',
  },
  {
    file: 'blog-implant.jpg',
    width: 1400,
    height: 900,
    title: 'Импланты',
    subtitle: 'Гид для пациента',
    from: '#EAF2F1',
    to: '#D5E3E1',
  },
  {
    file: 'blog-wisdom.jpg',
    width: 1400,
    height: 900,
    title: 'Зуб мудрости',
    subtitle: 'Когда удалять',
    from: '#F0EEE9',
    to: '#E0DBD2',
  },
  {
    file: 'blog-hygiene.jpg',
    width: 1400,
    height: 900,
    title: 'Гигиена',
    subtitle: 'Как часто',
    from: '#E9F5F3',
    to: '#D2E8E4',
  },
  {
    file: 'tech-scanner.jpg',
    width: 1200,
    height: 800,
    title: '3D / Scanner',
    from: '#E8F1F0',
    to: '#D3E2E0',
  },
  {
    file: 'tech-microscope.jpg',
    width: 1200,
    height: 800,
    title: 'Микроскоп',
    from: '#EEF2F1',
    to: '#DCE4E3',
  },
  {
    file: 'og-default.jpg',
    width: 1200,
    height: 630,
    title: 'Aura Dental',
    subtitle: 'Современная стоматология',
    from: '#EAF4F3',
    to: '#D5E6E4',
    accent: '#2F7F7A',
  },
]

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function svgFor(spec: Spec) {
  const accent = spec.accent ?? '#2F7F7A'
  const subtitle = spec.subtitle
    ? `<text x="80" y="${spec.height - 100}" fill="${accent}" font-family="Georgia, serif" font-size="28" letter-spacing="2">${escapeXml(spec.subtitle)}</text>`
    : ''

  return `
<svg width="${spec.width}" height="${spec.height}" viewBox="0 0 ${spec.width} ${spec.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${spec.from}"/>
      <stop offset="100%" stop-color="${spec.to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="20%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#171717" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>
  <circle cx="${spec.width * 0.78}" cy="${spec.height * 0.28}" r="${Math.min(spec.width, spec.height) * 0.18}" fill="${accent}" fill-opacity="0.08"/>
  <circle cx="${spec.width * 0.18}" cy="${spec.height * 0.72}" r="${Math.min(spec.width, spec.height) * 0.14}" fill="#171717" fill-opacity="0.04"/>
  <text x="80" y="${spec.height - 150}" fill="#171717" font-family="Georgia, serif" font-size="${spec.width > 1000 ? 56 : 42}" font-weight="600">${escapeXml(spec.title)}</text>
  ${subtitle}
  <text x="80" y="${spec.height - 56}" fill="#6B6B66" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18">Aura Dental · демо-изображение</text>
</svg>`
}

async function main() {
  await fs.mkdir(outDir, { recursive: true })

  for (const spec of specs) {
    const svg = Buffer.from(svgFor(spec))
    const out = path.join(outDir, spec.file)
    await sharp(svg)
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(out)
    console.log('created', spec.file)
  }

  console.log(`Done: ${specs.length} images in ${outDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
