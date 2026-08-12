import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

export default function ServiceNotFound() {
  return (
    <section className="section-padding">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-label text-accent">Услуга не найдена</p>
          <h1 className="mt-4 text-heading">Такой услуги нет в каталоге</h1>
          <p className="mt-4 text-body">
            Возможно, страница была перемещена. Посмотрите все направления или
            запишитесь на консультацию.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/services" className={cn(buttonVariants({ size: 'lg' }))}>
              Все услуги
            </Link>
            <Link
              href="/#appointment"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Записаться
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
