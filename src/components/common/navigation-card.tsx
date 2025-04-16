'use client'

import type React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { twMerge } from 'tailwind-merge'
import { ReactNode } from 'react'

export interface CardItem {
  id: string
  title: string
  icon: React.ReactNode
  href?: string
  color?: string
  iconSize?: number
}

interface NavigationCardProps {
  card: CardItem
  index: number
  className?: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
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

    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {children}
      </a>
    )
  }
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={className}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <LinkComponent>
        <Card className="overflow-hidden h-full border-none bg-background shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
          <div
            className={cn(
              'h-1.5 w-full bg-primary',
              card.color && `bg-${card.color}-500`,
            )}
          />
          <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full">
            <div
              className={twMerge(
                'mb-6 relative',
                `w-${card.iconSize || '16'} h-${card.iconSize || '16'}`,
              )}
            >
              <div className="absolute -inset-3 rounded-full bg-slate-100/80 blur-sm -z-10" />
              <div className="relative text-primary">{card.icon}</div>
            </div>
            <span className="text-foreground font-medium text-lg">
              {card.title}
            </span>
          </CardContent>
        </Card>
      </LinkComponent>
    </motion.div>
  )
}
