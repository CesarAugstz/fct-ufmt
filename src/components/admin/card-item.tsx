import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Card as CardType } from '@/types/page-components'
import { Edit, Trash2, ExternalLink } from 'lucide-react'
import { Home, Bell, Book, Calendar, Users, Star } from 'lucide-react'

interface CardItemProps {
  card: CardType;
  onRemove: () => void;
}

export function CardItem({ card, onRemove }: CardItemProps) {
  // Function to get the appropriate icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'home': return Home;
      case 'bell': return Bell;
      case 'book': return Book;
      case 'calendar': return Calendar;
      case 'users': return Users;
      case 'star': return Star;
      default: return Home;
    }
  }

  const IconComponent = getIconComponent(card.icon);

  return (
    <Card className="border">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <IconComponent className="h-5 w-5 mr-2 text-primary" />
            <CardTitle className="text-lg">{card.title}</CardTitle>
          </div>
        </div>
        {card.description && (
          <CardDescription>{card.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm">{card.content}</p>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-500"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remover
        </Button>
        {card.link && (
          <Button 
            variant="ghost" 
            size="sm" 
            as="a" 
            href={card.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Link
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
