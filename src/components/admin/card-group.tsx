import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CardGroup as CardGroupType } from '@/types/page-components'
import { Plus, Trash2, Edit } from 'lucide-react'
import { CardItem } from './card-item'

interface CardGroupProps {
  component: CardGroupType;
  onAddCard: () => void;
  onRemoveCard: (cardId: string) => void;
  onRemoveComponent: () => void;
}

export function CardGroup({ component, onAddCard, onRemoveCard, onRemoveComponent }: CardGroupProps) {
  return (
    <Card className="border">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{component.title}</CardTitle>
            {component.description && (
              <CardDescription>{component.description}</CardDescription>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500"
              onClick={onRemoveComponent}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remover
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {component.cards && component.cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {component.cards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onRemove={() => onRemoveCard(card.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Nenhum card adicionado a este grupo.
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-auto"
          onClick={onAddCard}
        >
          <Plus className="h-4 w-4 mr-1" />
          Adicionar Card
        </Button>
      </CardFooter>
    </Card>
  )
}
