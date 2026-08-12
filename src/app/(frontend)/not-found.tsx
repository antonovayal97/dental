import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <section className="section-padding">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-label text-accent">404</p>
          <h1 className="mt-4 text-display">Страница не найдена</h1>
          <p className="mx-auto mt-5 max-w-lg text-body">
            Возможно, ссылка устарела или страница была перемещена. Вы можете
            вернуться на главную, посмотреть услуги или записаться на консультацию.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className={cn(buttonVariants({ size: 'lg' }))}>
              На главную
            </Link>
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Услуги
            </Link>
            <Link
              href="/#appointment"
              className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
            >
              Записаться
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
