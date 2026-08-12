import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const ServiceCategories: CollectionConfig = {
  slug: 'service-categories',
  labels: {
    singular: 'Категория услуг',
    plural: 'Категории услуг',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    description: 'Группы стоматологических услуг',
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
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
      admin: {
        description: 'Чем меньше число, тем выше в списке',
        position: 'sidebar',
      },
    },
  ],
}
