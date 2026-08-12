'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  /** Скрыть кнопку закрытия в шапке */
  hideCloseButton?: boolean
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  hideCloseButton = false,
}: DialogProps) {
  const reducedMotion = useReducedMotion()
  const [mounted, setMounted] = React.useState(false)
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const previouslyFocused = React.useRef<HTMLElement | null>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const frame = requestAnimationFrame(() => {
      const focusable = getFocusable(dialogRef.current)
      focusable[0]?.focus()
    })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenChange(false)
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = getFocusable(dialogRef.current)
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused.current?.focus()
    }
  }, [open, onOpenChange])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
              'relative z-10 flex max-h-[min(90vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lift',
              className,
            )}
            initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }
            }
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border/70 px-6 py-5">
              <div className="min-w-0 space-y-1">
                <h2 id={titleId} className="text-subheading">
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="text-caption">
                    {description}
                  </p>
                ) : null}
              </div>

              {!hideCloseButton ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  aria-label="Закрыть"
                  onClick={() => onOpenChange(false)}
                >
                  <X aria-hidden="true" />
                </Button>
              ) : null}
            </div>

            <div className="overflow-y-auto px-6 py-5">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

function getFocusable(container: HTMLElement | null): HTMLElement[] {
  if (!container) return []

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      el.getAttribute('aria-hidden') !== 'true' &&
      el.offsetParent !== null,
  )
}
