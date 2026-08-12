import type { AppointmentFormValues } from '@/lib/forms/appointment-schema'

export type AppointmentPayload = AppointmentFormValues

export interface AppointmentSubmitResult {
  ok: true
  id?: string
}

export async function submitAppointment(
  data: AppointmentPayload,
): Promise<AppointmentSubmitResult> {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      service: data.service || undefined,
      preferredDate: data.preferredDate || undefined,
      comment: data.comment || undefined,
      consent: data.consent,
      website: data.website || '',
    }),
  })

  if (!response.ok) {
    let message = 'Не удалось отправить заявку. Попробуйте ещё раз.'

    try {
      const payload = (await response.json()) as { message?: string; error?: string }
      message = payload.message || payload.error || message
    } catch {
      // ignore parse errors
    }

    throw new Error(message)
  }

  try {
    const payload = (await response.json()) as { id?: string }
    return {
      ok: true,
      id: payload.id,
    }
  } catch {
    return { ok: true }
  }
}
