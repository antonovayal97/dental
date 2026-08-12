'use client'

import * as React from 'react'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  X,
} from 'lucide-react'

import { fieldControlClassName } from '@/components/ui/form-field'
import { cn } from '@/lib/utils'

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const TIME_SLOTS = Array.from({ length: 23 }, (_, index) => {
  const hour = 9 + Math.floor(index / 2)
  const minute = index % 2 === 0 ? '00' : '30'
  return `${String(hour).padStart(2, '0')}:${minute}`
})

export interface DateTimePickerProps {
  id?: string
  value: string
  onChange: (value: string) => void
  minDate?: Date
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
  className?: string
  'aria-describedby'?: string
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function toLocalDateTimeString(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function parseLocalDateTime(value: string): Date | null {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDisplay(value: string): string {
  const date = parseLocalDateTime(value)
  if (!date) return ''

  const datePart = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

  const timePart = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

  return `${datePart}, ${timePart}`
}

function buildCalendarDays(month: Date): Array<Date | null> {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const firstDay = new Date(year, monthIndex, 1)
  const offset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const cells: Array<Date | null> = []

  for (let i = 0; i < offset; i += 1) cells.push(null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, monthIndex, day))
  }

  return cells
}

export function DateTimePicker({
  id,
  value,
  onChange,
  minDate,
  disabled = false,
  invalid = false,
  placeholder = 'Выберите дату и время',
  className,
  'aria-describedby': ariaDescribedBy,
}: DateTimePickerProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const selectedDate = parseLocalDateTime(value)
  const [open, setOpen] = React.useState(false)
  const [viewMonth, setViewMonth] = React.useState(
    () => selectedDate ?? minDate ?? new Date(),
  )
  const [pendingDate, setPendingDate] = React.useState<Date | null>(
    () => selectedDate,
  )
  const [pendingTime, setPendingTime] = React.useState<string>(() => {
    if (!selectedDate) return '10:00'
    return `${pad(selectedDate.getHours())}:${pad(selectedDate.getMinutes())}`
  })

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
    if (!open) return
    const base = selectedDate ?? minDate ?? new Date()
    setViewMonth(base)
    setPendingDate(selectedDate)
    setPendingTime(
      selectedDate
        ? `${pad(selectedDate.getHours())}:${pad(selectedDate.getMinutes())}`
        : '10:00',
    )
  }, [open, selectedDate, minDate])

  const minDay = minDate ? startOfDay(minDate) : null

  const isDayDisabled = (day: Date) => {
    if (!minDay) return false
    return startOfDay(day).getTime() < minDay.getTime()
  }

  const isTimeDisabled = (time: string) => {
    if (!pendingDate || !minDate) return false
    const [hours, minutes] = time.split(':').map(Number)
    const candidate = new Date(
      pendingDate.getFullYear(),
      pendingDate.getMonth(),
      pendingDate.getDate(),
      hours,
      minutes,
    )
    return candidate.getTime() < minDate.getTime()
  }

  const monthLabel = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
  }).format(viewMonth)

  const applySelection = () => {
    if (!pendingDate) return
    const [hours, minutes] = pendingTime.split(':').map(Number)
    const next = new Date(
      pendingDate.getFullYear(),
      pendingDate.getMonth(),
      pendingDate.getDate(),
      hours,
      minutes,
    )
    onChange(toLocalDateTimeString(next))
    setOpen(false)
  }

  const clearSelection = () => {
    onChange('')
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <div
        className={cn(
          fieldControlClassName,
          'gap-2 p-0',
          !value && 'text-muted-foreground',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <button
          id={id}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-invalid={invalid || undefined}
          aria-describedby={ariaDescribedBy}
          onClick={() => !disabled && setOpen((current) => !current)}
          className="flex min-w-0 flex-1 items-center gap-2.5 px-4 py-2.5 text-left"
        >
          <CalendarDays
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground"
          />
          <span className="truncate">
            {value ? formatDisplay(value) : placeholder}
          </span>
        </button>

        {value ? (
          <button
            type="button"
            disabled={disabled}
            aria-label="Очистить дату"
            className="mr-2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none"
            onClick={clearSelection}
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <ChevronRight
            aria-hidden="true"
            className={cn(
              'mr-3 size-4 shrink-0 text-muted-foreground transition-transform duration-200',
              open && 'rotate-90',
            )}
          />
        )}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-label="Выбор даты и времени"
          className="absolute z-50 mt-2 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-border/80 bg-card shadow-lift sm:w-[22rem]"
        >
          <div className="border-b border-border/70 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Предыдущий месяц"
                className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() =>
                  setViewMonth(
                    (current) =>
                      new Date(current.getFullYear(), current.getMonth() - 1, 1),
                  )
                }
              >
                <ChevronLeft className="size-4" />
              </button>
              <p className="text-sm font-semibold capitalize text-foreground">
                {monthLabel}
              </p>
              <button
                type="button"
                aria-label="Следующий месяц"
                className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() =>
                  setViewMonth(
                    (current) =>
                      new Date(current.getFullYear(), current.getMonth() + 1, 1),
                  )
                }
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="mb-2 grid grid-cols-7 gap-1">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="py-1 text-center text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {buildCalendarDays(viewMonth).map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} aria-hidden="true" />
                }

                const disabledDay = isDayDisabled(day)
                const isSelected = pendingDate ? isSameDay(day, pendingDate) : false
                const isToday = isSameDay(day, new Date())

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    disabled={disabledDay}
                    onClick={() => setPendingDate(day)}
                    className={cn(
                      'flex h-9 items-center justify-center rounded-xl text-sm transition-colors',
                      disabledDay && 'cursor-not-allowed opacity-35',
                      !disabledDay && !isSelected && 'hover:bg-accent-soft',
                      isToday && !isSelected && 'ring-1 ring-accent/30',
                      isSelected && 'bg-accent text-accent-foreground shadow-soft',
                    )}
                  >
                    {day.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border-t border-border/70 px-4 py-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock3 aria-hidden="true" className="size-4 text-accent" />
              Время приёма
            </div>
            <div className="grid max-h-36 grid-cols-3 gap-2 overflow-auto sm:grid-cols-4">
              {TIME_SLOTS.map((time) => {
                const disabledTime = isTimeDisabled(time)
                const isSelected = pendingTime === time

                return (
                  <button
                    key={time}
                    type="button"
                    disabled={disabledTime || !pendingDate}
                    onClick={() => setPendingTime(time)}
                    className={cn(
                      'rounded-xl border px-2 py-2 text-xs font-medium transition-colors',
                      disabledTime || !pendingDate
                        ? 'cursor-not-allowed border-border/60 text-muted-foreground/50'
                        : 'border-border hover:border-accent/35 hover:bg-accent-soft',
                      isSelected &&
                        'border-accent bg-accent text-accent-foreground shadow-soft hover:bg-accent',
                    )}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border/70 px-4 py-3">
            <button
              type="button"
              className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              Отмена
            </button>
            <button
              type="button"
              disabled={!pendingDate}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-soft transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={applySelection}
            >
              Выбрать
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
