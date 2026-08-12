/**
 * Демонстрационный контент Aura Dental.
 * Используется только когда CMS пуст или недоступен.
 * Все значения явно помечены как демо — не выдавать за реальные данные клиники.
 */

export const IS_DEMO_CONTENT = true as const
export const DEMO_MARKER = '[Демо]' as const
export const DEMO_DISCLAIMER =
  'Демонстрационные данные. Замените содержимым из CMS перед публикацией.' as const

export const DEMO_CLINIC = {
  isDemo: true as const,
  clinicName: 'Aura Dental',
  phone: '+7 (000) 000-00-00',
  email: 'hello@example.com',
  address: 'г. Примерск, ул. Демонстрационная, 1',
  city: 'Примерск',
  district: 'Центральный район',
  ctaPrimaryText: 'Записаться на приём',
  ctaSecondaryText: 'Узнать цены',
  workingHours: [
    { day: 'Пн–Пт', hours: '9:00–21:00' },
    { day: 'Сб', hours: '10:00–18:00' },
    { day: 'Вс', hours: 'Выходной' },
  ],
  social: {
    telegram: '',
    whatsapp: '',
    vk: '',
    youtube: '',
  },
  defaultSEO: {
    title: 'Aura Dental — современная стоматология (демо)',
    description:
      'Демо-сайт стоматологической клиники Aura Dental: услуги, врачи, цены и запись на консультацию.',
  },
} as const

