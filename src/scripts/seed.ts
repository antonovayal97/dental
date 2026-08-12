import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com'
    const password = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'
    await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name: 'Администратор',
      },
    })
    console.log(`Created admin user: ${email}`)
  } else {
    console.log('Admin user already exists, skipping')
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      clinicName: 'Aura Dental',
      phone: '+7 (000) 000-00-00',
      email: 'hello@example.com',
      address: 'г. Примерск, ул. Демонстрационная, 1',
      city: 'Примерск',
      district: 'Центральный',
      workingHours: [
        { day: 'Пн–Пт', hours: '09:00–21:00' },
        { day: 'Сб', hours: '10:00–18:00' },
        { day: 'Вс', hours: 'По записи' },
      ],
      ctaPrimaryText: 'Записаться на консультацию',
      ctaSecondaryText: 'Посмотреть услуги',
      trustStats: [
        { label: 'лет опыта', value: '15+' },
        { label: 'пациентов', value: '10 000+' },
        { label: 'рейтинг', value: '4.9/5' },
      ],
      defaultSEO: {
        title: 'Aura Dental — современная стоматология',
        description:
          'Премиальная стоматологическая клиника: диагностика, терапия, имплантация, ортодонтия и эстетика. Запись на консультацию онлайн.',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'header-settings',
    data: {
      showPhone: true,
      ctaText: 'Записаться',
      navLinks: [
        { label: 'Услуги', href: '/services' },
        { label: 'Врачи', href: '/doctors' },
        { label: 'Цены', href: '/prices' },
        { label: 'О клинике', href: '/about' },
        { label: 'Контакты', href: '/contacts' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer-settings',
    data: {
      description:
        'Aura Dental — демо-сайт современной стоматологии. Все контактные данные и отзывы являются демонстрационными.',
      copyright: '© Aura Dental (демо). Все права защищены.',
      columns: [
        {
          title: 'Пациентам',
          links: [
            { label: 'Услуги', href: '/services' },
            { label: 'Цены', href: '/prices' },
            { label: 'Кейсы', href: '/cases' },
            { label: 'Блог', href: '/blog' },
          ],
        },
        {
          title: 'Клиника',
          links: [
            { label: 'О клинике', href: '/about' },
            { label: 'Врачи', href: '/doctors' },
            { label: 'Контакты', href: '/contacts' },
            { label: 'Конфиденциальность', href: '/privacy' },
          ],
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'seo-settings',
    data: {
      siteName: 'Aura Dental',
      defaultTitle: 'Aura Dental — современная стоматология',
      titleTemplate: '%s — Aura Dental',
      defaultDescription:
        'Современная стоматология с акцентом на диагностику, комфорт и прозрачный план лечения.',
      robotsIndex: false,
    },
  })

  await payload.updateGlobal({
    slug: 'homepage-settings',
    data: {
      seo: {
        description:
          'Современная стоматология: услуги, врачи, кейсы и запись на консультацию.',
      },
      hero: {
        enabled: true,
        eyebrow: 'Современная стоматология',
        title: 'Здоровая улыбка,\nк которой хочется возвращаться',
        subtitle:
          'Спокойный приём, понятный план лечения и аккуратная работа без лишней суеты — в атмосфере премиального ухода.',
        primaryCtaLabel: 'Записаться на консультацию',
        secondaryCtaLabel: 'Посмотреть услуги',
        secondaryCtaHref: '/services',
        statsLabel: 'Показатели клиники',
        imageAlt: 'Атмосфера современной стоматологической клиники',
      },
      trustBar: {
        enabled: true,
        items: [
          {
            icon: 'doctors',
            title: 'Опытные врачи',
            description: 'Узкая специализация и понятный план лечения',
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
      services: {
        enabled: true,
        eyebrow: 'Услуги',
        title: 'Направления, в которых мы сильны',
        description:
          'От гигиены и терапии до имплантации и ортодонтии — спокойный путь к результату.',
        limit: 9,
      },
      whyUs: {
        enabled: true,
        eyebrow: 'Почему мы',
        title: 'Почему пациенты выбирают нас',
        description:
          'Не громкие обещания — спокойный процесс, прозрачность и внимание к деталям на каждом этапе.',
      },
      doctors: {
        enabled: true,
        eyebrow: 'Команда',
        title: 'Врачи, с которыми спокойно',
        description:
          'Специалисты с понятной коммуникацией и вниманием к деталям — без спешки и шаблонных решений.',
        limit: 6,
      },
      technology: {
        enabled: true,
        eyebrow: 'Технологии',
        title: 'Технологии, которые помогают лечить точнее',
        description:
          'Цифровая диагностика и современное оборудование — меньше догадок, больше контроля на каждом этапе.',
      },
      cases: {
        enabled: true,
        eyebrow: 'Кейсы',
        title: 'До и после — честный результат',
        description:
          'Подборка работ, где видно путь от исходной ситуации к аккуратному финалу.',
        disclaimer:
          'Результаты индивидуальны и зависят от клинической ситуации. Примеры работ носят ознакомительный характер.',
        limit: 4,
      },
      reviews: {
        enabled: true,
        eyebrow: 'Отзывы',
        title: 'Что говорят пациенты',
        description:
          'Реальные впечатления о приёме, коммуникации и результате лечения.',
        limit: 8,
      },
      about: {
        enabled: true,
        eyebrow: 'О клинике',
        title: 'О клинике Aura Dental',
        blurb:
          'Aura Dental — демо-описание современной стоматологической клиники. Мы показываем, как выглядит спокойный, прозрачный и аккуратный путь пациента: от диагностики до понятного плана лечения и комфортного сопровождения.',
        ctaLabel: 'Подробнее о клинике',
        ctaHref: '/about',
      },
      faq: {
        enabled: true,
        eyebrow: 'FAQ',
        title: 'Частые вопросы',
        description:
          'Короткие ответы о первом визите, подготовке и стоимости — без лишней воды.',
        limit: 8,
      },
      blog: {
        enabled: true,
        eyebrow: 'Блог',
        title: 'Полезные материалы для пациентов',
        description:
          'Короткие статьи о подготовке к приёму, профилактике и этапах лечения.',
        limit: 3,
      },
      cta: {
        enabled: true,
        eyebrow: 'Запись',
        title: 'Запишитесь на консультацию',
        description:
          'Оставьте контакты — администратор перезвонит, уточнит задачу и подберёт удобное время.',
        benefits: [
          { text: 'Без навязчивых продаж — сначала диагностика и план' },
          { text: 'Понятные этапы и ориентиры по стоимости' },
          { text: 'Спокойный ритм приёма и бережный подход' },
        ],
      },
      contacts: {
        enabled: true,
        eyebrow: 'Контакты',
        description:
          'Приезжайте в удобное время или оставьте заявку — поможем сориентироваться по услугам и записи.',
        ctaLabel: 'Все контакты и схема проезда',
      },
    },
  })
  console.log('Homepage settings updated')

  const categories = [
    { title: 'Терапия', slug: 'therapy', order: 1 },
    { title: 'Имплантация', slug: 'implantation', order: 2 },
    { title: 'Протезирование', slug: 'prosthetics', order: 3 },
    { title: 'Ортодонтия', slug: 'orthodontics', order: 4 },
    { title: 'Эстетическая стоматология', slug: 'aesthetic', order: 5 },
    { title: 'Детская стоматология', slug: 'pediatric', order: 6 },
    { title: 'Хирургия', slug: 'surgery', order: 7 },
    { title: 'Профессиональная гигиена', slug: 'hygiene', order: 8 },
    { title: 'Отбеливание', slug: 'whitening', order: 9 },
  ]

  const categoryIds: Record<string, string> = {}

  for (const category of categories) {
    const existing = await payload.find({
      collection: 'service-categories',
      where: { slug: { equals: category.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      categoryIds[category.slug] = String(existing.docs[0].id)
      continue
    }

    const created = await payload.create({
      collection: 'service-categories',
      data: {
        ...category,
        description: `Демо-категория: ${category.title}`,
      },
    })
    categoryIds[category.slug] = String(created.id)
  }

  const services = [
    {
      title: 'Терапевтическое лечение',
      slug: 'therapy',
      category: 'therapy',
      shortDescription: 'Аккуратное лечение кариеса и каналов с цифровым контролем.',
      description:
        'Терапия в клинике строится вокруг точной диагностики и щадящих протоколов. Мы объясняем план лечения до начала работы.',
      priceFrom: 4500,
      whenNeeded: ['Чувствительность зубов', 'Кариес', 'Боль при накусывании'],
      stages: [
        { title: 'Диагностика', description: 'Осмотр и цифровые снимки при необходимости.' },
        { title: 'План лечения', description: 'Прозрачная смета и сроки.' },
        { title: 'Лечение', description: 'Работа под увеличением и контролем качества.' },
      ],
    },
    {
      title: 'Имплантация',
      slug: 'implantation',
      category: 'implantation',
      shortDescription: 'Восстановление утраченных зубов с опорой на 3D-планирование.',
      description:
        'Имплантация выполняется после оценки костной ткани и общего состояния. Сроки и этапы обсуждаются заранее.',
      priceFrom: 45000,
      whenNeeded: ['Отсутствие зуба', 'Неудобный съёмный протез', 'Разрушение корня'],
      stages: [
        { title: '3D-диагностика', description: 'Планирование позиции импланта.' },
        { title: 'Установка', description: 'Хирургический этап по согласованному плану.' },
        { title: 'Протезирование', description: 'Фиксация постоянной конструкции.' },
      ],
    },
    {
      title: 'Протезирование',
      slug: 'prosthetics',
      category: 'prosthetics',
      shortDescription: 'Коронки и мосты с акцентом на функцию и эстетику.',
      description: 'Подбираем конструкцию под клиническую ситуацию и ожидания пациента.',
      priceFrom: 28000,
    },
    {
      title: 'Ортодонтия',
      slug: 'orthodontics',
      category: 'orthodontics',
      shortDescription: 'Элайнеры и брекеты для комфортного выравнивания.',
      description: 'Ортодонтическое лечение начинается с диагностики прикуса и прогноза сроков.',
      priceFrom: 90000,
    },
    {
      title: 'Эстетическая стоматология',
      slug: 'aesthetic',
      category: 'aesthetic',
      shortDescription: 'Виниры и реставрации для естественной улыбки.',
      description: 'Эстетика без агрессивных обещаний: обсуждаем реалистичный результат.',
      priceFrom: 25000,
    },
    {
      title: 'Детская стоматология',
      slug: 'pediatric',
      category: 'pediatric',
      shortDescription: 'Бережный приём для детей в спокойной атмосфере.',
      description: 'Адаптируем темп приёма и объясняем каждый шаг родителям.',
      priceFrom: 3500,
    },
    {
      title: 'Хирургия',
      slug: 'surgery',
      category: 'surgery',
      shortDescription: 'Удаление и хирургические вмешательства по показаниям.',
      description: 'Хирургия проводится после диагностики и согласования протокола обезболивания.',
      priceFrom: 6000,
    },
    {
      title: 'Профессиональная гигиена',
      slug: 'hygiene',
      category: 'hygiene',
      shortDescription: 'Ультразвук, Air-Flow и рекомендации по уходу.',
      description: 'Гигиена помогает снизить риски воспаления и сохранить результат лечения.',
      priceFrom: 5500,
    },
    {
      title: 'Отбеливание',
      slug: 'whitening',
      category: 'whitening',
      shortDescription: 'Профессиональное отбеливание после оценки эмали.',
      description: 'Перед отбеливанием обязательно оцениваем чувствительность и состояние десен.',
      priceFrom: 18000,
    },
  ]

  for (const service of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: service.slug } },
      limit: 1,
      draft: true,
    })

    if (existing.docs[0]) continue

    await payload.create({
      collection: 'services',
      data: {
        title: service.title,
        slug: service.slug,
        category: categoryIds[service.category],
        shortDescription: service.shortDescription,
        description: service.description,
        priceFrom: service.priceFrom,
        priceNote: 'Точная стоимость определяется после консультации и диагностики.',
        whenNeeded: (service.whenNeeded ?? []).map((item) => ({ item })),
        stages: service.stages,
        _status: 'published',
      },
    })
  }

  const advantages = [
    { title: 'Современное оборудование', description: 'Диагностика и лечение с опорой на актуальные протоколы.', icon: 'equipment' as const, order: 1 },
    { title: 'Цифровая диагностика', description: 'Понятные снимки и объяснение плана лечения.', icon: 'digital' as const, order: 2 },
    { title: 'Стерильность', description: 'Контроль циклов стерилизации и одноразовые расходники.', icon: 'sterile' as const, order: 3 },
    { title: 'Опытные специалисты', description: 'Врачи с профильной подготовкой по направлениям.', icon: 'specialists' as const, order: 4 },
    { title: 'Прозрачная стоимость', description: 'Смета до начала лечения, без скрытых пунктов.', icon: 'pricing' as const, order: 5 },
    { title: 'Индивидуальный план', description: 'Учитываем состояние, сроки и комфорт пациента.', icon: 'plan' as const, order: 6 },
    { title: 'Гарантийные обязательства', description: 'Фиксируем условия гарантии в договоре.', icon: 'guarantee' as const, order: 7 },
    { title: 'Комфорт на приёме', description: 'Спокойный темп, объяснения и внимание к тревожности.', icon: 'comfort' as const, order: 8 },
  ]

  const existingAdvantages = await payload.find({ collection: 'clinic-advantages', limit: 1 })
  if (existingAdvantages.totalDocs === 0) {
    for (const item of advantages) {
      await payload.create({ collection: 'clinic-advantages', data: item })
    }
  }

  const technologies = [
    { title: '3D-диагностика', slug: '3d-diagnostics', description: 'Объёмная визуализация для точного планирования.', icon: 'diagnostics' as const, order: 1 },
    { title: 'Цифровой сканер', slug: 'digital-scanner', description: 'Бесконтактное снятие оттисков.', icon: 'scan' as const, order: 2 },
    { title: 'Операционный микроскоп', slug: 'microscope', description: 'Контроль деталей при эндодонтии и эстетике.', icon: 'microscope' as const, order: 3 },
    { title: 'CAD/CAM', slug: 'cadcam', description: 'Цифровое моделирование реставраций.', icon: 'cadcam' as const, order: 4 },
    { title: 'Современная анестезия', slug: 'anesthesia', description: 'Индивидуальный подбор протокола обезболивания.', icon: 'anesthesia' as const, order: 5 },
    { title: 'Стерилизация', slug: 'sterilization', description: 'Многоступенчатый контроль инструментов.', icon: 'sterilization' as const, order: 6 },
  ]

  for (const tech of technologies) {
    const existing = await payload.find({
      collection: 'technologies',
      where: { slug: { equals: tech.slug } },
      limit: 1,
    })
    if (existing.docs[0]) continue
    await payload.create({ collection: 'technologies', data: tech })
  }

  const faqs = [
    { question: 'Как проходит первый приём?', answer: 'Врач собирает анамнез, проводит осмотр и при необходимости направляет на диагностику. Затем обсуждает варианты лечения и ориентировочную стоимость.', category: 'general' as const, order: 1 },
    { question: 'Нужно ли заранее делать снимок?', answer: 'Не всегда. Если актуальный снимок уже есть, возьмите его с собой. Иначе диагностику назначим по показаниям.', category: 'preparation' as const, order: 2 },
    { question: 'Сколько стоит консультация?', answer: 'Стоимость консультации указана в прайсе и может зависеть от специалиста. Точную сумму подтвердим при записи.', category: 'prices' as const, order: 3 },
    { question: 'Можно ли лечить зубы во время беременности?', answer: 'Многие процедуры возможны после согласования с врачом и с учётом срока. Решение принимается индивидуально.', category: 'treatment' as const, order: 4 },
    { question: 'Как подготовиться к имплантации?', answer: 'Обычно нужны диагностика, оценка общего здоровья и санация полости рта. Детальный чек-лист даст хирург.', category: 'preparation' as const, order: 5 },
    { question: 'Сколько длится лечение?', answer: 'Сроки зависят от диагноза и объёма работ. На консультации вы получите ориентировочный план по этапам.', category: 'treatment' as const, order: 6 },
    { question: 'Есть ли рассрочка?', answer: 'Возможность рассрочки зависит от условий клиники и выбранного плана. Уточните у администратора при записи.', category: 'prices' as const, order: 7 },
  ]

  const existingFaqs = await payload.find({ collection: 'faqs', limit: 1 })
  if (existingFaqs.totalDocs === 0) {
    for (const faq of faqs) {
      await payload.create({ collection: 'faqs', data: faq })
    }
  }

  const doctors = [
    {
      name: 'Анна Орлова',
      slug: 'anna-orlova',
      position: 'Стоматолог-терапевт',
      specialization: 'Терапия, эстетические реставрации',
      experienceYears: 12,
      education: [{ item: 'Демо: профильное образование (замените в CMS)' }],
      approach: 'Спокойно объясняю каждый шаг и согласую план до начала лечения.',
      categories: [{ item: 'Терапия' }, { item: 'Эстетика' }],
    },
    {
      name: 'Игорь Савельев',
      slug: 'igor-savelyev',
      position: 'Хирург-имплантолог',
      specialization: 'Имплантация, хирургия',
      experienceYears: 15,
      education: [{ item: 'Демо: профильное образование (замените в CMS)' }],
      approach: 'Опираюсь на 3D-планирование и реалистичные сроки восстановления.',
      categories: [{ item: 'Имплантация' }, { item: 'Хирургия' }],
    },
    {
      name: 'Мария Ким',
      slug: 'maria-kim',
      position: 'Ортодонт',
      specialization: 'Брекеты и элайнеры',
      experienceYears: 10,
      education: [{ item: 'Демо: профильное образование (замените в CMS)' }],
      approach: 'Строю ортодонтический план вокруг комфорта и предсказуемости.',
      categories: [{ item: 'Ортодонтия' }],
    },
  ]

  for (const doctor of doctors) {
    const existing = await payload.find({
      collection: 'doctors',
      where: { slug: { equals: doctor.slug } },
      limit: 1,
      draft: true,
    })
    if (existing.docs[0]) continue
    await payload.create({
      collection: 'doctors',
      data: { ...doctor, _status: 'published' },
    })
  }

  const existingReviews = await payload.find({ collection: 'reviews', limit: 1 })
  if (existingReviews.totalDocs === 0) {
    await payload.create({
      collection: 'reviews',
      data: {
        name: 'Елена',
        text: 'Демо-отзыв: спокойный приём, всё объяснили заранее. Замените на реальные отзывы пациентов.',
        rating: 5,
        date: new Date().toISOString(),
        isFeatured: true,
        isDemo: true,
      },
    })
    await payload.create({
      collection: 'reviews',
      data: {
        name: 'Артём',
        text: 'Демо-отзыв: удобная запись и понятная смета. Это демонстрационный контент.',
        rating: 5,
        date: new Date().toISOString(),
        isFeatured: true,
        isDemo: true,
      },
    })
  }

  const articleCategory =
    (
      await payload.find({
        collection: 'article-categories',
        where: { slug: { equals: 'patients' } },
        limit: 1,
      })
    ).docs[0] ??
    (await payload.create({
      collection: 'article-categories',
      data: {
        title: 'Пациентам',
        slug: 'patients',
        description: 'Полезные материалы для пациентов',
      },
    }))

  const articles = [
    {
      title: 'Как правильно выбрать имплант',
      slug: 'how-to-choose-implant',
      excerpt: 'На что обратить внимание при выборе системы имплантации вместе с врачом.',
      content:
        'Выбор импланта зависит от клинической картины, плотности кости и плана протезирования. Этот демо-материал нужно заменить экспертным текстом клиники.',
    },
    {
      title: 'Когда необходимо удалять зуб мудрости',
      slug: 'wisdom-tooth-removal',
      excerpt: 'Показания к удалению и вопросы, которые стоит задать хирургу.',
      content:
        'Удаление зуба мудрости требуется не всегда. Решение принимает врач после осмотра и диагностики. Демо-текст для CMS.',
    },
    {
      title: 'Как часто нужна профессиональная гигиена',
      slug: 'professional-hygiene-frequency',
      excerpt: 'Индивидуальный график гигиены и признаки, что визит стоит перенести раньше.',
      content:
        'Частота гигиены зависит от состояния дёсен, скученности зубов и домашних привычек. Демо-статья.',
    },
  ]

  for (const article of articles) {
    const existing = await payload.find({
      collection: 'articles',
      where: { slug: { equals: article.slug } },
      limit: 1,
      draft: true,
    })
    if (existing.docs[0]) continue
    await payload.create({
      collection: 'articles',
      data: {
        ...article,
        category: articleCategory.id,
        author: 'Редакция Aura Dental (демо)',
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    })
  }

  const existingPages = await payload.find({ collection: 'pages', limit: 1 })
  if (existingPages.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Политика конфиденциальности',
        slug: 'privacy',
        content:
          'Это демонстрационный шаблон политики конфиденциальности. Перед публикацией замените текст актуальным юридическим документом клиники.',
      },
    })
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Пользовательское соглашение',
        slug: 'terms',
        content:
          'Это демонстрационный шаблон пользовательского соглашения. Перед публикацией замените текст актуальным юридическим документом клиники.',
      },
    })
  }

  for (const service of services) {
    const existingPrice = await payload.find({
      collection: 'prices',
      where: { title: { equals: service.title } },
      limit: 1,
    })
    if (existingPrice.docs[0]) continue
    await payload.create({
      collection: 'prices',
      data: {
        title: service.title,
        category: categoryIds[service.category],
        priceFrom: service.priceFrom,
        unit: '₽',
        order: service.priceFrom,
      },
    })
  }

  console.log('Seed completed successfully.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
