'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

import { DemoBadge } from '@/components/shared/demo-badge'
import { FadeIn } from '@/components/shared/motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { EmptyState } from '@/components/ui/empty-state'
import { SectionHeading } from '@/components/ui/section-heading'
import { DEMO_REVIEWS } from '@/lib/demo-content'
import { cn } from '@/lib/utils'

export type ReviewItem = {
  id: string
  name: string
  text: string
  rating?: number | null
  date?: string | null
  isDemo?: boolean
}

export type ReviewsAggregate = {
  ratingValue: number
  reviewCount: number
}

export type ReviewsProps = {
  reviews?: ReviewItem[] | null
  aggregateRating?: ReviewsAggregate | null
  eyebrow?: string
  title?: string
  description?: string
  className?: string
}

const DEMO_ITEMS: ReviewItem[] = DEMO_REVIEWS.map((review) => ({
  id: review.id,
  name: review.name,
  text: review.text,
  rating: review.rating,
  date: review.date,
  isDemo: review.isDemo,
}))

export function Reviews({
  reviews,
  aggregateRating,
  eyebrow = 'Отзывы',
  title = 'Что говорят пациенты',
  description = 'Реальные впечатления о приёме, коммуникации и результате лечения.',
  className,
}: ReviewsProps) {
  const items = reviews === undefined || reviews === null ? DEMO_ITEMS : reviews
  const usingDemo = reviews == null || items.some((item) => item.isDemo)

  const computedAggregate = React.useMemo(() => {
    if (aggregateRating && aggregateRating.reviewCount > 0) {
      return aggregateRating
    }
    const ratings = items
      .map((item) => item.rating)
      .filter((value): value is number => typeof value === 'number' && value > 0)
    if (ratings.length === 0) return null
    const sum = ratings.reduce((acc, value) => acc + value, 0)
    return {
      ratingValue: Math.round((sum / ratings.length) * 10) / 10,
      reviewCount: ratings.length,
    }
  }, [aggregateRating, items])

  const [index, setIndex] = React.useState(0)
  const count = items.length

  const goPrev = () => {
    setIndex((current) => (current - 1 + count) % count)
  }

  const goNext = () => {
    setIndex((current) => (current + 1) % count)
  }

  React.useEffect(() => {
    setIndex(0)
  }, [count])

  if (items.length === 0) {
    return (
      <section
        className={cn('section-padding', className)}
        aria-labelledby="reviews-heading"
      >
        <Container>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <span id="reviews-heading" className="sr-only">
            {title}
          </span>
          <EmptyState
            className="mt-12"
            title="Отзывов пока нет"
            description="Как только появятся подтверждённые отзывы, мы покажем их здесь — без выдуманных оценок."
          />
        </Container>
      </section>
    )
  }

  const active = items[index] ?? items[0]

  return (
    <section
      className={cn('section-padding', className)}
      aria-labelledby="reviews-heading"
      aria-roledescription="carousel"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            <span id="reviews-heading" className="sr-only">
              {title}
            </span>

            {computedAggregate ? (
              <FadeIn className="mt-8 rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
                <div className="flex items-center gap-2">
                  <p className="text-label">Средняя оценка</p>
                  {usingDemo ? <DemoBadge /> : null}
                </div>
                <div className="mt-3 flex items-end gap-3">
                  <p className="text-4xl font-semibold tracking-tight text-foreground">
                    {computedAggregate.ratingValue.toFixed(1)}
                  </p>
                  <div className="mb-1" aria-hidden="true">
                    <StarRating value={computedAggregate.ratingValue} />
                  </div>
                </div>
                <p className="mt-2 text-caption">
                  На основе {computedAggregate.reviewCount}{' '}
                  {reviewsWord(computedAggregate.reviewCount)}
                  {usingDemo ? ' (демо)' : ''}
                </p>
              </FadeIn>
            ) : null}
          </div>

          <div>
            <div
              className="relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-soft sm:p-8"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <StarRating value={active.rating ?? 0} />
                  <p className="mt-4 text-lg font-semibold text-foreground">
                    {active.name}
                  </p>
                  {active.date ? (
                    <p className="mt-1 text-caption">
                      {formatReviewDate(active.date)}
                    </p>
                  ) : null}
                </div>
                {active.isDemo ? <DemoBadge /> : null}
              </div>

              <blockquote className="text-body text-foreground/90">
                <p>«{active.text}»</p>
              </blockquote>

              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="text-caption" aria-hidden="true">
                  {index + 1} / {count}
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Предыдущий отзыв"
                    onClick={goPrev}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Следующий отзыв"
                    onClick={goNext}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Выбор отзыва">
              {items.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={itemIndex === index}
                  aria-label={`Отзыв ${itemIndex + 1}`}
                  className={cn(
                    'h-2.5 w-2.5 rounded-full transition-colors',
                    itemIndex === index
                      ? 'bg-accent'
                      : 'bg-border hover:bg-muted-foreground/40',
                  )}
                  onClick={() => setIndex(itemIndex)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function StarRating({ value }: { value: number }) {
  const rounded = Math.round(value)
  return (
    <div className="flex items-center gap-1" aria-label={`Оценка ${value} из 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            'size-4',
            index < rounded
              ? 'fill-accent text-accent'
              : 'text-border',
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function formatReviewDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function reviewsWord(count: number): string {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return 'отзыва'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'отзыва'
  return 'отзывов'
}
