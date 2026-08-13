import {
  ClipboardList,
  Cpu,
  HandHeart,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

import { SlideUp } from '@/components/shared/motion'
import { CardsSwiper } from '@/components/ui/cards-swiper'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

const TRUST_ICONS: Record<string, LucideIcon> = {
  doctors: UserRound,
  equipment: MonitorSmartphone,
  guarantee: ShieldCheck,
  plan: ClipboardList,
  diagnostics: Stethoscope,
  comfort: HandHeart,
  sterile: Sparkles,
  digital: Cpu,
}

export type TrustBarItem = {
  id: string
  title: string
  description?: string
  icon: string | LucideIcon
}

export type TrustBarProps = {
  items?: TrustBarItem[]
  className?: string
}

const DEFAULT_ITEMS: TrustBarItem[] = [
  {
    id: 'doctors',
    title: 'Опытные врачи',
    description: 'Узкая специализация и понятный план лечения',
    icon: 'doctors',
  },
  {
    id: 'equipment',
    title: 'Современное оборудование',
    description: 'Цифровая диагностика и точная работа',
    icon: 'equipment',
  },
  {
    id: 'guarantee',
    title: 'Гарантия на лечение',
    description: 'Условия фиксируем до начала работ',
    icon: 'guarantee',
  },
  {
    id: 'plan',
    title: 'Индивидуальный план',
    description: 'Лечение под вашу клиническую ситуацию',
    icon: 'plan',
  },
]

function resolveIcon(icon: string | LucideIcon): LucideIcon {
  if (typeof icon === 'string') {
    return TRUST_ICONS[icon] || UserRound
  }
  return icon
}

export function TrustBar({ items = DEFAULT_ITEMS, className }: TrustBarProps) {
  const list = items.length > 0 ? items : DEFAULT_ITEMS

  return (
    <section
      className={cn('border-b border-border/70 bg-surface/60', className)}
      aria-label="Преимущества клиники"
    >
      <Container className="py-10 sm:py-12">
        <SlideUp>
          <CardsSwiper desktopClassName="gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {list.map((item) => {
              const Icon = resolveIcon(item.icon)
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border/80 bg-card p-5 sm:border-0 sm:bg-transparent sm:p-0"
                >
                  <div className="flex gap-4">
                    <div
                      className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-accent-soft text-accent"
                      aria-hidden="true"
                    >
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{item.title}</p>
                      {item.description ? (
                        <p className="mt-1 text-caption">{item.description}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            })}
          </CardsSwiper>
        </SlideUp>
      </Container>
    </section>
  )
}
