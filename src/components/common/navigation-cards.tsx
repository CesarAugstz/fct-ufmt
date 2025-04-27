'use client'
import { cn } from '@/lib/utils'
import { NavigationCard, type CardItem } from './navigation-card'

export interface NavigationCardsProps {
  cards: CardItem[]
  className?: string
  cardsClassName?: string
  title?: string
  description?: string
}

export default function NavigationCards({
  cards,
  className,
  title,
  description,
}: NavigationCardsProps) {
  return (
    <div className={cn('w-full bg-background/50 py-2 md:py-6', className)}>
      <div className="container px-4 mx-auto">
        {(title || description) && (
          <div className="mb-10 text-center">
            {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <NavigationCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
