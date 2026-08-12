import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  labels: {
    singular: 'Врач',
    plural: 'Врачи',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'specialization', '_status', 'updatedAt'],
    description: 'Профили врачей клиники',
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
      name: 'name',
      type: 'text',
      label: 'ФИО',
      required: true,
    },
    slugField({ fieldToUse: 'name' }),
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
    },
    {
      name: 'position',
      type: 'text',
      label: 'Должность',
      required: true,
    },
    {
      name: 'specialization',
      type: 'text',
      label: 'Специализация',
      required: true,
    },
    {
      name: 'experienceYears',
      type: 'number',
      label: 'Стаж (лет)',
      min: 0,
      admin: {
        description: 'Количество лет опыта работы',
      },
    },
    {
      name: 'education',
      type: 'array',
      label: 'Образование',
      labels: {
        singular: 'Запись',
        plural: 'Образование',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Учебное заведение / курс',
          required: true,
        },
      ],
    },
    {
      name: 'certificates',
      type: 'array',
      label: 'Сертификаты',
      labels: {
        singular: 'Сертификат',
        plural: 'Сертификаты',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Название сертификата',
          required: true,
        },
      ],
    },
    {
      name: 'approach',
      type: 'textarea',
      label: 'Подход к лечению',
      admin: {
        description: 'Краткое описание философии и подхода врача',
      },
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Услуги',
      admin: {
        description: 'Услуги, которые оказывает врач',
      },
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Категории',
      labels: {
        singular: 'Категория',
        plural: 'Категории',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Категория',
          required: true,
        },
      ],
    },
    seoField(),
  ],
}
