import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import type { ReactNode } from 'react'

import { SiteShell } from '@/components/layout/site-shell'
import { buildMetadata } from '@/lib/seo/metadata'

import './globals.css'

/** Refresh CMS content every minute (ISR). */
export const revalidate = 60

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-geist-sans',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ path: '/' })
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
