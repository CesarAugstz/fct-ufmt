'use client'

import { forwardRef } from 'react'
import { icons, LucideProps } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconProps extends LucideProps {
  name: keyof typeof icons | string
  fallback?: React.ComponentType<LucideProps>
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, fallback: Fallback, className, ...props }, ref) => {
    const LucideIcon = icons[name as keyof typeof icons] || Fallback

    if (!LucideIcon) {
      console.warn(`Icon "${name}" not found in Lucide icons`)
      return null
    }

    return (
      <LucideIcon ref={ref} className={cn('h-4 w-4', className)} {...props} />
    )
  },
)

Icon.displayName = 'Icon'

export { Icon }