export const DEMO_NAV_LINKS = [
  { label: 'Услуги', href: '/services' },
  { label: 'Врачи', href: '/doctors' },
  { label: 'Цены', href: '/prices' },
  { label: 'О клинике', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
] as const

export const DEMO_FOOTER = {
  isDemo: true as const,
  description:
    'Aura Dental — демо-версия сайта современной стоматологической клиники. Аккуратный подход, прозрачный план лечения и комфорт на каждом этапе.',
  copyright: `© ${new Date().getFullYear()} Aura Dental (демо)`,
  columns: [
    {
      title: 'Услуги',
      links: [
        { label: 'Все услуги', href: '/services' },
        { label: 'Имплантация', href: '/services/implantation' },
        { label: 'Ортодонтия', href: '/services/orthodontics' },
        { label: 'Гигиена', href: '/services/hygiene' },
      ],
    },
    {
      title: 'Клиника',
      links: [
        { label: 'О клинике', href: '/about' },
        { label: 'Врачи', href: '/doctors' },
        { label: 'Кейсы', href: '/cases' },
        { label: 'Технологии', href: '/about#technologies' },
      ],
    },
    {
      title: 'Пациентам',
      links: [
        { label: 'Цены', href: '/prices' },
        { label: 'Блог', href: '/blog' },
        { label: 'Контакты', href: '/contacts' },
        { label: 'Запись', href: '/#appointment' },
      ],
    },
  ],
  legalLinks: [
    { label: 'Политика конфиденциальности', href: '/privacy' },
    { label: 'Пользовательское соглашение', href: '/terms' },
  ],
} as const

export const DEMO_TRUST_STATS = [
  { label: 'лет опыта команды', value: '15+', isDemo: true },
  { label: 'направлений лечения', value: '9', isDemo: true },
  { label: 'пациентов в демо-статистике', value: '3 000+', isDemo: true },
  { label: 'гарантия на работы*', value: 'до 5 лет', isDemo: true },
] as const

export const DEMO_SERVICE_CATEGORIES = [
  {
    slug: 'therapy',
    title: 'Терапия',
    description: 'Лечение кариеса, пульпита и восстановление зубов.',
  },
  {
    slug: 'implantation',
    title: 'Имплантация',
    description: 'Установка имплантатов и восстановление зубного ряда.',
  },
  {
    slug: 'prosthetics',
    title: 'Протезирование',
    description: 'Коронки, виниры и съёмные конструкции.',
  },
  {
    slug: 'orthodontics',
    title: 'Ортодонтия',
    description: 'Брекеты и элайнеры для ровной улыбки.',
  },
  {
    slug: 'aesthetic',
    title: 'Эстетическая стоматология',
    description: 'Коррекция формы, цвета и гармонии улыбки.',
  },
  {
    slug: 'pediatric',
    title: 'Детская стоматология',
    description: 'Бережное лечение и профилактика для детей.',
  },
  {
    slug: 'surgery',
    title: 'Хирургия',
    description: 'Удаление зубов и хирургические вмешательства.',
  },
  {
    slug: 'hygiene',
    title: 'Профессиональная гигиена',
    description: 'Чистка, удаление налёта и укрепление эмали.',
  },
  {
    slug: 'whitening',
    title: 'Отбеливание',
    description: 'Безопасное осветление зубов под контролем врача.',
  },
] as const

export const DEMO_IMAGES = {
  hero: { url: '/images/hero.jpg', alt: 'Aura Dental — демо hero', width: 1600, height: 2000 },
  about: { url: '/images/about.jpg', alt: 'О клинике — демо', width: 1600, height: 1200 },
  og: { url: '/images/og-default.jpg', alt: 'Aura Dental', width: 1200, height: 630 },
  doctors: {
    'anna-orlova': { url: '/images/doctor-anna.jpg', alt: 'Анна Орлова (демо)', width: 900, height: 1100 },
    'igor-savelyev': { url: '/images/doctor-igor.jpg', alt: 'Игорь Савельев (демо)', width: 900, height: 1100 },
    'maria-kim': { url: '/images/doctor-maria.jpg', alt: 'Мария Ким (демо)', width: 900, height: 1100 },
    'anna-sergeeva': { url: '/images/doctor-anna.jpg', alt: 'Анна Сергеева (демо)', width: 900, height: 1100 },
    'igor-volkov': { url: '/images/doctor-igor.jpg', alt: 'Игорь Волков (демо)', width: 900, height: 1100 },
    'maria-orlova': { url: '/images/doctor-maria.jpg', alt: 'Мария Орлова (демо)', width: 900, height: 1100 },
  },
  services: {
    therapy: { url: '/images/service-therapy.jpg', alt: 'Терапия (демо)', width: 1200, height: 900 },
    implantation: { url: '/images/service-implantation.jpg', alt: 'Имплантация (демо)', width: 1200, height: 900 },
    prosthetics: { url: '/images/service-prosthetics.jpg', alt: 'Протезирование (демо)', width: 1200, height: 900 },
    orthodontics: { url: '/images/service-orthodontics.jpg', alt: 'Ортодонтия (демо)', width: 1200, height: 900 },
    aesthetic: { url: '/images/service-aesthetic.jpg', alt: 'Эстетика (демо)', width: 1200, height: 900 },
    pediatric: { url: '/images/service-pediatric.jpg', alt: 'Детская стоматология (демо)', width: 1200, height: 900 },
    surgery: { url: '/images/service-surgery.jpg', alt: 'Хирургия (демо)', width: 1200, height: 900 },
    hygiene: { url: '/images/service-hygiene.jpg', alt: 'Гигиена (демо)', width: 1200, height: 900 },
    whitening: { url: '/images/service-whitening.jpg', alt: 'Отбеливание (демо)', width: 1200, height: 900 },
  },
  cases: {
    'smile-rehab': {
      before: { url: '/images/case-smile-before.jpg', alt: 'До (демо)', width: 1200, height: 900 },
      after: { url: '/images/case-smile-after.jpg', alt: 'После (демо)', width: 1200, height: 900 },
    },
    'hygiene-restore': {
      before: { url: '/images/case-hygiene-before.jpg', alt: 'До (демо)', width: 1200, height: 900 },
      after: { url: '/images/case-hygiene-after.jpg', alt: 'После (демо)', width: 1200, height: 900 },
    },
  },
  articles: {
    'how-to-choose-implant': { url: '/images/blog-implant.jpg', alt: 'Статья (демо)', width: 1400, height: 900 },
    'wisdom-tooth-removal': { url: '/images/blog-wisdom.jpg', alt: 'Статья (демо)', width: 1400, height: 900 },
    'professional-hygiene-frequency': { url: '/images/blog-hygiene.jpg', alt: 'Статья (демо)', width: 1400, height: 900 },
    'first-visit': { url: '/images/blog-hygiene.jpg', alt: 'Статья (демо)', width: 1400, height: 900 },
    'professional-hygiene': { url: '/images/blog-hygiene.jpg', alt: 'Статья (демо)', width: 1400, height: 900 },
    'implantation-steps': { url: '/images/blog-implant.jpg', alt: 'Статья (демо)', width: 1400, height: 900 },
  },
  technologies: {
    '3d-diagnostics': { url: '/images/tech-scanner.jpg', alt: '3D-диагностика (демо)', width: 1200, height: 900 },
    'digital-scanner': { url: '/images/tech-scanner.jpg', alt: 'Цифровой сканер (демо)', width: 1200, height: 900 },
    'intraoral-scan': { url: '/images/tech-scanner.jpg', alt: 'Интраоральный сканер (демо)', width: 1200, height: 900 },
    microscope: { url: '/images/tech-microscope.jpg', alt: 'Микроскоп (демо)', width: 1200, height: 900 },
    cadcam: { url: '/images/tech-scanner.jpg', alt: 'CAD/CAM (демо)', width: 1200, height: 900 },
    anesthesia: { url: '/images/tech-microscope.jpg', alt: 'Анестезия (демо)', width: 1200, height: 900 },
    sterilization: { url: '/images/about.jpg', alt: 'Стерилизация (демо)', width: 1600, height: 1200 },
  },
} as const

export const DEMO_SERVICES = DEMO_SERVICE_CATEGORIES.map((category, index) => ({
  id: `demo-service-${category.slug}`,
  isDemo: true as const,
  title: category.title,
  slug: category.slug,
  shortDescription: category.description,
  description: `${category.description} Демо-описание услуги Aura Dental для наполнения сайта до публикации реального контента.`,
  priceFrom: [3500, 45000, 18000, 80000, 25000, 2500, 7000, 5500, 12000][index],
  priceNote: 'Точная стоимость после консультации и диагностики',
  category: {
    title: category.title,
    slug: category.slug,
  },
  image: DEMO_IMAGES.services[category.slug as keyof typeof DEMO_IMAGES.services],
}))

export const DEMO_DOCTORS = [
  {
    id: 'demo-doctor-1',
    isDemo: true as const,
    name: 'Анна Сергеева',
    slug: 'anna-sergeeva',
    position: 'Главный врач',
    specialization: 'Терапия, эстетическая стоматология',
    experienceYears: 12,
    approach:
      'Составляю понятный план лечения и объясняю каждый этап до начала работы.',
    education: ['МГМСУ им. А. И. Евдокимова (демо)'],
    certificates: ['Эстетическая реставрация (демо)'],
    photo: DEMO_IMAGES.doctors['anna-sergeeva'],
  },
  {
    id: 'demo-doctor-2',
    isDemo: true as const,
    name: 'Игорь Волков',
    slug: 'igor-volkov',
    position: 'Хирург-имплантолог',
    specialization: 'Имплантация, хирургия',
    experienceYears: 15,
    approach:
      'Фокус на цифровой диагностике и прогнозируемом результате имплантации.',
    education: ['Первый МГМУ им. И. М. Сеченова (демо)'],
    certificates: ['Хирургическая имплантология (демо)'],
    photo: DEMO_IMAGES.doctors['igor-volkov'],
  },
  {
    id: 'demo-doctor-3',
    isDemo: true as const,
    name: 'Мария Орлова',
    slug: 'maria-orlova',
    position: 'Ортодонт',
    specialization: 'Ортодонтия, элайнеры',
    experienceYears: 9,
    approach:
      'Подбираю систему коррекции под образ жизни и цели пациента.',
    education: ['СПбГМУ (демо)'],
    certificates: ['Лечение на элайнерах (демо)'],
    photo: DEMO_IMAGES.doctors['maria-orlova'],
  },
] as const

export const DEMO_ADVANTAGES = [
  {
    id: 'demo-adv-1',
    isDemo: true as const,
    title: 'Современное оборудование',
    description: 'Диагностика и лечение на актуальном клиническом оборудовании.',
    icon: 'equipment' as const,
    order: 0,
  },
  {
    id: 'demo-adv-2',
    isDemo: true as const,
    title: 'Цифровая диагностика',
    description: 'Точный план лечения на основе цифровых снимков и сканирования.',
    icon: 'digital' as const,
    order: 1,
  },
  {
    id: 'demo-adv-3',
    isDemo: true as const,
    title: 'Стерильность',
    description: 'Многоуровневый контроль стерилизации инструментов и кабинетов.',
    icon: 'sterile' as const,
    order: 2,
  },
  {
    id: 'demo-adv-4',
    isDemo: true as const,
    title: 'Опытные специалисты',
    description: 'Врачи с узкой специализацией и регулярным повышением квалификации.',
    icon: 'specialists' as const,
    order: 3,
  },
  {
    id: 'demo-adv-5',
    isDemo: true as const,
    title: 'Прозрачная стоимость',
    description: 'Фиксируем этапы и ориентиры по цене до начала лечения.',
    icon: 'pricing' as const,
    order: 4,
  },
  {
    id: 'demo-adv-6',
    isDemo: true as const,
    title: 'Индивидуальный план',
    description: 'Лечение строится под клиническую ситуацию и задачи пациента.',
    icon: 'plan' as const,
    order: 5,
  },
  {
    id: 'demo-adv-7',
    isDemo: true as const,
    title: 'Гарантия на работы',
    description: 'Условия гарантии обсуждаются заранее и фиксируются в плане.',
    icon: 'guarantee' as const,
    order: 6,
  },
  {
    id: 'demo-adv-8',
    isDemo: true as const,
    title: 'Комфорт пациента',
    description: 'Спокойный ритм приёма, понятная коммуникация и бережный подход.',
    icon: 'comfort' as const,
    order: 7,
  },
] as const

export const DEMO_TECHNOLOGIES = [
  {
    id: 'demo-tech-1',
    isDemo: true as const,
    title: 'Интраоральный сканер',
    slug: 'intraoral-scan',
    description: 'Цифровые слепки без дискомфорта и высокая точность моделей.',
    icon: 'scan' as const,
    image: DEMO_IMAGES.technologies['intraoral-scan'],
    order: 0,
  },
  {
    id: 'demo-tech-2',
    isDemo: true as const,
    title: 'Дентальный микроскоп',
    slug: 'microscope',
    description: 'Контроль деталей при эндодонтии и микроинвазивном лечении.',
    icon: 'microscope' as const,
    image: DEMO_IMAGES.technologies.microscope,
    order: 1,
  },
  {
    id: 'demo-tech-3',
    isDemo: true as const,
    title: 'CAD/CAM',
    slug: 'cadcam',
    description: 'Цифровое проектирование и изготовление реставраций.',
    icon: 'cadcam' as const,
    image: DEMO_IMAGES.technologies.cadcam,
    order: 2,
  },
  {
    id: 'demo-tech-4',
    isDemo: true as const,
    title: '3D-диагностика',
    slug: '3d-diagnostics',
    description: 'Объёмная визуализация для точного планирования лечения.',
    icon: 'diagnostics' as const,
    image: DEMO_IMAGES.technologies['3d-diagnostics'],
    order: 3,
  },
  {
    id: 'demo-tech-5',
    isDemo: true as const,
    title: 'Компьютерная анестезия',
    slug: 'anesthesia',
    description: 'Дозированная подача анестетика для более комфортного приёма.',
    icon: 'anesthesia' as const,
    image: DEMO_IMAGES.technologies.anesthesia,
    order: 4,
  },
] as const

export const DEMO_FAQS = [
  {
    id: 'demo-faq-1',
    isDemo: true as const,
    question: 'Как проходит первый приём?',
    answer:
      'Врач собирает анамнез, проводит осмотр, при необходимости назначает диагностику и составляет предварительный план лечения.',
    category: 'general' as const,
    order: 0,
  },
  {
    id: 'demo-faq-2',
    isDemo: true as const,
    question: 'Нужно ли заранее делать снимок?',
    answer:
      'Не обязательно. Если снимок нужен, мы подскажем формат или выполним диагностику в клинике.',
    category: 'preparation' as const,
    order: 1,
  },
  {
    id: 'demo-faq-3',
    isDemo: true as const,
    question: 'Сколько стоит консультация?',
    answer:
      'Ориентир по стоимости консультации указан в прайсе. Итоговая сумма лечения определяется после диагностики.',
    category: 'prices' as const,
    order: 2,
  },
  {
    id: 'demo-faq-4',
    isDemo: true as const,
    question: 'Можно ли лечить зубы во время беременности?',
    answer:
      'Во многих случаях лечение возможно. Решение принимает врач с учётом срока и клинической ситуации.',
    category: 'treatment' as const,
    order: 3,
  },
  {
    id: 'demo-faq-5',
    isDemo: true as const,
    question: 'Как подготовиться к имплантации?',
    answer:
      'Обычно нужны осмотр, КТ и санация полости рта. Точный список подготовки обсуждается индивидуально.',
    category: 'preparation' as const,
    order: 4,
  },
  {
    id: 'demo-faq-6',
    isDemo: true as const,
    question: 'Сколько длится лечение?',
    answer:
      'Срок зависит от объёма работ: от одного визита до нескольких месяцев при комплексном плане.',
    category: 'treatment' as const,
    order: 5,
  },
  {
    id: 'demo-faq-7',
    isDemo: true as const,
    question: 'Есть ли рассрочка?',
    answer:
      'Условия оплаты и возможная рассрочка обсуждаются администратором после составления плана лечения.',
    category: 'prices' as const,
    order: 6,
  },
] as const

export const DEMO_REVIEWS = [
  {
    id: 'demo-review-1',
    isDemo: true as const,
    name: 'Елена К.',
    text: 'Демо-отзыв: спокойный приём, всё объяснили заранее и согласовали план лечения.',
    rating: 5,
    date: '2026-03-12',
    isFeatured: true,
  },
  {
    id: 'demo-review-2',
    isDemo: true as const,
    name: 'Алексей П.',
    text: 'Демо-отзыв: удобно, что стоимость и этапы понятны до начала работы.',
    rating: 5,
    date: '2026-02-28',
    isFeatured: true,
  },
  {
    id: 'demo-review-3',
    isDemo: true as const,
    name: 'Ольга М.',
    text: 'Демо-отзыв: аккуратная гигиена и внимательный подход без лишней спешки.',
    rating: 4,
    date: '2026-01-19',
    isFeatured: false,
  },
] as const

export const DEMO_PRICES = [
  {
    id: 'demo-price-1',
    isDemo: true as const,
    title: 'Консультация терапевта',
    categorySlug: 'therapy',
    categoryTitle: 'Терапия',
    priceFrom: 1500,
    unit: '₽',
    order: 0,
    isFeatured: true,
  },
  {
    id: 'demo-price-2',
    isDemo: true as const,
    title: 'Лечение кариеса',
    categorySlug: 'therapy',
    categoryTitle: 'Терапия',
    priceFrom: 4500,
    unit: '₽',
    order: 1,
    isFeatured: false,
  },
  {
    id: 'demo-price-3',
    isDemo: true as const,
    title: 'Установка имплантата',
    categorySlug: 'implantation',
    categoryTitle: 'Имплантация',
    priceFrom: 45000,
    unit: '₽',
    order: 0,
    isFeatured: true,
  },
  {
    id: 'demo-price-4',
    isDemo: true as const,
    title: 'Профессиональная гигиена',
    categorySlug: 'hygiene',
    categoryTitle: 'Профессиональная гигиена',
    priceFrom: 5500,
    unit: '₽',
    order: 0,
    isFeatured: true,
  },
  {
    id: 'demo-price-5',
    isDemo: true as const,
    title: 'Отбеливание',
    categorySlug: 'whitening',
    categoryTitle: 'Отбеливание',
    priceFrom: 12000,
    unit: '₽',
    order: 0,
    isFeatured: false,
  },
] as const

export const DEMO_ABOUT = {
  isDemo: true as const,
  title: 'О клинике Aura Dental',
  blurb:
    'Aura Dental — демо-описание современной стоматологической клиники. Мы показываем, как выглядит спокойный, прозрачный и аккуратный путь пациента: от диагностики до понятного плана лечения и комфортного сопровождения.',
} as const

export const DEMO_ARTICLES = [
  {
    id: 'demo-article-1',
    isDemo: true as const,
    title: 'Как подготовиться к первому визиту к стоматологу',
    slug: 'first-visit',
    excerpt:
      'Демо-статья: что взять с собой, какие вопросы задать врачу и как проходит консультация.',
    category: { title: 'Пациентам', slug: 'patients' },
    author: 'Команда Aura Dental (демо)',
    publishedAt: '2026-04-01',
    coverImage: DEMO_IMAGES.articles['first-visit'],
  },
  {
    id: 'demo-article-2',
    isDemo: true as const,
    title: 'Когда нужна профессиональная гигиена',
    slug: 'professional-hygiene',
    excerpt:
      'Демо-статья: признаки, по которым стоит записаться на чистку, и как часто её делают.',
    category: { title: 'Профилактика', slug: 'prevention' },
    author: 'Команда Aura Dental (демо)',
    publishedAt: '2026-03-15',
    coverImage: DEMO_IMAGES.articles['professional-hygiene'],
  },
  {
    id: 'demo-article-3',
    isDemo: true as const,
    title: 'Имплантация: этапы лечения простыми словами',
    slug: 'implantation-steps',
    excerpt:
      'Демо-статья: от диагностики до установки коронки — что происходит на каждом этапе.',
    category: { title: 'Лечение', slug: 'treatment' },
    author: 'Команда Aura Dental (демо)',
    publishedAt: '2026-02-20',
    coverImage: DEMO_IMAGES.articles['implantation-steps'],
  },
] as const

export const DEMO_SEO = {
  isDemo: true as const,
  siteName: 'Aura Dental',
  defaultTitle: 'Aura Dental — современная стоматология (демо)',
  titleTemplate: '%s | Aura Dental',
  defaultDescription:
    'Демо-сайт стоматологической клиники: услуги, врачи, цены и запись на консультацию.',
  robotsIndex: false,
} as const
