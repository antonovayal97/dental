import { Container } from '@/components/ui/container'

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-br from-muted via-secondary/70 to-muted ${className ?? ''}`}
      aria-hidden="true"
    />
  )
}

export default function ServiceDetailLoading() {
  return (
    <div className="section-padding" role="status" aria-label="Загрузка услуги">
      <Container className="space-y-8">
        <Skeleton className="h-4 w-56" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-48" />
          </div>
          <Skeleton className="aspect-[4/3] w-full" />
        </div>
      </Container>
    </div>
  )
}
