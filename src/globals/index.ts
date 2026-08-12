import type { GlobalConfig } from 'payload'

import { FooterSettings } from './FooterSettings'
import { HeaderSettings } from './HeaderSettings'
import { SEOSettings } from './SEOSettings'
import { SiteSettings } from './SiteSettings'

export { FooterSettings, HeaderSettings, SEOSettings, SiteSettings }

export const globals: GlobalConfig[] = [
  SiteSettings,
  HeaderSettings,
  FooterSettings,
  SEOSettings,
]
