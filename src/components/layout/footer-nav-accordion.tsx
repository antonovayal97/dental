'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export type FooterNavColumn = {
  title: string
  links: Array<{ label: string; href: string }>
}

type FooterNavAccordionProps = {
  columns: FooterNavColumn[]
  className?: string
}

export function FooterNavAccordion({
  columns,
  className,
}: FooterNavAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()

  return (
    <div className={cn('space-y-2 md:hidden', className)}>
      {columns.map((column, index) => {
        const isOpen = openIndex === index

        return (
          <div key={column.title} className="border-b border-border/80">
            <button
              type="button"
              className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-foreground"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{column.title}</span>
              <ChevronDown
                className={cn(
                  'size-4 text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180',
                )}
                aria-hidden
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.ul
                  key={`${column.title}-panel`}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pb-4">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.href}`}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </div>
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
