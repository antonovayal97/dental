'use client'

import * as React from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface AccordionItemData {
  id: string
  title: string
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItemData[]
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  className?: string
}

export function Accordion({
  items,
  type = 'single',
  defaultValue,
  className,
}: AccordionProps) {
  const reducedMotion = useReducedMotion()
  const [openIds, setOpenIds] = React.useState<string[]>(() => {
    if (defaultValue == null) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id)
      if (type === 'single') {
        return isOpen ? [] : [id]
      }
      return isOpen ? prev.filter((item) => item !== id) : [...prev, id]
    })
  }

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const triggers = items.map((_, i) => `accordion-trigger-${items[i].id}`)
    const focusTrigger = (i: number) => {
      const el = document.getElementById(triggers[i])
      el?.focus()
    }

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        focusTrigger((index + 1) % items.length)
        break
      }
      case 'ArrowUp': {
        event.preventDefault()
        focusTrigger((index - 1 + items.length) % items.length)
        break
      }
      case 'Home': {
        event.preventDefault()
        focusTrigger(0)
        break
      }
      case 'End': {
        event.preventDefault()
        focusTrigger(items.length - 1)
        break
      }
      default:
        break
    }
  }

  return (
    <div className={cn('divide-y divide-border/80', className)}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id)
        const triggerId = `accordion-trigger-${item.id}`
        const panelId = `accordion-panel-${item.id}`

        return (
          <div key={item.id} className="py-1">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cn(
                  'flex w-full items-center justify-between gap-4 py-4 text-left text-base font-medium text-foreground transition-colors',
                  'hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                )}
                onClick={() => toggle(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span>{item.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 shrink-0 text-muted-foreground transition-transform duration-200',
                    isOpen && 'rotate-180',
                    reducedMotion && 'transition-none',
                  )}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={
                    reducedMotion ? false : { height: 0, opacity: 0 }
                  }
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={
                    reducedMotion ? undefined : { height: 0, opacity: 0 }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.25,
                    ease: 'easeInOut',
                  }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 text-body">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
