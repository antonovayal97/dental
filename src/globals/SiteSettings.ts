import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  admin: {
    description: 'Основные контактные данные и брендинг клиники',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'clinicName',
      type: 'text',
      label: 'Название клиники',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Адрес',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      label: 'Город',
      required: true,
    },
    {
      name: 'district',
      type: 'text',
      label: 'Район',
    },
    {
      name: 'workingHours',
      type: 'array',
      label: 'Часы работы',
      labels: {
        singular: 'День',
        plural: 'Часы работы',
      },
      fields: [
        {
          name: 'day',
          type: 'text',
          label: 'День',
          required: true,
          admin: {
            description: 'Например: Пн–Пт или Суббота',
          },
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Часы',
          required: true,
          admin: {
            description: 'Например: 9:00–21:00',
          },
        },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Соцсети',
      fields: [
        {
          name: 'telegram',
          type: 'text',
          label: 'Telegram',
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp',
        },
        {
          name: 'vk',
          type: 'text',
          label: 'VK',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube',
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      label: 'URL встраиваемой карты',
      admin: {
        description:
          'Опциональный iframe/embed URL (Яндекс/Google). Без него карта не загружается.',
      },
    },
    {
      name: 'defaultSEO',
      type: 'group',
      label: 'SEO по умолчанию',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG Image',
        },
      ],
    },
    {
      name: 'ctaPrimaryText',
      type: 'text',
      label: 'Основной CTA',
      defaultValue: 'Записаться на приём',
    },
    {
      name: 'ctaSecondaryText',
      type: 'text',
      label: 'Вторичный CTA',
      defaultValue: 'Узнать цены',
    },
    {
      name: 'trustStats',
      type: 'array',
      label: 'Статистика доверия',
      labels: {
        singular: 'Показатель',
        plural: 'Показатели',
      },
      admin: {
        description: 'Демо-плейсхолдеры для блока доверия (можно заменить реальными данными)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Подпись',
          required: true,
          admin: {
            description: 'Демо-плейсхолдер: например «лет опыта»',
          },
        },
        {
          name: 'value',
          type: 'text',
          label: 'Значение',
          required: true,
          admin: {
            description: 'Демо-плейсхолдер: например «15+»',
          },
        },
      ],
    },
  ],
}
