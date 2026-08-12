import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  label: 'Подвал сайта',
  admin: {
    description: 'Описание, колонки ссылок и копирайт в подвале',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      admin: {
        description: 'Краткий текст о клинике в подвале',
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Колонки',
      labels: {
        singular: 'Колонка',
        plural: 'Колонки',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок колонки',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Ссылки',
          labels: {
            singular: 'Ссылка',
            plural: 'Ссылки',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Текст',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'Ссылка',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Копирайт',
      admin: {
        description: 'Например: © 2026 Название клиники',
      },
    },
  ],
}
