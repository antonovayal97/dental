import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const ClinicAdvantages: CollectionConfig = {
  slug: 'clinic-advantages',
  labels: {
    singular: 'Преимущество',
    plural: 'Преимущества клиники',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order', 'updatedAt'],
    description: 'Ключевые преимущества клиники для сайта',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
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
      options: [
        { label: 'Оборудование', value: 'equipment' },
        { label: 'Цифровые технологии', value: 'digital' },
        { label: 'Стерильность', value: 'sterile' },
        { label: 'Специалисты', value: 'specialists' },
        { label: 'Цены', value: 'pricing' },
        { label: 'План лечения', value: 'plan' },
        { label: 'Гарантия', value: 'guarantee' },
        { label: 'Комфорт', value: 'comfort' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Чем меньше число, тем выше в списке',
      },
    },
  ],
}
