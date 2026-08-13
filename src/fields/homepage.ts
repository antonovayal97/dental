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

export const technologyIconOptions = [
  { label: 'Сканирование', value: 'scan' },
  { label: 'Микроскоп', value: 'microscope' },
  { label: 'CAD/CAM', value: 'cadcam' },
  { label: 'Анестезия', value: 'anesthesia' },
  { label: 'Стерилизация', value: 'sterilization' },
  { label: 'Диагностика', value: 'diagnostics' },
]

/** Карточки блока «Технологии» (главная и «О клинике»). */
export const technologyItemFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Название',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Описание',
    required: true,
  },
  {
    name: 'icon',
    type: 'select',
    label: 'Иконка',
    required: true,
    options: technologyIconOptions,
    defaultValue: 'scan',
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Изображение',
    admin: {
      description: 'Опциональное фото оборудования',
    },
  },
]
