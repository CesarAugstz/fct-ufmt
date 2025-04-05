import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useMemo } from 'react'
import { z } from 'zod'

interface TitleProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  className?: string
  height?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Title({
  title,
  subtitle,
  backgroundImage,
  className = '',
  height = 'sm',
}: TitleProps) {
  const heightClasses = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-96',
  }

  const isValidSrcBackgroundImage = useMemo(() => {
    return backgroundImage && z.string().url().safeParse(backgroundImage).success
  }, [backgroundImage])

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-lg shadow-lg bg-slate-400',
        heightClasses[height],
        className,
      )}
    >
      <div className="absolute inset-0 w-full h-full">
        {isValidSrcBackgroundImage && (
          <Image
            src={backgroundImage!}
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        )}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-b',
            'from-white/10 to-white/80',
          )}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center">
        <h1
          className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold mb-2 transition-all text-[#003366]',
          )}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={cn(
              'text-lg md:text-xl max-w-2xl mx-auto opacity-90 transition-all text-[#011e3b]',
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
