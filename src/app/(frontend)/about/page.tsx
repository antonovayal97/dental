import Link from 'next/link'

import { CtaBanner, DoctorsGrid, Technology } from '@/components/sections'
import { DemoBadge } from '@/components/shared/demo-badge'
import {
  getDemoAbout,
  resolveDoctorPhoto,
  resolveTechnologyImage,
  safeGetDoctors,
  safeGetPageBySlug,
  safeGetTechnologies,
} from '@/lib/content'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { buildMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'

export async function generateMetadata() {
  const { item } = await safeGetPageBySlug('about')
  const seo =
    item?.seo && typeof item.seo === 'object'
      ? (item.seo as { metaTitle?: string; metaDescription?: string })
      : null

  return buildMetadata({
    path: '/about',
    title: seo?.metaTitle || item?.title || 'О клинике',
    description:
      seo?.metaDescription ||
      'История, философия и стандарты работы современной стоматологической клиники.',
  })
}

export default async function AboutPage() {
  const [pageResult, doctorsResult, technologiesResult] = await Promise.all([
    safeGetPageBySlug('about'),
    safeGetDoctors(6),
    safeGetTechnologies(),
  ])

  const demo = getDemoAbout()
  const title = pageResult.item?.title || demo.title
  const content =
    pageResult.item?.content ||
    `${demo.blurb}

Мы строим путь пациента вокруг ясности: диагностика, понятный план, прозрачные ориентиры по стоимости и бережное сопровождение на каждом этапе.

Философия клиники — без лишней суеты и давления. Сначала разбираемся в задаче, затем предлагаем варианты и согласуем комфортный ритм лечения.

Стандарты работы включают цифровую диагностику, контроль стерильности и внимание к деталям. Лицензии и юридические документы публикуются только после проверки реальных данных клиники — здесь намеренно нет вымышленных разрешений.`

  const isDemo = pageResult.isDemo || !pageResult.item

  return (
    <>
      <section className="border-b border-border/70 pt-10 sm:pt-12">
        <Container className="pb-12 sm:pb-16">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'О клинике' },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-label text-accent">О клинике</p>
              {isDemo ? <DemoBadge /> : null}
            </div>
            <h1 className="mt-4 text-display">{title}</h1>
            <p className="mt-5 text-body">
              Спокойная стоматология с акцентом на диагностику, понятный план и
              аккуратную работу.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <article className="space-y-6">
            <SectionHeading
              eyebrow="История и подход"
              title="Как мы работаем"
              description="Коротко о принципах, без маркетингового шума."
            />
            <div className="prose-clinic whitespace-pre-line">{content}</div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
              <h2 className="text-subheading">Философия</h2>
              <ul className="mt-4 space-y-3 text-body">
                <li>Сначала диагноз и план — потом лечение</li>
                <li>Прозрачные этапы и ориентиры по стоимости</li>
                <li>Бережный ритм приёма без спешки</li>
                <li>Честная коммуникация о рисках и ожиданиях</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border/80 bg-muted/40 p-6">
              <h2 className="text-subheading">Стандарты</h2>
              <p className="mt-3 text-body">
                Контроль стерильности, цифровая диагностика и понятная
                документация плана лечения. Юридические документы и лицензии
                добавляются только после проверки реальных данных клиники.
              </p>
              <Link
                href="/contacts"
                className={cn(buttonVariants({ variant: 'outline' }), 'mt-5')}
              >
                Связаться с нами
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      <DoctorsGrid
        doctors={doctorsResult.items.map((doctor) => ({
          id: String(doctor.id),
          name: String(doctor.name || 'Врач'),
          slug: String(doctor.slug || doctor.id),
          specialization:
            typeof doctor.specialization === 'string'
              ? doctor.specialization
              : null,
          experienceYears:
            typeof doctor.experienceYears === 'number'
              ? doctor.experienceYears
              : null,
          position:
            typeof doctor.position === 'string' ? doctor.position : null,
          photo: resolveDoctorPhoto(doctor),
          isDemo: Boolean(doctor.isDemo) || doctorsResult.isDemo,
        }))}
        title="Команда"
        description="Короткое знакомство с врачами — подробности в профилях."
      />

      <div id="technologies">
        <Technology
          technologies={technologiesResult.items.map((item) => ({
            id: String(item.id),
            title: String(item.title || 'Технология'),
            slug: typeof item.slug === 'string' ? item.slug : undefined,
            description: String(item.description || ''),
            icon: typeof item.icon === 'string' ? item.icon : null,
            image: resolveTechnologyImage(item),
            isDemo: Boolean(item.isDemo) || technologiesResult.isDemo,
          }))}
        />
      </div>

      <CtaBanner title="Приходите на консультацию" />
    </>
  )
}
