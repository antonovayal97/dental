import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'service', 'preferredDate', 'status', 'createdAt'],
    description: 'Заявки на запись с сайта. Публичное создание только через /api/appointments.',
  },
  access: {
    // Public creates only via /api/appointments (Local API + overrideAccess)
    create: () => false,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
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
      admin: {
        description: 'Необязательный email для связи',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Услуга',
      admin: {
        description: 'Желаемая услуга (необязательно)',
      },
    },
    {
      name: 'preferredDate',
      type: 'date',
      label: 'Желаемая дата',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm',
        },
      },
    },
    {
      name: 'comment',
      type: 'textarea',
      label: 'Комментарий',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'Связались', value: 'contacted' },
        { label: 'Подтверждена', value: 'confirmed' },
        { label: 'Завершена', value: 'completed' },
        { label: 'Отменена', value: 'cancelled' },
      ],
      access: {
        update: ({ req: { user } }) => Boolean(user),
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'consent',
      type: 'checkbox',
      label: 'Согласие на обработку персональных данных',
      required: true,
      defaultValue: false,
      admin: {
        description: 'Пациент дал согласие на обработку ПДн',
      },
    },
  ],
}
