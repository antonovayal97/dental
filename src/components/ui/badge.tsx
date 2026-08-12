import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-border bg-transparent text-foreground',
        soft: 'bg-accent-soft text-accent',
        muted: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
