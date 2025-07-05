'use client'

import ToolTipMadrid from '@/components/common/tooltip-madrid'
import { ContentNature } from '@prisma/client'

import { Plus, Type, Image, List } from 'lucide-react'

interface AddBlockButtonProps {
  onAdd: (type: ContentNature) => void
}

export function AddBlockButton({ onAdd }: AddBlockButtonProps) {
  return (
    <div className="flex gap-2 justify-center">
      <ToolTipMadrid
        onClick={() => onAdd(ContentNature.TEXT)}
        content="Adiciona um novo bloco de texto"
      >
        <Plus className="h-3 w-3" />
        <Type className="h-3 w-3" />
        Texto
      </ToolTipMadrid>

      <ToolTipMadrid
        onClick={() => onAdd(ContentNature.IMAGE)}
        content="Adiciona um novo bloco de imagem"
      >
        <Plus className="h-3 w-3" />
        <Image className="h-3 w-3" />
        Imagem
      </ToolTipMadrid>

      <ToolTipMadrid
        onClick={() => onAdd(ContentNature.ACCORDION)}
        content="Adiciona um novo bloco de accordion"
      >
        <Plus className="h-3 w-3" />
        <List className="h-3 w-3" />
        Accordion
      </ToolTipMadrid>
    </div>
  )
}
