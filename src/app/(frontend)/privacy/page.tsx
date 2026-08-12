import { DemoBadge } from '@/components/shared/demo-badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { safeGetPageBySlug } from '@/lib/content'
import { buildMetadata } from '@/lib/seo/metadata'

const DEMO_PRIVACY = `Политика конфиденциальности (шаблон)

Это демонстрационный юридический текст для сайта Aura Dental. Перед публикацией замените его актуальным документом вашей клиники и согласуйте с юристом.

1. Общие положения
Мы обрабатываем персональные данные, которые вы добровольно оставляете через формы на сайте (имя, телефон, комментарий и иные сведения, которые вы указываете).

2. Цели обработки
Данные используются для связи с вами, записи на приём, ответа на обращения и улучшения качества сервиса.

3. Правовые основания
Обработка осуществляется на основании вашего согласия, а также в случаях, предусмотренных законодательством РФ.

4. Передача третьим лицам
Мы не продаём персональные данные. Передача возможна только подрядчикам, необходимым для работы сайта и связи с пациентами, либо по требованию закона.

5. Срок хранения
Данные хранятся столько, сколько нужно для целей обработки, либо до отзыва согласия, если иное не требуется законом.

6. Ваши права
Вы можете запросить уточнение, ограничение обработки или удаление данных, связавшись с клиникой по контактам на сайте.

7. Контакты
По вопросам обработки персональных данных используйте телефон и email, указанные в разделе «Контакты».

[Шаблон / демо] Не является готовой политикой для реальной клиники.`

export async function generateMetadata() {
  const { item } = await safeGetPageBySlug('privacy')
  const seo =
    item?.seo && typeof item.seo === 'object'
      ? (item.seo as { metaTitle?: string; metaDescription?: string })
      : null

  return buildMetadata({
    path: '/privacy',
    title: seo?.metaTitle || item?.title || 'Политика конфиденциальности',
    description:
      seo?.metaDescription ||
      'Политика обработки персональных данных посетителей сайта.',
  })
}

export default async function PrivacyPage() {
  const { item, isDemo } = await safeGetPageBySlug('privacy')
  const title = item?.title || 'Политика конфиденциальности'
  const content = item?.content || DEMO_PRIVACY
  const showDemo = isDemo || !item

  return (
    <section className="section-padding pt-10 sm:pt-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Политика конфиденциальности' },
          ]}
        />
        <div className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-label text-accent">Документ</p>
            {showDemo ? <DemoBadge label="Шаблон / демо" /> : null}
          </div>
          <h1 className="mt-4 text-display">{title}</h1>
          <div className="prose-clinic mt-8 whitespace-pre-line">{content}</div>
        </div>
      </Container>
    </section>
  )
}
