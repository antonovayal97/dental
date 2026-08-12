import { DEMO_SERVICES } from '@/lib/demo-content'

export type ServiceOption = {
  label: string
  value: string
}

export function mapServiceOptions(
  items: Array<{ title?: unknown; slug?: unknown }>,
): ServiceOption[] {
  return items
    .filter((item) => item.title && item.slug)
    .map((item) => ({
      label: String(item.title),
      value: String(item.slug),
    }))
}

export function getDefaultServiceOptions(): ServiceOption[] {
  return mapServiceOptions(DEMO_SERVICES)
}
