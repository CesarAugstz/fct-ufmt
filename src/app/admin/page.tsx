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

export default function AdminPage() {
  const [components, setComponents] = useState<Component[]>([])
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false)
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
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
      if (component.id === selectedComponent.id && component.type === 'cardGroup') {
        return {
          ...component,
          cards: [...(component.cards || []), { id: Date.now().toString(), ...cardData }]
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
          cards: component.cards?.filter(card => card.id !== cardId) || []
        }
      }
      return component
    })
    
    setComponents(updatedComponents)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tela Inicial</h1>
        
        <Dialog open={isComponentDialogOpen} onOpenChange={setIsComponentDialogOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Componente
            </Button>
          </DialogTrigger>
          <ComponentForm 
            onSubmit={handleAddComponent}
            onCancel={() => setIsComponentDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </Dialog>

        <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
          <CardForm 
            onSubmit={handleCardSubmit}
            onCancel={() => setIsCardDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Componentes da Página Inicial</CardTitle>
          <CardDescription>
            Gerencie os componentes que aparecerão na página inicial
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {components.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum componente adicionado. Clique em "Adicionar Componente" para começar.
            </div>
          ) : (
            <div className="space-y-8">
              {components.map((component) => {
                if (component.type === 'cardGroup') {
                  return (
                    <CardGroup 
                      key={component.id}
                      component={component as CardGroupType}
                      onAddCard={() => handleAddCard(component.id)}
                      onRemoveCard={(cardId) => handleRemoveCard(component.id, cardId)}
                      onRemoveComponent={() => handleRemoveComponent(component.id)}
                    />
                  )
                }
                // Handle other component types here
                return null
              })}
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-between">
          <Button variant="outline" className="text-sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button className="text-sm">
            Publicar Alterações
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
