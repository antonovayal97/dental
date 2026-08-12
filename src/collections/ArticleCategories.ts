import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const ArticleCategories: CollectionConfig = {
  slug: 'article-categories',
  labels: {
    singular: 'Категория статей',
    plural: 'Категории статей',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    description: 'Рубрики блога и полезных материалов',
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
  ],
}
