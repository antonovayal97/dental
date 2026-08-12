import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { MobileCTA } from '@/components/layout/mobile-cta'
import { Toaster } from '@/components/providers/toaster'
import {
  DEMO_CLINIC,
  DEMO_FOOTER,
  DEMO_NAV_LINKS,
} from '@/lib/demo-content'
import { mapServiceOptions, safeGetServices } from '@/lib/content'
import {
  getFooterSettings,
  getHeaderSettings,
  getSiteSettings,
} from '@/lib/queries/settings'
import { sanitizeHref } from '@/lib/utils'

type SiteShellProps = {
  children: ReactNode
}

function asNavLinks(
  links: Array<{ label?: string; href?: string }> | null | undefined,
) {
  if (!links?.length) {
    return DEMO_NAV_LINKS.map((link) => ({ ...link }))
  }

  return links
    .map((link) => {
      const href = sanitizeHref(link.href)
      if (!link.label || !href) return null
      return { label: link.label, href }
    })
    .filter((link): link is { label: string; href: string } => Boolean(link))
}

function asFooterColumns(
  columns:
    | Array<{
        title?: string
        links?: Array<{ label?: string; href?: string }> | null
      }>
    | null
    | undefined,
) {
  if (!columns?.length) {
    return DEMO_FOOTER.columns.map((column) => ({
      title: column.title,
      links: column.links.map((link) => ({ ...link })),
    }))
  }

  return columns
    .filter((column): column is { title: string; links?: Array<{ label?: string; href?: string }> | null } =>
      Boolean(column.title),
    )
    .map((column) => ({
      title: column.title,
      links: (column.links ?? [])
        .map((link) => {
          const href = sanitizeHref(link.href)
          if (!link.label || !href) return null
          return { label: link.label, href }
        })
        .filter((link): link is { label: string; href: string } => Boolean(link)),
    }))
}

export async function SiteShell({ children }: SiteShellProps) {
  const [site, header, footer, servicesResult] = await Promise.all([
    getSiteSettings(),
    getHeaderSettings(),
    getFooterSettings(),
    safeGetServices(50),
  ])

  const clinicName = site?.clinicName || DEMO_CLINIC.clinicName
  const phone = site?.phone || DEMO_CLINIC.phone
  const email = site?.email || DEMO_CLINIC.email
  const address = site?.address || DEMO_CLINIC.address
  const ctaText = header?.ctaText || site?.ctaPrimaryText || 'Записаться'
  const navLinks = asNavLinks(header?.navLinks)
  const footerColumns = asFooterColumns(footer?.columns)
  const footerDescription = footer?.description || DEMO_FOOTER.description
  const copyright =
    footer?.copyright || `© ${new Date().getFullYear()} ${clinicName}`
  const serviceOptions = mapServiceOptions(servicesResult.items)

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Перейти к содержимому
      </a>
      <Header
        clinicName={clinicName}
        phone={phone}
        ctaText={ctaText}
        navLinks={navLinks}
        showPhone={header?.showPhone ?? true}
        services={serviceOptions}
      />
      <main
        id="main-content"
        className="min-h-screen pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-16 md:pb-0 lg:pt-[4.5rem]"
      >
        {children}
      </main>
      <Footer
        clinicName={clinicName}
        description={footerDescription}
        phone={phone}
        email={email}
        address={address}
        copyright={copyright}
        columns={footerColumns}
        className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0"
      />
      <MobileCTA label={ctaText} phone={phone} services={serviceOptions} />
      <Toaster />
    </>
  )
}
