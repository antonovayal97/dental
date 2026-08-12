import type { Field } from 'payload'

/**
 * Reusable SEO group: metaTitle, metaDescription, ogImage, canonical.
 */
export const seoField = (): Field => {
  return {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    admin: {
      description: 'Метаданные для поисковых систем и социальных сетей',
    },
    fields: [
      {
        name: 'metaTitle',
        type: 'text',
        label: 'Meta Title',
        admin: {
          description: 'Заголовок страницы в поисковой выдаче (рекомендуется до 60 символов)',
        },
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        label: 'Meta Description',
        admin: {
          description: 'Описание для сниппета в поиске (рекомендуется до 160 символов)',
        },
      },
      {
        name: 'ogImage',
        type: 'upload',
        relationTo: 'media',
        label: 'OG Image',
        admin: {
          description: 'Изображение для превью в соцсетях (рекомендуется 1200×630)',
        },
      },
      {
        name: 'canonical',
        type: 'text',
        label: 'Canonical URL',
        admin: {
          description: 'Канонический URL страницы (если отличается от текущего)',
        },
      },
    ],
  }
}
