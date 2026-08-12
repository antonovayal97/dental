import { Container } from '@/components/ui/container'

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-br from-muted via-secondary/80 to-muted ${className ?? ''}`}
      aria-hidden="true"
    />
  )
}

export default function Loading() {
  return (
    <div className="section-padding" role="status" aria-live="polite" aria-label="Загрузка страницы">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="space-y-5">
            <SkeletonBlock className="h-4 w-40" />
            <SkeletonBlock className="h-14 w-full max-w-xl" />
            <SkeletonBlock className="h-14 w-4/5 max-w-lg" />
            <SkeletonBlock className="h-20 w-full max-w-md" />
            <div className="flex gap-3 pt-2">
              <SkeletonBlock className="h-12 w-48" />
              <SkeletonBlock className="h-12 w-40" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-8 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBlock key={index} className="h-16" />
              ))}
            </div>
          </div>
          <SkeletonBlock className="aspect-[4/5] w-full" />
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-28" />
          ))}
        </div>

        <div className="mt-16 space-y-6">
          <SkeletonBlock className="h-10 w-72" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-44" />
            ))}
          </div>
        </div>
      </Container>
      <span className="sr-only">Загружаем содержимое…</span>
    </div>
  )
}
