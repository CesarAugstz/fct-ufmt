'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle, RefreshCw } from 'lucide-react'
import LoadingSpinner from '@/components/common/loading-spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CardForm } from '@/components/admin/card-form'
import { CardGroup } from '@/components/admin/card-group'
import { Component, CardGroup as CardGroupType } from '@/types/page-components'
import { ComponentForm } from '@/components/admin/component-form'
import { BaseCard } from '@/components/ui/base-card'

export default function AdminPage() {
  const [components, setComponents] = useState<Component[]>([])
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false)
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(
    null,
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddComponent = (component: Component) => {
    setComponents([...components, component])
    setIsComponentDialogOpen(false)
  }

  const handleAddCard = (componentId: string) => {
    const component = components.find(c => c.id === componentId)
    if (component) {
      setSelectedComponent(component)
      setIsCardDialogOpen(true)
    }
  }

  const handleCardSubmit = (cardData: any) => {
    if (!selectedComponent) return

    const updatedComponents = components.map(component => {
      if (
        component.id === selectedComponent.id &&
        component.type === 'cardGroup'
      ) {
        return {
          ...component,
          cards: [
            ...(component.cards || []),
            { id: Date.now().toString(), ...cardData },
          ],
        }
      }
      return component
    })

    setComponents(updatedComponents)
    setIsCardDialogOpen(false)
  }

  const handleRemoveComponent = (componentId: string) => {
    setComponents(components.filter(c => c.id !== componentId))
  }

  const handleRemoveCard = (componentId: string, cardId: string) => {
    const updatedComponents = components.map(component => {
      if (component.id === componentId && component.type === 'cardGroup') {
        return {
          ...component,
          cards: component.cards?.filter(card => card.id !== cardId) || [],
        }
      }
      return component
    })

    setComponents(updatedComponents)
  }

  return (
    <BaseCard
      title="Tela Inicial"
      emptyStateMessage='Nenhum componente adicionado. Clique em "Adicionar" para começar.'
      onAdd={() => console.log('Add Component')}
      onUpdate={() => console.log('Update Component')}
    >
      <div>Tela inicial </div>
    </BaseCard>
  )
}
