import Image from 'next/image'

import { cn, toRelativeMediaUrl } from '@/lib/utils'

export interface MediaImageSource {
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

export interface MediaImageProps {
  media?: MediaImageSource | null
  alt?: string
  width?: number
  height?: number
  sizes?: string
  fill?: boolean
  priority?: boolean
  className?: string
  imageClassName?: string
  fallbackClassName?: string
}

function normalizeSrc(url: string): string {
  const relative = toRelativeMediaUrl(url)
  // Prefer static public assets when Payload media path is used for known files
  // Keep /api/media as-is, but never pass absolute localhost to next/image
  return relative
}

/**
 * Use unoptimized for local/static images to avoid flaky /_next/image
 * (Content-Disposition: attachment + intermittent optimizer failures).
 */
function shouldSkipOptimizer(src: string): boolean {
  return (
    src.startsWith('/images/') ||
    src.startsWith('/api/media/file/') ||
    src.startsWith('/media/')
  )
}

export function MediaImage({
  media,
  alt,
  width,
  height,
  sizes = '(max-width: 768px) 100vw, 50vw',
  fill = false,
  priority = false,
  className,
  imageClassName,
  fallbackClassName,
}: MediaImageProps) {
  const url = media?.url ? normalizeSrc(media.url) : null
  const resolvedAlt = alt ?? media?.alt ?? ''
  const resolvedWidth = width ?? media?.width ?? 1200
  const resolvedHeight = height ?? media?.height ?? 800
  const unoptimized = url ? shouldSkipOptimizer(url) : true

  if (!url) {
    return (
      <div
        className={cn(
          'relative overflow-hidden bg-gradient-to-br from-accent-soft via-muted to-secondary',
          !fill && 'min-h-48 w-full',
          className,
          fallbackClassName,
        )}
        role="img"
        aria-label={resolvedAlt || 'Изображение скоро появится'}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 45%), radial-gradient(circle at 80% 70%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 40%)',
          }}
        />
      </div>
    )
  }

  if (fill) {
    return (
      <div className={cn('relative isolate overflow-hidden', className)}>
        <Image
          src={url}
          alt={resolvedAlt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={unoptimized}
          className={cn('object-cover', imageClassName)}
        />
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={url}
        alt={resolvedAlt}
        width={resolvedWidth}
        height={resolvedHeight}
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className={cn('h-auto w-full object-cover', imageClassName)}
      />
    </div>
  )
}
