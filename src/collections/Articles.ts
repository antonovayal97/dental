import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '../access'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Статья',
    plural: 'Статьи',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status', 'updatedAt'],
    description: 'Статьи блога и полезные материалы',
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
      label: 'Заголовок',
      required: true,
    },
    slugField({ fieldToUse: 'title' }),
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Анонс',
      required: true,
      admin: {
        description: 'Краткое описание для карточек и превью',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Содержание',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Автор',
      admin: {
        description: 'Имя автора статьи',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'article-categories',
      label: 'Категория',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm',
        },
      },
    },
    seoField(),
  ],
}
