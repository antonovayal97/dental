import * as React from 'react'

import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'
}

export function Container({
  as: Comp = 'div',
  className,
  ...props
}: ContainerProps) {
  return <Comp className={cn('container-site', className)} {...props} />
}
