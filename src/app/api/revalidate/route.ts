import { revalidateSiteCache } from '@/lib/revalidate-site'
import { getPayloadClient } from '@/lib/payload'
import type { PayloadRequest } from 'payload'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({
      req: request as unknown as PayloadRequest,
      headers: request.headers,
    })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    revalidateSiteCache()

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to revalidate cache'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
