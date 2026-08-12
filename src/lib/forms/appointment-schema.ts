import { z } from 'zod'

import { getPhoneDigits, isCompletePhone } from '@/lib/forms/phone'

export const appointmentSchema = z.object({
  name: z
    .string({ required_error: 'Укажите имя' })
    .trim()
    .min(2, 'Имя должно содержать не менее 2 символов')
    .max(80, 'Имя слишком длинное')
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/u, 'Имя может содержать только буквы, пробелы и дефис'),
  phone: z
    .string({ required_error: 'Укажите телефон' })
    .trim()
    .refine(isCompletePhone, 'Введите полный номер телефона'),
  service: z.string().max(120).optional().or(z.literal('')),
  preferredDate: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine(
      (value) => {
        if (!value) return true
        const date = new Date(value)
        return !Number.isNaN(date.getTime())
      },
      { message: 'Укажите корректную дату' },
    )
    .refine(
      (value) => {
        if (!value) return true
        const date = new Date(value)
        return date.getTime() >= Date.now() - 60_000
      },
      { message: 'Выберите дату и время в будущем' },
    ),
  comment: z
    .string()
    .max(1000, 'Комментарий не должен превышать 1000 символов')
    .optional()
    .or(z.literal('')),
  consent: z
    .boolean({
      required_error: 'Необходимо согласие на обработку персональных данных',
    })
    .refine((value) => value === true, {
      message: 'Необходимо согласие на обработку персональных данных',
    }),
  /** Honeypot — checked in API; non-empty values get a fake success */
  website: z.string().max(200).optional().or(z.literal('')),
})

export type AppointmentFormValues = z.infer<typeof appointmentSchema>

export function normalizeAppointmentValues(values: AppointmentFormValues) {
  return {
    ...values,
    phone: `+7${getPhoneDigits(values.phone)}`,
  }
}
