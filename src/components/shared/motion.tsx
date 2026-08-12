'use client'

import * as React from 'react'
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Transition,
} from 'framer-motion'

import { cn } from '@/lib/utils'

const defaultTransition: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
}

type MotionDivProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children?: React.ReactNode
}

/**
 * Never animate opacity on content that may include images.
 * IntersectionObserver + opacity:0 (or near-zero) causes
 * "visible only when DevTools opens" — reflow re-triggers IO.
 * Animate transform only; content stays fully visible.
 */

export interface FadeInProps extends MotionDivProps {
  delay?: number
  duration?: number
  immediate?: boolean
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  immediate = false,
  ...props
}: FadeInProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion || immediate) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 8 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -40px 0px' }}
      transition={{ ...defaultTransition, duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface SlideUpProps extends MotionDivProps {
  delay?: number
  duration?: number
  distance?: number
  immediate?: boolean
}

export function SlideUp({
  children,
  className,
  delay = 0,
  duration = 0.4,
  distance = 16,
  immediate = false,
  ...props
}: SlideUpProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion || immediate) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ y: distance }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -40px 0px' }}
      transition={{ ...defaultTransition, duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface StaggerChildrenProps extends MotionDivProps {
  stagger?: number
  delayChildren?: number
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.05,
  delayChildren = 0.02,
  ...props
}: StaggerChildrenProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05, margin: '0px 0px -40px 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export interface StaggerItemProps extends MotionDivProps {
  distance?: number
}

export function StaggerItem({
  children,
  className,
  distance = 12,
  ...props
}: StaggerItemProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { y: distance },
        visible: {
          y: 0,
          transition: defaultTransition,
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
