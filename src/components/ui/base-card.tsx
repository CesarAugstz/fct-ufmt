'use client'

import React, { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle, RefreshCw, Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface BaseCardProps {
  title: string
  description?: string

  // Content
  children: ReactNode
  emptyStateMessage?: string
  showEmptyState?: boolean

  // Action buttons
  onAdd?: () => void
  onUpdate?: () => void

  // Dialog control
  dialogContent?: ReactNode
  isDialogOpen?: boolean
  setIsDialogOpen?: (isOpen: boolean) => void

  // Customization
  addButtonText?: string
  updateButtonText?: string

  // Additional options
  hideFooter?: boolean
  hideHeader?: boolean
  className?: string
}

export function BaseCard({
  title,
  description,
  children,
  emptyStateMessage = "Nenhum item adicionado. Clique em 'Adicionar' para começar.",
  showEmptyState = false,

  onAdd,
  onUpdate,

  addButtonText = 'Adicionar',
  updateButtonText = 'Atualizar',

  hideFooter = false,
  hideHeader = false,
  className = '',
}: BaseCardProps) {
  return (
    <Card className={twMerge('m-6', className)}>
      {!hideHeader && (
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>

          <div className="flex gap-4">
            {onUpdate && (
              <Button variant="outline" className="text-sm" onClick={onUpdate}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {updateButtonText}
              </Button>
            )}
            {onAdd && (
              <Button onClick={onAdd} >
                <PlusCircle className="mr-2 h-4 w-4" />
                {addButtonText}
              </Button>
            )}

          </div>
        </CardHeader>
      )}

      <CardContent>
        {showEmptyState ? (
          <div className="text-center py-8 text-gray-500">
            {emptyStateMessage}
          </div>
        ) : (
          children
        )}
      </CardContent>

      {!hideFooter && (
        <CardFooter className="justify-between">

        </CardFooter>
      )}
    </Card>
  )
}
