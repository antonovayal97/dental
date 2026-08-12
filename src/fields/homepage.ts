import type { Field } from 'payload'

/** Общие поля заголовка секции на главной. */
export function sectionHeadingFields(defaults: {
  eyebrow?: string
  title: string
  description?: string
}): Field[] {
  return [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Показывать секцию',
      defaultValue: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Надзаголовок',
      defaultValue: defaults.eyebrow,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: defaults.title,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      defaultValue: defaults.description,
    },
  ]
}

export const trustBarIconOptions = [
  { label: 'Врач', value: 'doctors' },
  { label: 'Оборудование', value: 'equipment' },
  { label: 'Гарантия', value: 'guarantee' },
  { label: 'План лечения', value: 'plan' },
  { label: 'Диагностика', value: 'diagnostics' },
  { label: 'Комфорт', value: 'comfort' },
  { label: 'Стерильность', value: 'sterile' },
  { label: 'Цифра', value: 'digital' },
]
