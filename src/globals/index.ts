import type { GlobalConfig } from 'payload'

import { FooterSettings } from './FooterSettings'
import { HeaderSettings } from './HeaderSettings'
import { HomepageSettings } from './HomepageSettings'
import { SEOSettings } from './SEOSettings'
import { SiteSettings } from './SiteSettings'

export {
  FooterSettings,
  HeaderSettings,
  HomepageSettings,
  SEOSettings,
  SiteSettings,
}

export const globals: GlobalConfig[] = [
  SiteSettings,
  HomepageSettings,
  HeaderSettings,
  FooterSettings,
  SEOSettings,
]
