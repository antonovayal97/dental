import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public/images')

async function main() {
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.jpg'))
  for (const file of files) {
    const filePath = path.join(dir, file)
    const buffer = await sharp(filePath).jpeg({ quality: 85, mozjpeg: true }).toBuffer()
    fs.writeFileSync(filePath, buffer)
    console.log('jpeg', file, buffer.length)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
