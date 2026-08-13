import { DemoBadge } from '@/components/shared/demo-badge'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Container } from '@/components/ui/container'
import { safeGetPageBySlug } from '@/lib/content'
import { buildMetadata } from '@/lib/seo/metadata'

const DEMO_COOKIES = `Политика использования cookie (шаблон)

Это демонстрационный юридический текст для сайта Aura Dental. Перед публикацией замените его актуальным документом вашей клиники и согласуйте с юристом.

1. Общие положения
Cookie — небольшие файлы, которые сайт может сохранять в браузере пользователя. Они помогают обеспечивать корректную работу сайта и запоминать выбранные настройки.

2. Какие cookie используются
На сайте могут применяться технические (обязательные) cookie, необходимые для работы страниц, форм и безопасности, а также функциональные cookie, которые сохраняют ваши предпочтения (например, согласие на использование cookie).

3. Цели использования
Cookie используются для стабильной работы сайта, удобства навигации, сохранения согласия пользователя и базовой аналитики посещаемости (если она подключена клиникой).

4. Срок хранения
Срок хранения зависит от типа cookie: сессионные удаляются после закрытия браузера, постоянные хранятся до истечения срока или до удаления пользователем.

5. Управление cookie
Вы можете принять использование cookie через плашку на сайте либо ограничить/удалить cookie в настройках браузера. Отключение некоторых cookie может повлиять на работу отдельных функций сайта.

6. Сторонние сервисы
Если клиника подключает сторонние сервисы (карты, аналитика, виджеты), они могут устанавливать собственные cookie согласно их политикам.

7. Контакты
По вопросам, связанным с cookie и обработкой данных, используйте телефон и email в разделе «Контакты».

[Шаблон / демо] Не является готовой политикой cookie для реальной клиники.`

export async function generateMetadata() {
 const { item } = await safeGetPageBySlug('cookies')
 const seo =
 item?.seo && typeof item.seo === 'object'
 ? (item.seo as { metaTitle?: string; metaDescription?: string })
 : null

 return buildMetadata({
 path: '/cookies',
 title: seo?.metaTitle || item?.title || 'Политика использования cookie',
 description:
 seo?.metaDescription ||
 'Как сайт использует cookie и как управлять согласием.',
 })
}

export default async function CookiesPage() {
 const { item, isDemo } = await safeGetPageBySlug('cookies')
 const title = item?.title || 'Политика использования cookie'
 const content = item?.content || DEMO_COOKIES
 const showDemo = isDemo || !item

 return (
 <section className="section-padding pt-10 sm:pt-12">
 <Container>
 <Breadcrumbs
 items={[
 { label: 'Главная', href: '/' },
 { label: 'Политика использования cookie' },
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
