import {
  ClipboardList,
  MonitorSmartphone,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

import { SlideUp, StaggerChildren, StaggerItem } from '@/components/shared/motion'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

export type TrustBarItem = {
  id: string
  title: string
  description?: string
  icon: LucideIcon
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
    icon: UserRound,
  },
  {
    id: 'equipment',
    title: 'Современное оборудование',
    description: 'Цифровая диагностика и точная работа',
    icon: MonitorSmartphone,
  },
  {
    id: 'guarantee',
    title: 'Гарантия на лечение',
    description: 'Условия фиксируем до начала работ',
    icon: ShieldCheck,
  },
  {
    id: 'plan',
    title: 'Индивидуальный план',
    description: 'Лечение под вашу клиническую ситуацию',
    icon: ClipboardList,
  },
]

export function TrustBar({ items = DEFAULT_ITEMS, className }: TrustBarProps) {
  const list = items.length > 0 ? items : DEFAULT_ITEMS

  return (
    <section
      className={cn('border-b border-border/70 bg-surface/60', className)}
      aria-label="Преимущества клиники"
    >
      <Container className="py-10 sm:py-12">
        <SlideUp>
          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {list.map((item) => {
              const Icon = item.icon
              return (
                <StaggerItem key={item.id}>
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
                </StaggerItem>
              )
            })}
          </StaggerChildren>
        </SlideUp>
      </Container>
    </section>
  )
}
