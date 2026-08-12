import * as React from 'react'

import { cn } from '@/lib/utils'

export interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as: TitleTag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl space-y-3',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? <p className="text-label">{eyebrow}</p> : null}
      <TitleTag className="text-heading">{title}</TitleTag>
      {description ? <p className="text-body">{description}</p> : null}
    </div>
  )
}
