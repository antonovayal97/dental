'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'aura-dental-cookie-consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // localStorage может быть недоступен — просто скрываем плашку
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-label="Согласие на использование cookie"
          aria-live="polite"
          initial={reduceMotion ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: 16, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'fixed inset-x-0 z-50 px-4',
            'bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-6',
          )}
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-surface/95 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:p-5">
            <p className="text-sm leading-relaxed text-muted-foreground sm:flex-1">
              Мы используем cookie, чтобы сайт работал корректно и было удобнее
              им пользоваться. Подробности — в{' '}
              <Link
                href="/cookies"
                className="font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                политике cookie
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <Link
                href="/cookies"
                className="inline-flex h-9 items-center justify-center rounded-lg px-3.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                Подробнее
              </Link>
              <Button type="button" size="sm" onClick={accept}>
                Принять
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
