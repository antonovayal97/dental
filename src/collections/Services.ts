import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Услуга',
    plural: 'Услуги',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'priceFrom', '_status', 'updatedAt'],
    description: 'Стоматологические услуги клиники',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    slugField({ fieldToUse: 'title' }),
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'service-categories',
      label: 'Категория',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Краткое описание',
      required: true,
      admin: {
        description: 'Короткий текст для карточек и списков',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Полное описание',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Изображение',
    },
    {
      name: 'priceFrom',
      type: 'number',
      label: 'Цена от',
      min: 0,
      admin: {
        description: 'Минимальная стоимость услуги в рублях',
      },
    },
    {
      name: 'priceNote',
      type: 'text',
      label: 'Примечание к цене',
      admin: {
        description: 'Например: «точная стоимость после осмотра»',
      },
    },
    {
      name: 'whenNeeded',
      type: 'array',
      label: 'Когда нужна услуга',
      labels: {
        singular: 'Показание',
        plural: 'Показания',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Показание',
          required: true,
        },
      ],
    },
    {
      name: 'process',
      type: 'textarea',
      label: 'Как проходит лечение',
    },
    {
      name: 'stages',
      type: 'array',
      label: 'Этапы',
      labels: {
        singular: 'Этап',
        plural: 'Этапы',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Название этапа',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание этапа',
        },
      ],
    },
    {
      name: 'technologies',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
      label: 'Технологии',
    },
    {
      name: 'doctors',
      type: 'relationship',
      relationTo: 'doctors',
      hasMany: true,
      label: 'Врачи',
    },
    {
      name: 'faq',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      label: 'Частые вопросы',
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Связанные услуги',
      filterOptions: ({ id }) => {
        if (!id) return true
        return { id: { not_equals: id } }
      },
    },
    seoField(),
  ],
}
