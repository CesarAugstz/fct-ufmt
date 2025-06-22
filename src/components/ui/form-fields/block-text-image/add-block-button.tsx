'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Plus, Type, Image } from 'lucide-react'

interface AddBlockButtonProps {
  onAdd: (type: 'text' | 'image') => void
}

export function AddBlockButton({ onAdd }: AddBlockButtonProps) {
  return (
    <div className="flex gap-2 justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => onAdd('text')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <Type className="h-4 w-4" />
              Adicionar Texto
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adiciona um novo bloco de texto ao final</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => onAdd('image')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <Image className="h-4 w-4" />
              Adicionar Imagem
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adiciona um novo bloco de imagem ao final</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
