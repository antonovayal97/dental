import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Prices: CollectionConfig = {
  slug: 'prices',
  labels: {
    singular: 'Цена',
    plural: 'Цены',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'priceFrom', 'isFeatured', 'order'],
    description: 'Прайс-лист услуг',
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
      label: 'Название',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'service-categories',
      label: 'Категория',
      required: true,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Услуга',
      admin: {
        description: 'Опциональная привязка к карточке услуги',
      },
    },
    {
      name: 'priceFrom',
      type: 'number',
      label: 'Цена от',
      required: true,
      min: 0,
    },
    {
      name: 'unit',
      type: 'text',
      label: 'Единица',
      defaultValue: '₽',
      admin: {
        description: 'Валюта или единица измерения',
      },
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
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Избранная позиция',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Показывать в выделенном блоке прайса',
      },
    },
  ],
}
