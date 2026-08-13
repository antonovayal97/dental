'use client'

import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      richColors={false}
      closeButton
      theme="light"
      toastOptions={{
        classNames: {
          toast:
            'border border-border bg-card text-card-foreground rounded-2xl',
          title: 'text-sm font-semibold text-foreground',
          description: 'text-sm text-muted-foreground',
          actionButton:
            'bg-accent text-accent-foreground rounded-xl px-3 py-1.5 text-xs font-medium',
          cancelButton:
            'bg-secondary text-secondary-foreground rounded-xl px-3 py-1.5 text-xs font-medium',
          closeButton:
            'border border-border bg-card text-muted-foreground hover:text-foreground',
          success: 'border-accent/30',
          error: 'border-destructive/30',
        },
      }}
    />
  )
}
