import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const HeaderSettings: GlobalConfig = {
  slug: 'header-settings',
  label: 'Шапка сайта',
  admin: {
    description: 'Настройки навигации и CTA в шапке',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'showPhone',
      type: 'checkbox',
      label: 'Показывать телефон',
      defaultValue: true,
      admin: {
        description: 'Отображать телефон клиники в шапке',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Текст кнопки CTA',
      defaultValue: 'Записаться',
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Пункты меню',
      labels: {
        singular: 'Ссылка',
        plural: 'Пункты меню',
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
          admin: {
            description: 'Путь или URL, например /services',
          },
        },
      ],
    },
  ],
}
