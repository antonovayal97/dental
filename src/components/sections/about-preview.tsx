import Link from 'next/link'

import { DemoBadge } from '@/components/shared/demo-badge'
import {
  MediaImage,
  type MediaImageSource,
} from '@/components/shared/media-image'
import { SlideUp } from '@/components/shared/motion'
import { buttonVariants } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { DEMO_ABOUT } from '@/lib/demo-content'
import { cn } from '@/lib/utils'

export type AboutPreviewProps = {
  title?: string
  blurb?: string
  href?: string
  image?: MediaImageSource | null
  isDemo?: boolean
  className?: string
}

export function AboutPreview({
  title = DEMO_ABOUT.title,
  blurb = DEMO_ABOUT.blurb,
  href = '/about',
  image,
  isDemo,
  className,
}: AboutPreviewProps) {
  const showDemo =
    isDemo ?? (title === DEMO_ABOUT.title || blurb === DEMO_ABOUT.blurb)

  return (
    <section
      className={cn('section-padding', className)}
      aria-labelledby="about-preview-heading"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <SlideUp>
            <div className="flex items-center gap-3">
              <p className="text-label">О клинике</p>
              {showDemo ? <DemoBadge /> : null}
            </div>
            <h2 id="about-preview-heading" className="mt-3 text-heading">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-body">{blurb}</p>
            <Link
              href={href}
              className={cn(buttonVariants({ variant: 'outline' }), 'mt-8')}
            >
              Подробнее о клинике
            </Link>
          </SlideUp>

          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-border/80 shadow-soft lg:aspect-[4/5] lg:-translate-y-4">
            <MediaImage
              media={image}
              alt="Интерьер клиники"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="absolute inset-0"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
