import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'Вопрос',
    plural: 'Частые вопросы',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'updatedAt'],
    description: 'Часто задаваемые вопросы пациентов',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      label: 'Вопрос',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      label: 'Ответ',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      required: true,
      defaultValue: 'general',
      options: [
        { label: 'Общие', value: 'general' },
        { label: 'Лечение', value: 'treatment' },
        { label: 'Цены', value: 'prices' },
        { label: 'Подготовка', value: 'preparation' },
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
    {
      name: 'relatedService',
      type: 'relationship',
      relationTo: 'services',
      label: 'Связанная услуга',
      admin: {
        description: 'Опциональная привязка к услуге',
      },
    },
  ],
}
