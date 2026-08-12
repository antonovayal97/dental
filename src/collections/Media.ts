import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Медиафайл',
    plural: 'Медиа',
  },
  admin: {
    description: 'Изображения и файлы клиники',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Альтернативный текст',
      required: true,
      admin: {
        description: 'Описание изображения для доступности и SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Подпись',
    },
  ],
}
