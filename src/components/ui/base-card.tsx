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
import { ArrowLeft, PlusCircle, RefreshCw } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface BaseCardProps {
  title: string
  description?: string

  // Content
  children: ReactNode
  emptyStateMessage?: string
  showEmptyState?: boolean
  loading?: boolean

  // Action buttons
  onAdd?: () => void
  onUpdate?: () => void
  onBack?: () => void

  rightButtons?: ReactNode

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
  loading = false,

  onAdd,
  onUpdate,
  onBack,
  rightButtons,

  addButtonText = 'Adicionar',
  updateButtonText = 'Atualizar',

  hideFooter = false,
  hideHeader = false,
  className = '',
}: BaseCardProps) {
  return (
    <Card className={twMerge('w-full h-full overflow-y-scroll', className)}>
      {!hideHeader && (
        <CardHeader className="flex flex-wrap gap-2 flex-row items-center justify-between">
          <div className="flex gap-2">
            {onBack && (
              <ArrowLeft className="text-sm" onClick={onBack}>
                Voltar
              </ArrowLeft>
            )}
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {rightButtons}
            {onUpdate && (
              <Button
                variant="secondary"
                className="text-sm"
                onClick={onUpdate}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {updateButtonText}
              </Button>
            )}
            {onAdd && (
              <Button onClick={onAdd} variant="default">
                <PlusCircle className="mr-2 h-4 w-4" />
                {addButtonText}
              </Button>
            )}
          </div>
        </CardHeader>
      )}

      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <p>Carregando...</p>
          </div>
        ) : showEmptyState ? (
          <div className="text-center py-8 text-gray-500">
            {emptyStateMessage}
          </div>
        ) : (
          children
        )}
      </CardContent>

      {!hideFooter && <CardFooter className="justify-between"></CardFooter>}
    </Card>
  )
}
