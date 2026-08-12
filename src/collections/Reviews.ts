import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Отзыв',
    plural: 'Отзывы',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'rating', 'date', 'isFeatured', 'isDemo'],
    description: 'Отзывы пациентов о клинике',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя пациента',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст отзыва',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Оценка',
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: 'Оценка от 1 до 5',
      },
    },
    {
      name: 'date',
      type: 'date',
      label: 'Дата',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Услуга',
    },
    {
      name: 'doctor',
      type: 'relationship',
      relationTo: 'doctors',
      label: 'Врач',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
      admin: {
        description: 'Опциональное фото пациента или кейса',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Избранный отзыв',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Показывать на главной и в выделенных блоках',
      },
    },
    {
      name: 'isDemo',
      type: 'checkbox',
      label: 'Демо-отзыв',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Пометить как демонстрационный / placeholder-контент',
      },
    },
  ],
}
