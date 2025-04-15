'use client'
import { cn } from '@/lib/utils'
import { NavigationCard, type CardItem } from './navigation-card'

export interface NavigationCardsProps {
  cards: CardItem[]
  className?: string
}

export default function NavigationCards({
  cards,
  className,
}: NavigationCardsProps) {
  return (
    <div
      className={cn(
        'w-full bg-gradient-to-b from-primary-50 to-seconday py-12',
        className,
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <NavigationCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
