import { DemoBadge } from '@/components/shared/demo-badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { safeGetPageBySlug } from '@/lib/content'
import { buildMetadata } from '@/lib/seo/metadata'

const DEMO_TERMS = `Пользовательское соглашение (шаблон)

Это демонстрационный документ для сайта Aura Dental. Перед публикацией замените текст актуальным соглашением вашей клиники и согласуйте его с юристом.

1. Предмет соглашения
Сайт предоставляет информационные материалы о услугах клиники и возможность оставить заявку на обратную связь / запись.

2. Ограничение ответственности
Информация на сайте носит ознакомительный характер и не заменяет очную консультацию врача. Диагноз, план лечения и стоимость определяются индивидуально.

3. Заявки с сайта
Отправка формы не гарантирует запись на конкретное время до подтверждения администратором.

4. Интеллектуальная собственность
Тексты, дизайн и материалы сайта защищены. Использование без согласия правообладателя не допускается, кроме случаев, прямо разрешённых законом.

5. Изменения
Мы можем обновлять соглашение. Актуальная версия публикуется на этой странице.

6. Контакты
По вопросам, связанным с сайтом и услугами, используйте раздел «Контакты».

[Шаблон / демо] Не является готовым договором/офертой для реальной клиники.`

export async function generateMetadata() {
  const { item } = await safeGetPageBySlug('terms')
  const seo =
    item?.seo && typeof item.seo === 'object'
      ? (item.seo as { metaTitle?: string; metaDescription?: string })
      : null

  return buildMetadata({
    path: '/terms',
    title: seo?.metaTitle || item?.title || 'Пользовательское соглашение',
    description:
      seo?.metaDescription ||
      'Условия использования сайта и информационных материалов клиники.',
  })
}

export default async function TermsPage() {
  const { item, isDemo } = await safeGetPageBySlug('terms')
  const title = item?.title || 'Пользовательское соглашение'
  const content = item?.content || DEMO_TERMS
  const showDemo = isDemo || !item

  return (
    <section className="section-padding pt-10 sm:pt-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Пользовательское соглашение' },
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
