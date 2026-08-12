'use client'

import { Button, toast } from '@payloadcms/ui'
import * as React from 'react'

export default function ClearCacheButton() {
  const [loading, setLoading] = React.useState(false)

  const handleClick = async () => {
    if (loading) return

    setLoading(true)

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      toast.success('Кеш сайта сброшен', {
        description: 'Изменения появятся на сайте при следующем обновлении страницы.',
      })
    } catch {
      toast.error('Не удалось сбросить кеш', {
        description: 'Попробуйте ещё раз или обновите страницу.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      buttonStyle="secondary"
      size="small"
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? 'Сброс...' : 'Сбросить кеш'}
    </Button>
  )
}
