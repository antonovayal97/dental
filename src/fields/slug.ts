import type { FieldHook, TextField } from 'payload'

const translitMap: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
}

export const formatSlug = (value: string): string => {
  return value
    .toLowerCase()
    .split('')
    .map((char) => translitMap[char] ?? char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

const createSlugHook =
  (fieldToUse: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value.length > 0) {
      return formatSlug(value)
    }

    if (operation === 'create' || !value) {
      const fallback = data?.[fieldToUse]

      if (typeof fallback === 'string' && fallback.length > 0) {
        return formatSlug(fallback)
      }
    }

    return value
  }

type SlugFieldArgs = {
  /** Source field for auto-generation (`title` or `name`) */
  fieldToUse?: 'title' | 'name' | (string & {})
}

/**
 * Reusable slug field. Auto-generates from `title` or `name` on create.
 */
export const slugField = ({ fieldToUse = 'title' }: SlugFieldArgs = {}): TextField => {
  return {
    name: 'slug',
    type: 'text',
    label: 'Slug',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'URL-идентификатор. Генерируется автоматически из названия.',
    },
    hooks: {
      beforeValidate: [createSlugHook(fieldToUse)],
    },
  }
}
