import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { technologyIconOptions } from '../fields/homepage'
import { slugField } from '../fields/slug'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  labels: {
    singular: 'Технология',
    plural: 'Технологии',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order', 'updatedAt'],
    description:
      'Справочник технологий для привязки к услугам. Карточки блока на главной и «О клинике» редактируются в «Главная страница → Технологии».',
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
    slugField({ fieldToUse: 'title' }),
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
