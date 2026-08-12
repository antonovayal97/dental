'use client'

import { useEffect } from 'react'
import Link from 'next/link'

import { Button, buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="section-padding">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-border/80 bg-card px-6 py-14 text-center shadow-soft sm:px-10">
          <p className="text-label text-accent">Что-то пошло не так</p>
          <h1 className="mt-4 text-heading">Не удалось загрузить страницу</h1>
          <p className="mt-4 text-body">
            Произошла временная ошибка. Попробуйте обновить страницу или вернуться
            на главную — запись на консультацию по-прежнему доступна.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button type="button" size="lg" onClick={reset}>
              Попробовать снова
            </Button>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              На главную
            </Link>
          </div>
          {error.digest ? (
            <p className="mt-6 text-caption">Код: {error.digest}</p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
