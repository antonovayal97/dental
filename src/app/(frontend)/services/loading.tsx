import { Container } from '@/components/ui/container'

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-br from-muted via-secondary/70 to-muted ${className ?? ''}`}
      aria-hidden="true"
    />
  )
}

export default function ServicesLoading() {
  return (
    <div className="section-padding" role="status" aria-label="Загрузка услуг">
      <Container className="space-y-8">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-12 w-80 max-w-full" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-48" />
          ))}
        </div>
      </Container>
    </div>
  )
}
