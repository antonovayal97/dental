'use client'

import * as React from 'react'

import {
  AppointmentForm,
  type AppointmentFormProps,
} from '@/components/forms/appointment-form'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export interface AppointmentDialogProps
  extends Omit<AppointmentFormProps, 'onSuccess' | 'className'> {
  triggerLabel?: string
  triggerVariant?: ButtonProps['variant']
  triggerSize?: ButtonProps['size']
  triggerClassName?: string
  title?: string
  description?: string
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AppointmentDialog({
  triggerLabel = 'Записаться',
  triggerVariant = 'default',
  triggerSize = 'default',
  triggerClassName,
  title = 'Запись на приём',
  description = 'Оставьте контакты — администратор перезвонит и подберёт удобное время.',
  className,
  open: controlledOpen,
  onOpenChange,
  ...formProps
}: AppointmentDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  return (
    <>
      {!isControlled ? (
        <Button
          type="button"
          variant={triggerVariant}
          size={triggerSize}
          className={triggerClassName}
          onClick={() => setOpen(true)}
        >
          {triggerLabel}
        </Button>
      ) : null}

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        className={cn('max-w-xl', className)}
      >
        <AppointmentForm
          {...formProps}
          compact
          onSuccess={() => setOpen(false)}
        />
      </Dialog>
    </>
  )
}
