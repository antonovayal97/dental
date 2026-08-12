import { NextResponse } from 'next/server'

import { appointmentSchema } from '@/lib/forms/appointment-schema'
import { getPayloadClient } from '@/lib/payload'

export const runtime = 'nodejs'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getClientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) return true
  entry.count += 1
  return false
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    return `+7${digits.slice(1)}`
  }
  if (digits.length === 10) return `+7${digits}`
  return phone.trim()
}

function parsePreferredDate(value?: string): string | undefined {
  if (!value?.trim()) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request)
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Слишком много заявок. Подождите минуту и попробуйте снова.',
        },
        { status: 429 },
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { ok: false, message: 'Некорректный формат запроса.' },
        { status: 400 },
      )
    }

    const parsed = appointmentSchema.safeParse(body)
    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message || 'Проверьте корректность данных.'
      return NextResponse.json(
        {
          ok: false,
          message: firstError,
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const data = parsed.data

    // Honeypot filled → pretend success
    if (data.website) {
      return NextResponse.json({ ok: true })
    }

    const payload = await getPayloadClient()

    let serviceId: string | undefined
    if (data.service?.trim()) {
      const serviceValue = data.service.trim()
      try {
        const byId = await payload.findByID({
          collection: 'services',
          id: serviceValue,
          depth: 0,
          overrideAccess: true,
        })
        if (byId?.id != null) serviceId = String(byId.id)
      } catch {
        const bySlug = await payload.find({
          collection: 'services',
          depth: 0,
          limit: 1,
          overrideAccess: true,
          where: {
            and: [
              { slug: { equals: serviceValue } },
              { _status: { equals: 'published' } },
            ],
          },
        })
        if (bySlug.docs[0]?.id != null) serviceId = String(bySlug.docs[0].id)
      }
    }

    const preferredDate = parsePreferredDate(data.preferredDate)

    const doc = await payload.create({
      collection: 'appointments',
      data: {
        name: data.name.trim(),
        phone: normalizePhone(data.phone),
        ...(serviceId != null ? { service: serviceId } : {}),
        ...(preferredDate ? { preferredDate } : {}),
        comment: data.comment?.trim() || undefined,
        consent: data.consent,
        status: 'new',
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      id: String(doc.id),
    })
  } catch (error) {
    console.error('[appointments] create failed', error)
    return NextResponse.json(
      {
        ok: false,
        message:
          'Не удалось сохранить заявку. Попробуйте позже или позвоните в клинику.',
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, message: 'Метод не поддерживается.' },
    { status: 405 },
  )
}
