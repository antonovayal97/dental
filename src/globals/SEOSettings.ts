import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const SEOSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: 'SEO-настройки',
  admin: {
    description: 'Глобальные SEO-параметры сайта',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Название сайта',
      required: true,
    },
    {
      name: 'defaultTitle',
      type: 'text',
      label: 'Title по умолчанию',
      required: true,
    },
    {
      name: 'titleTemplate',
      type: 'text',
      label: 'Шаблон title',
      defaultValue: '%s | {{siteName}}',
      admin: {
        description: 'Используйте %s для подстановки заголовка страницы',
      },
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      label: 'Description по умолчанию',
      required: true,
    },
    {
      name: 'robotsIndex',
      type: 'checkbox',
      label: 'Разрешить индексацию',
      defaultValue: true,
      admin: {
        description: 'Если выключено — сайт будет с noindex',
      },
    },
    {
      name: 'googleSiteVerification',
      type: 'text',
      label: 'Google Site Verification',
      admin: {
        description: 'Код верификации Google Search Console',
      },
    },
  ],
}
