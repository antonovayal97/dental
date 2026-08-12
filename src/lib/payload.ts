import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

/** Deduplicate Payload client within a single React request tree */
export const getPayloadClient = cache(async () => {
  return getPayload({ config })
})
