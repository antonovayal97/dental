'use client'

import * as React from 'react'

import {
  MediaImage,
  type MediaImageSource,
} from '@/components/shared/media-image'
import { cn } from '@/lib/utils'

export type BeforeAfterSliderProps = {
  beforeImage?: MediaImageSource | null
  afterImage?: MediaImageSource | null
  beforeAlt?: string
  afterAlt?: string
  disclaimer?: string
  className?: string
  initialPosition?: number
}

const DEFAULT_DISCLAIMER =
  'Результаты индивидуальны и зависят от клинической ситуации. Сравнение носит ознакомительный характер.'

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = 'До лечения',
  afterAlt = 'После лечения',
  disclaimer = DEFAULT_DISCLAIMER,
  className,
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState(() =>
    clamp(initialPosition, 0, 100),
  )
  const dragging = React.useRef(false)

  const updateFromClientX = React.useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.width <= 0) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(clamp(next, 0, 100))
  }, [])

  React.useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging.current) return
      updateFromClientX(event.clientX)
    }
    const onPointerUp = () => {
      dragging.current = false
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }, [updateFromClientX])

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 2
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setPosition((value) => clamp(value - step, 0, 100))
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setPosition((value) => clamp(value + step, 0, 100))
    }
    if (event.key === 'Home') {
      event.preventDefault()
      setPosition(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      setPosition(100)
    }
  }

  return (
    <figure className={cn('space-y-3', className)}>
      <div
        ref={containerRef}
        className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-soft select-none touch-none"
        onPointerDown={(event) => {
          dragging.current = true
          event.currentTarget.setPointerCapture?.(event.pointerId)
          updateFromClientX(event.clientX)
        }}
      >
        <MediaImage
          media={afterImage}
          alt={afterAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="absolute inset-0"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <MediaImage
            media={beforeImage}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="absolute inset-0"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-soft"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-card text-foreground shadow-lift">
            <span aria-hidden="true" className="text-xs font-semibold">
              ‖
            </span>
          </div>
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-lg bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
          До
        </span>
        <span className="pointer-events-none absolute right-3 bottom-3 z-10 rounded-lg bg-background/90 px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
          После
        </span>

        <div
          role="slider"
          tabIndex={0}
          aria-label="Сравнение фото до и после"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`Показано «до» на ${Math.round(position)} процентов`}
          className="absolute inset-0 z-20 cursor-ew-resize focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ring"
          onKeyDown={onKeyDown}
        />
      </div>

      <figcaption className="text-caption">{disclaimer}</figcaption>
      <p className="sr-only">
        {beforeAlt}. {afterAlt}.
      </p>
    </figure>
  )
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}
