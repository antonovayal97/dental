'use client'

import * as React from 'react'
import { Check, ChevronDown } from 'lucide-react'

import { fieldControlClassName } from '@/components/ui/form-field'
import { cn } from '@/lib/utils'

export type SelectOption = {
  label: string
  value: string
}

export interface CustomSelectProps {
  id?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  'aria-describedby'?: string
}

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder = 'Выберите значение',
  disabled = false,
  invalid = false,
  className,
  'aria-describedby': ariaDescribedBy,
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const listRef = React.useRef<HTMLUListElement>(null)

  const selected = options.find((option) => option.value === value)

  React.useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  React.useEffect(() => {
    if (!open) {
      setHighlightedIndex(-1)
      return
    }

    const selectedIndex = options.findIndex((option) => option.value === value)
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }, [open, options, value])

  React.useEffect(() => {
    if (!open || highlightedIndex < 0) return
    const item = listRef.current?.children[highlightedIndex] as
      | HTMLElement
      | undefined
    item?.scrollIntoView({ block: 'nearest' })
  }, [open, highlightedIndex])

  const selectOption = (option: SelectOption) => {
    onChange(option.value)
    setOpen(false)
  }

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen((current) => !current)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setHighlightedIndex((current) =>
        current < options.length - 1 ? current + 1 : 0,
      )
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setOpen(true)
      setHighlightedIndex((current) =>
        current > 0 ? current - 1 : options.length - 1,
      )
    }
  }

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((current) =>
        current < options.length - 1 ? current + 1 : 0,
      )
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((current) =>
        current > 0 ? current - 1 : options.length - 1,
      )
      return
    }

    if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault()
      const option = options[highlightedIndex]
      if (option) selectOption(option)
    }
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        aria-describedby={ariaDescribedBy}
        onClick={() => !disabled && setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          fieldControlClassName,
          'justify-between gap-3 text-left',
          !selected && 'text-muted-foreground',
        )}
      >
        <span className="truncate">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={id}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-border/80 bg-card p-1.5"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value
            const isHighlighted = index === highlightedIndex

            return (
              <li
                key={option.value || `option-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => selectOption(option)}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                  isHighlighted && 'bg-accent-soft text-foreground',
                  isSelected && 'font-medium text-accent',
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected ? (
                  <Check aria-hidden="true" className="size-4 shrink-0" />
                ) : null}
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
