'use client'
import type React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { getAnimationOnViewUp } from '@/utils/animations/on-view-up'

export interface CardItem {
  id: string
  title: string
  icon: React.ReactNode
  href?: string
  color?: string
  iconSize?: number
  description?: string | null
}

interface NavigationCardProps {
  card: CardItem
  index: number
  className?: string
}

export function NavigationCard({
  card,
  index,
  className,
}: NavigationCardProps) {
  const LinkComponent = ({ children }: { children: ReactNode }) => {
    if (card.href?.startsWith('/')) {
      return (
        <Link href={card.href} className="block h-full">
          {children}
        </Link>
      )
    }
    return card.href ? (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {children}
      </a>
    ) : (
      <div className="block h-full">{children}</div>
    )
  }

  return (
    <motion.div
      custom={index}
      className={className}
      {...getAnimationOnViewUp(index)}
    >
      <LinkComponent>
        <Card className="overflow-hidden h-full border bg-background/50 backdrop-blur-sm hover:bg-background/80 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl group">
          <CardContent className="flex flex-col items-center justify-center text-center h-full">
            <div className="mb-4 relative w-16 h-16 flex items-center justify-center">
              <div
                className={cn(
                  'absolute inset-0 rounded-full opacity-20 group-hover:opacity-30 transition-all duration-300 scale-90 group-hover:scale-100',
                  card.color ? `bg-${card.color}-200` : 'bg-primary/20',
                )}
              />
              <div
                className={cn(
                  'relative text-primary group-hover:scale-110 transition-all duration-300',
                  card.color && `text-${card.color}-600`,
                )}
              >
                {card.icon}
              </div>
            </div>
            <span className="text-foreground font-semibold text-lg mb-1 group-hover:text-primary transition-colors duration-300">
              {card.title}
            </span>
            {card.description && (
              <p className="text-muted-foreground text-sm mt-1">
                {card.description}
              </p>
            )}
            {card.href && (
              <div className="mt-3 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Acessar →
              </div>
            )}
          </CardContent>
        </Card>
      </LinkComponent>
    </motion.div>
  )
}
