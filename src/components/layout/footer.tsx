import Link from 'next/link'

import {
  FooterNavAccordion,
  type FooterNavColumn,
} from '@/components/layout/footer-nav-accordion'
import { DeveloperCredit } from '@/components/layout/developer-credit'
import { DEMO_FOOTER } from '@/lib/demo-content'
import { cn, formatPhone, phoneHref } from '@/lib/utils'

export type FooterProps = {
  clinicName?: string
  description?: string
  phone?: string
  email?: string
  address?: string
  copyright?: string
  columns?: FooterNavColumn[]
  legalLinks?: Array<{ label: string; href: string }>
  className?: string
}

const DEFAULT_COLUMNS: FooterNavColumn[] = DEMO_FOOTER.columns.map((column) => ({
  title: column.title,
  links: column.links.map((link) => ({ ...link })),
}))

const DEFAULT_LEGAL = DEMO_FOOTER.legalLinks.map((link) => ({ ...link }))

export function Footer({
  clinicName = 'Aura Dental',
  description = DEMO_FOOTER.description,
  phone = '+7 (000) 000-00-00',
  email = 'hello@example.com',
  address = 'г. Примерск, ул. Демонстрационная, 1',
  copyright = DEMO_FOOTER.copyright,
  columns = DEFAULT_COLUMNS,
  legalLinks = DEFAULT_LEGAL,
  className,
}: FooterProps) {
  const navColumns = columns.length > 0 ? columns : DEFAULT_COLUMNS

  return (
    <footer className={cn('border-t border-border bg-surface', className)}>
      <div className="container-site section-padding !pb-10 !pt-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr]">
          <div className="max-w-md space-y-4">
            <Link
              href="/"
              className="inline-block text-xl font-semibold tracking-tight text-foreground"
            >
              {clinicName}
            </Link>
            <p className="text-body text-sm sm:text-base">{description}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <a
                  href={phoneHref(phone)}
                  className="font-medium text-foreground transition-colors hover:text-accent"
                >
                  {formatPhone(phone)}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {email}
                </a>
              </p>
              <p>{address}</p>
            </div>
          </div>

          <div>
            <FooterNavAccordion columns={navColumns} />

            <div className="hidden gap-8 md:grid md:grid-cols-3">
              {navColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="mb-4 text-sm font-semibold text-foreground">
                    {column.title}
                  </h3>
                  <ul className="space-y-2.5">
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
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-6">
          <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>{copyright}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-start">
            <DeveloperCredit />
          </div>
        </div>
      </div>
    </footer>
  )
}
