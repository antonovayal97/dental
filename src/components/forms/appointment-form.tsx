'use client'

import * as React from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { CustomSelect } from '@/components/ui/custom-select'
import { DateTimePicker } from '@/components/ui/date-time-picker'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Textarea } from '@/components/ui/textarea'
import {
  appointmentSchema,
  normalizeAppointmentValues,
  type AppointmentFormValues,
} from '@/lib/forms/appointment-schema'
import { submitAppointment } from '@/lib/forms/submit-appointment'
import {
  getDefaultServiceOptions,
  type ServiceOption,
} from '@/lib/forms/service-options'
import { cn } from '@/lib/utils'

export type { ServiceOption }

export interface AppointmentFormProps {
  services?: ServiceOption[]
  defaultService?: string
  compact?: boolean
  className?: string
  onSuccess?: () => void
  idPrefix?: string
}

export function AppointmentForm({
  services = [],
  defaultService,
  compact = false,
  className,
  onSuccess,
  idPrefix,
}: AppointmentFormProps) {
  const reactId = React.useId()
  const prefix = idPrefix ?? `appt-${reactId.replace(/:/g, '')}`
  const [status, setStatus] = React.useState<'idle' | 'success'>('idle')
  const serviceItems = services?.length ? services : getDefaultServiceOptions()
  const [minDate, setMinDate] = React.useState<Date | undefined>(undefined)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields, isSubmitted },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      service: defaultService ?? '',
      preferredDate: '',
      comment: '',
      consent: false,
      website: '',
    },
  })

  React.useEffect(() => {
    setMinDate(new Date())
  }, [])

  const onSubmit = async (values: AppointmentFormValues) => {
    try {
      await submitAppointment(normalizeAppointmentValues(values))
      reset({
        name: '',
        phone: '',
        service: defaultService ?? '',
        preferredDate: '',
        comment: '',
        consent: false,
        website: '',
      })
      setStatus('success')
      toast.success('Заявка отправлена', {
        description: 'Мы свяжемся с вами в ближайшее время.',
      })
      onSuccess?.()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Не удалось отправить заявку. Попробуйте ещё раз.'
      toast.error('Ошибка отправки', { description: message })
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col items-center rounded-2xl border border-accent/20 bg-accent-soft/60 px-6 py-10 text-center',
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2
          className="mb-4 size-10 text-accent"
          aria-hidden="true"
        />
        <h3 className="text-subheading">Заявка принята</h3>
        <p className="mt-2 max-w-sm text-body">
          Спасибо! Администратор клиники свяжется с вами для подтверждения
          записи.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setStatus('idle')}
        >
          Отправить ещё одну заявку
        </Button>
      </div>
    )
  }

  const nameId = `${prefix}-name`
  const phoneId = `${prefix}-phone`
  const serviceId = `${prefix}-service`
  const dateId = `${prefix}-date`
  const commentId = `${prefix}-comment`
  const consentId = `${prefix}-consent`

  const showError = (field: keyof AppointmentFormValues) =>
    Boolean(errors[field] && (touchedFields[field] || isSubmitted))

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-5', compact && 'space-y-4', className)}
      aria-busy={isSubmitting}
    >
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${prefix}-website`}>Сайт</label>
        <input
          id={`${prefix}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className={cn('grid gap-5', compact ? 'gap-4' : 'sm:grid-cols-2')}>
        <FormField
          id={nameId}
          label="Имя"
          required
          error={showError('name') ? errors.name?.message : undefined}
        >
          <Input
            id={nameId}
            autoComplete="name"
            placeholder="Как к вам обращаться"
            disabled={isSubmitting}
            aria-invalid={showError('name') || undefined}
            aria-describedby={showError('name') ? `${nameId}-error` : undefined}
            {...register('name')}
          />
        </FormField>

        <FormField
          id={phoneId}
          label="Телефон"
          required
          error={showError('phone') ? errors.phone?.message : undefined}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                id={phoneId}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={isSubmitting}
                aria-invalid={showError('phone') || undefined}
                aria-describedby={
                  showError('phone') ? `${phoneId}-error` : undefined
                }
              />
            )}
          />
        </FormField>
      </div>

      <div className={cn('grid gap-5', compact ? 'gap-4' : 'sm:grid-cols-2')}>
        <FormField
          id={serviceId}
          label="Услуга"
          error={showError('service') ? errors.service?.message : undefined}
        >
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <CustomSelect
                id={serviceId}
                value={field.value ?? ''}
                onChange={field.onChange}
                options={serviceItems}
                placeholder="Выберите услугу"
                disabled={isSubmitting}
                invalid={showError('service')}
                aria-describedby={
                  showError('service') ? `${serviceId}-error` : undefined
                }
              />
            )}
          />
        </FormField>

        <FormField
          id={dateId}
          label="Желаемая дата"
          hint="Можно выбрать удобный день и время приёма"
          error={
            showError('preferredDate') ? errors.preferredDate?.message : undefined
          }
        >
          <Controller
            name="preferredDate"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                id={dateId}
                value={field.value ?? ''}
                onChange={field.onChange}
                minDate={minDate}
                disabled={isSubmitting}
                invalid={showError('preferredDate')}
                aria-describedby={
                  showError('preferredDate')
                    ? `${dateId}-error`
                    : `${dateId}-hint`
                }
              />
            )}
          />
        </FormField>
      </div>

      <FormField
        id={commentId}
        label="Комментарий"
        error={showError('comment') ? errors.comment?.message : undefined}
      >
        <Textarea
          id={commentId}
          rows={compact ? 3 : 4}
          placeholder="Расскажите о вашем запросе или удобном времени"
          disabled={isSubmitting}
          aria-invalid={showError('comment') || undefined}
          aria-describedby={
            showError('comment') ? `${commentId}-error` : undefined
          }
          {...register('comment')}
        />
      </FormField>

      <div className="space-y-2">
        <label
          htmlFor={consentId}
          className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground"
        >
          <input
            id={consentId}
            type="checkbox"
            disabled={isSubmitting}
            className="mt-1 size-4 shrink-0 rounded border-border accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-invalid={showError('consent') || undefined}
            aria-describedby={
              showError('consent') ? `${consentId}-error` : undefined
            }
            {...register('consent')}
          />
          <span>
            Я согласен(а) на{' '}
            <Link
              href="/privacy"
              className="font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              обработку персональных данных
            </Link>
          </span>
        </label>
        {showError('consent') && errors.consent?.message ? (
          <p
            id={`${consentId}-error`}
            className="text-caption text-destructive"
            role="alert"
          >
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size={compact ? 'default' : 'lg'}
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправляем...' : 'Записаться на приём'}
      </Button>
    </form>
  )
}
