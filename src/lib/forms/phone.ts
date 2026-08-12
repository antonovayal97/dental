/** Извлекает 10 цифр номера без кода страны. */
export function getPhoneDigits(value: string): string {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    return digits.slice(1)
  }

  if (digits.length === 10) return digits

  if (digits.startsWith('7') || digits.startsWith('8')) {
    return digits.slice(1, 11)
  }

  return digits.slice(0, 10)
}

/** Маска +7 (999) 123-45-67 при вводе. */
export function formatPhoneInput(value: string): string {
  const digits = getPhoneDigits(value)
  if (digits.length === 0) return ''

  let formatted = '+7'

  if (digits.length > 0) {
    formatted += ` (${digits.slice(0, 3)}`
  }
  if (digits.length >= 3) {
    formatted += ')'
  }
  if (digits.length > 3) {
    formatted += ` ${digits.slice(3, 6)}`
  }
  if (digits.length > 6) {
    formatted += `-${digits.slice(6, 8)}`
  }
  if (digits.length > 8) {
    formatted += `-${digits.slice(8, 10)}`
  }

  return formatted
}

export function isCompletePhone(value: string): boolean {
  return getPhoneDigits(value).length === 10
}

export function normalizePhoneForSubmit(value: string): string {
  const digits = getPhoneDigits(value)
  return digits.length === 10 ? `+7${digits}` : value.trim()
}
