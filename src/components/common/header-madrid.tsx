'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowLeft, Share2 } from 'lucide-react'
import { useShare } from '@/lib/hooks/share'

interface HeaderMadridProps {
  title?: string
  subtitle?: string | null
  showBackButton?: boolean
  backButtonLabel?: string
  backButtonHref?: string
  showShareButton?: boolean
  shareData?: {
    title?: string
    text?: string
    url?: string
  }
}

export default function HeaderMadrid({
  title,
  subtitle,
  showBackButton,
  backButtonLabel,
  showShareButton,
  shareData,
  backButtonHref,
}: HeaderMadridProps) {
  const { share } = useShare()

  return (
    <div className="relative">
      <div className="relative bg-gradient-to-r from-primary-light via-primary-light/90 to-primary-light/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href={backButtonHref ?? '#'}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {backButtonLabel || 'Voltar'}
                </Link>
              </Button>
            )}
            {showShareButton && (
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() =>
                  share({
                    title: shareData?.title || 'FCT',
                    text: shareData?.text || '',
                    url: window.location.href,
                  })
                }
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            )}
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl text-primary-foreground/80 mb-6 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
