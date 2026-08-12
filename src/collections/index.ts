import type { CollectionConfig } from 'payload'

import { ArticleCategories } from './ArticleCategories'
import { Articles } from './Articles'
import { Appointments } from './Appointments'
import { Cases } from './Cases'
import { ClinicAdvantages } from './ClinicAdvantages'
import { Doctors } from './Doctors'
import { FAQs } from './FAQs'
import { Media } from './Media'
import { Pages } from './Pages'
import { Prices } from './Prices'
import { Reviews } from './Reviews'
import { ServiceCategories } from './ServiceCategories'
import { Services } from './Services'
import { Technologies } from './Technologies'
import { Users } from './Users'

export {
  ArticleCategories,
  Articles,
  Appointments,
  Cases,
  ClinicAdvantages,
  Doctors,
  FAQs,
  Media,
  Pages,
  Prices,
  Reviews,
  ServiceCategories,
  Services,
  Technologies,
  Users,
}

export const collections: CollectionConfig[] = [
  Users,
  Media,
  Doctors,
  ServiceCategories,
  Services,
  Prices,
  Reviews,
  Cases,
  FAQs,
  ArticleCategories,
  Articles,
  Technologies,
  ClinicAdvantages,
  Appointments,
  Pages,
]
