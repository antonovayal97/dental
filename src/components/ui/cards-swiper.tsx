'use client'

import { Children, useEffect, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import 'swiper/css'

export type CardsSwiperProps = {
  children: ReactNode
  /**
   * Классы раскладки для планшета/десктопа.
   * Не передавайте display-утилиты (grid/hidden/block) — ими управляет компонент.
   */
  desktopClassName?: string
  /** С какого брейкпоинта показывать сетку вместо слайдера */
  from?: 'sm' | 'md' | 'lg'
  /** Тип десктопной раскладки */
  layout?: 'grid' | 'stack'
  className?: string
  slidesPerView?: number
  spaceBetween?: number
  ariaLabel?: string
}

/** Совпадает с padding у `.container-site` на мобиле / sm. */
function getContainerEdgeOffset() {
  if (typeof window === 'undefined') return 16
  return window.matchMedia('(min-width: 640px)').matches ? 24 : 16
}

export function CardsSwiper({
  children,
  desktopClassName,
  from = 'sm',
  layout = 'grid',
  className,
  slidesPerView = 1.3,
  spaceBetween = 16,
  ariaLabel = 'Карточки',
}: CardsSwiperProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [edgeOffset, setEdgeOffset] = useState(16)

  const slides = Children.toArray(children).filter(Boolean)

  useEffect(() => {
    const update = () => setEdgeOffset(getContainerEdgeOffset())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (!swiper) return
    swiper.params.slidesOffsetBefore = edgeOffset
    swiper.params.slidesOffsetAfter = edgeOffset
    swiper.update()
    setActiveIndex(swiper.activeIndex)
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }, [swiper, edgeOffset])

  if (slides.length === 0) return null

  // Важно: display-классы только здесь.
  // Нельзя смешивать с `grid`/`block` в desktopClassName — tailwind-merge
  // выкинет `hidden`, и обе раскладки станут видны сразу.
  const mobileOnly =
    from === 'sm' ? 'sm:hidden' : from === 'md' ? 'md:hidden' : 'lg:hidden'

  const desktopDisplay =
    from === 'sm'
      ? layout === 'grid'
        ? 'hidden sm:grid'
        : 'hidden sm:block'
      : from === 'md'
        ? layout === 'grid'
          ? 'hidden md:grid'
          : 'hidden md:block'
        : layout === 'grid'
          ? 'hidden lg:grid'
          : 'hidden lg:block'

  function syncState(instance: SwiperType) {
    setActiveIndex(instance.activeIndex)
    setIsBeginning(instance.isBeginning)
    setIsEnd(instance.isEnd)
  }

  return (
    <div className={cn('min-w-0', className)}>
      <div className={cn('cards-swiper min-w-0', mobileOnly)}>
        {/*
          Full-bleed от viewport через calc(50% - 50vw): корректно внутри колонок
          и при transform у SlideUp (в отличие от left/translate).
        */}
        <div
          className="cards-swiper-bleed relative max-w-[100vw]"
          style={{
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
          }}
        >
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={spaceBetween}
            slidesOffsetBefore={edgeOffset}
            slidesOffsetAfter={edgeOffset}
            watchOverflow
            onSwiper={(instance) => {
              setSwiper(instance)
              syncState(instance)
            }}
            onSlideChange={syncState}
            onResize={syncState}
            aria-label={ariaLabel}
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={getSlideKey(slide, index)}
                className="!h-auto min-w-0"
              >
                <div className="h-full min-w-0 w-full max-w-full">{slide}</div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {slides.length > 1 ? (
          <div className="mt-5 flex items-center justify-between gap-4">
            <div
              className="cards-swiper-pagination flex flex-1 flex-wrap items-center gap-1.5"
              role="tablist"
              aria-label="Пагинация карточек"
            >
              {slides.map((slide, index) => (
                <button
                  key={getSlideKey(slide, index)}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Слайд ${index + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    index === activeIndex
                      ? 'w-5 bg-accent'
                      : 'w-2 bg-border hover:bg-muted-foreground/40',
                  )}
                  onClick={() => swiper?.slideTo(index)}
                />
              ))}
            </div>

            <div className="flex shrink-0 gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9"
                aria-label="Предыдущая карточка"
                disabled={isBeginning}
                onClick={() => swiper?.slidePrev()}
              >
                <ChevronLeft />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-9"
                aria-label="Следующая карточка"
                disabled={isEnd}
                onClick={() => swiper?.slideNext()}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <div className={cn(desktopDisplay, desktopClassName)}>{slides}</div>
    </div>
  )
}

function getSlideKey(slide: ReactNode, index: number): string | number {
  if (
    slide &&
    typeof slide === 'object' &&
    'key' in slide &&
    slide.key != null
  ) {
    return slide.key
  }
  return index
}
