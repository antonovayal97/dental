import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { sectionHeadingFields, trustBarIconOptions } from '../fields/homepage'

export const HomepageSettings: GlobalConfig = {
  slug: 'homepage-settings',
  label: 'Главная страница',
  admin: {
    description:
      'Тексты, изображения и видимость блоков главной. Списки услуг/врачей/отзывов редактируются в соответствующих коллекциях.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: 'SEO главной',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  admin: {
                    description:
                      'Если пусто — берётся title из SEO / настроек сайта',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  defaultValue:
                    'Современная стоматология: услуги, врачи, кейсы и запись на консультацию.',
                },
              ],
            },
          ],
        },
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Показывать',
                  defaultValue: true,
                },
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Надзаголовок',
                  defaultValue: 'Современная стоматология',
                },
                {
                  name: 'title',
                  type: 'textarea',
                  label: 'Заголовок',
                  defaultValue:
                    'Здоровая улыбка,\nк которой хочется возвращаться',
                  admin: {
                    description: 'Можно использовать перенос строки',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'textarea',
                  label: 'Подзаголовок',
                  defaultValue:
                    'Спокойный приём, понятный план лечения и аккуратная работа без лишней суеты — в атмосфере премиального ухода.',
                },
                {
                  name: 'primaryCtaLabel',
                  type: 'text',
                  label: 'Текст основной кнопки',
                  defaultValue: 'Записаться на консультацию',
                },
                {
                  name: 'secondaryCtaLabel',
                  type: 'text',
                  label: 'Текст вторичной кнопки',
                  defaultValue: 'Посмотреть услуги',
                },
                {
                  name: 'secondaryCtaHref',
                  type: 'text',
                  label: 'Ссылка вторичной кнопки',
                  defaultValue: '/services',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Главное изображение',
                },
                {
                  name: 'imageAlt',
                  type: 'text',
                  label: 'Alt изображения',
                  defaultValue:
                    'Атмосфера современной стоматологической клиники',
                },
                {
                  name: 'statsLabel',
                  type: 'text',
                  label: 'Подпись к статистике',
                  defaultValue: 'Показатели клиники',
                },
              ],
            },
          ],
        },
        {
          label: 'Trust bar',
          fields: [
            {
              name: 'trustBar',
              type: 'group',
              label: 'Полоса преимуществ',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Показывать',
                  defaultValue: true,
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Пункты',
                  labels: {
                    singular: 'Пункт',
                    plural: 'Пункты',
                  },
                  maxRows: 6,
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      label: 'Иконка',
                      options: trustBarIconOptions,
                      defaultValue: 'doctors',
                      required: true,
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Заголовок',
                      required: true,
                    },
                    {
                      name: 'description',
                      type: 'text',
                      label: 'Описание',
                    },
                  ],
                  defaultValue: [
                    {
                      icon: 'doctors',
                      title: 'Опытные врачи',
                      description:
                        'Узкая специализация и понятный план лечения',
                    },
                    {
                      icon: 'equipment',
                      title: 'Современное оборудование',
                      description: 'Цифровая диагностика и точная работа',
                    },
                    {
                      icon: 'guarantee',
                      title: 'Гарантия на лечение',
                      description: 'Условия фиксируем до начала работ',
                    },
                    {
                      icon: 'plan',
                      title: 'Индивидуальный план',
                      description: 'Лечение под вашу клиническую ситуацию',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Услуги',
          fields: [
            {
              name: 'services',
              type: 'group',
              label: 'Услуги',
              fields: [
                ...sectionHeadingFields({
                  eyebrow: 'Услуги',
                  title: 'Направления, в которых мы сильны',
                  description:
                    'От гигиены и терапии до имплантации и ортодонтии — спокойный путь к результату.',
                }),
                {
                  name: 'limit',
                  type: 'number',
                  label: 'Сколько карточек показать',
                  defaultValue: 9,
                  min: 1,
                  max: 24,
                },
              ],
            },
          ],
        },
        {
          label: 'Почему мы',
          fields: [
            {
              name: 'whyUs',
              type: 'group',
              label: 'Почему мы',
              fields: sectionHeadingFields({
                eyebrow: 'Почему мы',
                title: 'Почему пациенты выбирают нас',
                description:
                  'Не громкие обещания — спокойный процесс, прозрачность и внимание к деталям на каждом этапе.',
              }),
            },
          ],
        },
        {
          label: 'Врачи',
          fields: [
            {
              name: 'doctors',
              type: 'group',
              label: 'Врачи',
              fields: [
                ...sectionHeadingFields({
                  eyebrow: 'Команда',
                  title: 'Врачи, с которыми спокойно',
                  description:
                    'Специалисты с понятной коммуникацией и вниманием к деталям — без спешки и шаблонных решений.',
                }),
                {
                  name: 'limit',
                  type: 'number',
                  label: 'Сколько врачей показать',
                  defaultValue: 6,
                  min: 1,
                  max: 24,
                },
              ],
            },
          ],
        },
        {
          label: 'Технологии',
          fields: [
            {
              name: 'technology',
              type: 'group',
              label: 'Технологии',
              fields: sectionHeadingFields({
                eyebrow: 'Технологии',
                title: 'Технологии, которые помогают лечить точнее',
                description:
                  'Цифровая диагностика и современное оборудование — меньше догадок, больше контроля на каждом этапе.',
              }),
            },
          ],
        },
        {
          label: 'Кейсы',
          fields: [
            {
              name: 'cases',
              type: 'group',
              label: 'Кейсы до/после',
              fields: [
                ...sectionHeadingFields({
                  eyebrow: 'Кейсы',
                  title: 'До и после — честный результат',
                  description:
                    'Подборка работ, где видно путь от исходной ситуации к аккуратному финалу.',
                }),
                {
                  name: 'disclaimer',
                  type: 'textarea',
                  label: 'Дисклеймер',
                  defaultValue:
                    'Результаты индивидуальны и зависят от клинической ситуации. Примеры работ носят ознакомительный характер.',
                },
                {
                  name: 'limit',
                  type: 'number',
                  label: 'Сколько кейсов показать',
                  defaultValue: 4,
                  min: 1,
                  max: 12,
                },
              ],
            },
          ],
        },
        {
          label: 'Отзывы',
          fields: [
            {
              name: 'reviews',
              type: 'group',
              label: 'Отзывы',
              fields: [
                ...sectionHeadingFields({
                  eyebrow: 'Отзывы',
                  title: 'Что говорят пациенты',
                  description:
                    'Реальные впечатления о приёме, коммуникации и результате.',
                }),
                {
                  name: 'limit',
                  type: 'number',
                  label: 'Сколько отзывов показать',
                  defaultValue: 8,
                  min: 1,
                  max: 24,
                },
              ],
            },
          ],
        },
        {
          label: 'О клинике',
          fields: [
            {
              name: 'about',
              type: 'group',
              label: 'О клинике (превью)',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Показывать секцию',
                  defaultValue: true,
                },
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Надзаголовок',
                  defaultValue: 'О клинике',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Заголовок',
                  defaultValue: 'О клинике Aura Dental',
                },
                {
                  name: 'blurb',
                  type: 'textarea',
                  label: 'Текст',
                  defaultValue:
                    'Aura Dental — демо-описание современной стоматологической клиники. Мы показываем, как выглядит спокойный, прозрачный и аккуратный путь пациента: от диагностики до понятного плана лечения и комфортного сопровождения.',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Изображение',
                },
                {
                  name: 'ctaLabel',
                  type: 'text',
                  label: 'Текст кнопки',
                  defaultValue: 'Подробнее о клинике',
                },
                {
                  name: 'ctaHref',
                  type: 'text',
                  label: 'Ссылка кнопки',
                  defaultValue: '/about',
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faq',
              type: 'group',
              label: 'FAQ',
              fields: [
                ...sectionHeadingFields({
                  eyebrow: 'FAQ',
                  title: 'Частые вопросы',
                  description:
                    'Короткие ответы о первом визите, подготовке и стоимости — без лишней воды.',
                }),
                {
                  name: 'limit',
                  type: 'number',
                  label: 'Сколько вопросов показать',
                  defaultValue: 8,
                  min: 1,
                  max: 30,
                },
              ],
            },
          ],
        },
        {
          label: 'Блог',
          fields: [
            {
              name: 'blog',
              type: 'group',
              label: 'Блог',
              fields: [
                ...sectionHeadingFields({
                  eyebrow: 'Блог',
                  title: 'Полезные материалы для пациентов',
                  description:
                    'Короткие статьи о подготовке к приёму, профилактике и этапах лечения.',
                }),
                {
                  name: 'limit',
                  type: 'number',
                  label: 'Сколько статей показать',
                  defaultValue: 3,
                  min: 1,
                  max: 12,
                },
              ],
            },
          ],
        },
        {
          label: 'Запись (CTA)',
          fields: [
            {
              name: 'cta',
              type: 'group',
              label: 'Блок записи',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Показывать',
                  defaultValue: true,
                },
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Надзаголовок',
                  defaultValue: 'Запись',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Заголовок',
                  defaultValue: 'Запишитесь на консультацию',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Описание',
                  defaultValue:
                    'Оставьте контакты — администратор перезвонит, уточнит задачу и подберёт удобное время.',
                },
                {
                  name: 'benefits',
                  type: 'array',
                  label: 'Пункты преимуществ',
                  labels: {
                    singular: 'Пункт',
                    plural: 'Пункты',
                  },
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      label: 'Текст',
                      required: true,
                    },
                  ],
                  defaultValue: [
                    {
                      text: 'Без навязчивых продаж — сначала диагностика и план',
                    },
                    {
                      text: 'Понятные этапы и ориентиры по стоимости',
                    },
                    {
                      text: 'Спокойный ритм приёма и бережный подход',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Контакты',
          fields: [
            {
              name: 'contacts',
              type: 'group',
              label: 'Контакты (превью)',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Показывать',
                  defaultValue: true,
                },
                {
                  name: 'eyebrow',
                  type: 'text',
                  label: 'Надзаголовок',
                  defaultValue: 'Контакты',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Описание',
                  defaultValue:
                    'Приезжайте в удобное время или оставьте заявку — поможем сориентироваться по услугам и записи.',
                },
                {
                  name: 'ctaLabel',
                  type: 'text',
                  label: 'Текст кнопки',
                  defaultValue: 'Все контакты',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
