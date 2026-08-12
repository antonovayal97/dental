'use client'

import Link from 'next/link'
import { Phone } from 'lucide-react'

import { AppointmentDialog } from '@/components/forms/appointment-dialog'
import type { ServiceOption } from '@/components/forms/appointment-form'
import { buttonVariants } from '@/components/ui/button'
import { cn, phoneHref } from '@/lib/utils'

export type MobileCTAProps = {
  label?: string
  phone?: string
  services?: ServiceOption[]
  className?: string
  hidden?: boolean
}

export function MobileCTA({
  label = 'Записаться',
  phone,
  services,
  className,
  hidden,
}: MobileCTAProps) {
  if (hidden) return null

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 px-4 pt-3 backdrop-blur-xl md:hidden',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        className,
      )}
    >
      <div className="flex gap-2">
        {phone ? (
          <a
            href={phoneHref(phone)}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'shrink-0 px-4',
            )}
            aria-label={`Позвонить: ${phone}`}
          >
            <Phone className="size-4" aria-hidden="true" />
          </a>
        ) : null}
        <div className="min-w-0 flex-1">
          <AppointmentDialog
            triggerLabel={label}
            triggerClassName="w-full shadow-lift"
            triggerSize="lg"
            services={services}
          />
        </div>
      </div>
    </div>
  )
}

/** Legacy link-only CTA kept for rare static use */
export function MobileCTALink({
  label = 'Записаться',
  href = '/#appointment',
  className,
}: {
  label?: string
  href?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 px-4 pt-3 backdrop-blur-xl md:hidden',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        className,
      )}
    >
      <Link
        href={href}
        className={cn(buttonVariants({ size: 'lg' }), 'w-full shadow-lift')}
      >
        {label}
      </Link>
    </div>
  )
}
