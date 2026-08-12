import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { collections } from './collections'
import { globals } from './globals'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret || payloadSecret.length < 32) {
  throw new Error(
    'PAYLOAD_SECRET must be set to a random string of at least 32 characters',
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Стоматология',
    },
    components: {
      actions: ['./components/admin/clear-cache-button'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  globals,
  editor: lexicalEditor(),
  secret: payloadSecret,
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  graphQL: {
    disablePlaygroundInProduction: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
})
