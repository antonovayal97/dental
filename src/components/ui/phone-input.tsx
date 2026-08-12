'use client'

import * as React from 'react'
import { Phone } from 'lucide-react'

import { fieldControlClassName } from '@/components/ui/form-field'
import { formatPhoneInput } from '@/lib/forms/phone'
import { cn } from '@/lib/utils'

export interface PhoneInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  value: string
  onChange: (value: string) => void
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, disabled, id, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(formatPhoneInput(event.target.value))
    }

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (!value) onChange('+7 (')
      props.onFocus?.(event)
    }

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (value === '+7 (' || value === '+7') onChange('')
      props.onBlur?.(event)
    }

    return (
      <div className="relative">
        <Phone
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="+7"
          className={cn(fieldControlClassName, 'pl-10', className)}
          {...props}
        />
      </div>
    )
  },
)
PhoneInput.displayName = 'PhoneInput'
