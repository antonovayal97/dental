import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'updatedAt'],
    description: 'Администраторы и редакторы сайта',
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: async ({ req }) => {
      if (req.user) return true
      const users = await req.payload.find({
        collection: 'users',
        limit: 0,
        overrideAccess: true,
      })
      return users.totalDocs === 0
    },
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
  ],
}
