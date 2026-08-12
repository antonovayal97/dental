import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: {
    singular: 'Кейс',
    plural: 'Кейсы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'service', 'doctor', '_status', 'updatedAt'],
    description: 'Примеры работ «до / после»',
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
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Услуга',
      required: true,
    },
    {
      name: 'doctor',
      type: 'relationship',
      relationTo: 'doctors',
      label: 'Врач',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      required: true,
    },
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото «до»',
      required: true,
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото «после»',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Срок лечения',
      admin: {
        description: 'Например: «2 визита» или «3 недели»',
      },
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      label: 'Дисклеймер',
      admin: {
        description: 'Юридическая оговорка: результаты индивидуальны и т.п.',
      },
    },
    seoField(),
  ],
}
