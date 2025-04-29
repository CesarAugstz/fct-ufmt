import { useCallback } from 'react'
import { useToast } from './toast'
import { useIsMobile } from './is-mobile'

interface HandleShareArgs {
  title: string
  text?: string
  url?: string
}

export function useShare() {
  const toast = useToast()
  const { isMobileUserAgent: isMobile } = useIsMobile()

  const share = useCallback(
    async ({ title, text, url }: HandleShareArgs) => {
      const platform = isMobile ? 'native' : 'copy'

      const shareUrl = window.location.href

      if (platform === 'native') {
        if (!navigator.share)
          return toast.error('Seu dispositivo não suporta o compartilhamento')

        try {
          await navigator.share({
            title,
            text,
            url,
          })
        } catch (error) {
          console.log('Error sharing:', error)
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareUrl)
          toast.success('Link copiado para a área de transferência!')
        } catch (error) {
          console.log('Error copying:', error)
        }
      }
    },
    [isMobile, toast],
  )

  return {
    share,
  }
}
