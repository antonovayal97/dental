'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { AppointmentDialog } from '@/components/forms/appointment-dialog'
import type { ServiceOption } from '@/components/forms/appointment-form'
import { Button } from '@/components/ui/button'
import { DEMO_NAV_LINKS } from '@/lib/demo-content'
import { cn, formatPhone, phoneHref } from '@/lib/utils'

export type NavLink = {
  label: string
  href: string
}

export type HeaderProps = {
  clinicName?: string
  phone?: string
  ctaText?: string
  navLinks?: NavLink[]
  showPhone?: boolean
  services?: ServiceOption[]
}

const DEFAULT_NAV: NavLink[] = DEMO_NAV_LINKS.map((link) => ({
  label: link.label,
  href: link.href,
}))

export function Header({
  clinicName = 'Aura Dental',
  phone = '+7 (000) 000-00-00',
  ctaText = 'Записаться',
  navLinks = DEFAULT_NAV,
  showPhone = true,
  services = [],
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [appointmentOpen, setAppointmentOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const openAppointment = () => {
    setMenuOpen(false)
    setAppointmentOpen(true)
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const links = navLinks.length > 0 ? navLinks : DEFAULT_NAV

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-border/80 bg-background/85 shadow-soft backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight text-foreground"
          onClick={() => setMenuOpen(false)}
        >
          {clinicName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {showPhone && phone ? (
            <a
              href={phoneHref(phone)}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              <Phone className="size-4 text-accent" aria-hidden />
              <span>{formatPhone(phone)}</span>
            </a>
          ) : null}
          <Button type="button" size="sm" onClick={openAppointment}>
            {ctaText}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div className="hidden sm:block">
            <Button type="button" size="sm" onClick={openAppointment}>
              {ctaText}
            </Button>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
            className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              className="container-site flex flex-col gap-1 py-4"
              aria-label="Мобильная навигация"
            >
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.04 * index,
                    duration: reduceMotion ? 0 : 0.2,
                  }}
                >
                  <Link
                    href={link.href}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
                {showPhone && phone ? (
                  <a
                    href={phoneHref(phone)}
                    className="inline-flex items-center gap-2 px-3 text-sm font-medium text-foreground"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Phone className="size-4 text-accent" aria-hidden />
                    {formatPhone(phone)}
                  </a>
                ) : null}
                <Button
                  type="button"
                  className="w-full"
                  onClick={openAppointment}
                >
                  {ctaText}
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AppointmentDialog
        open={appointmentOpen}
        onOpenChange={setAppointmentOpen}
        services={services}
      />
    </header>
  )
}
