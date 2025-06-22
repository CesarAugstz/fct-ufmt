'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Trash2, Type, Image, ChevronUp, ChevronDown } from 'lucide-react'
import { TextBlockComponent } from './text-block'
import { ImageBlockComponent } from './image-block'
import type { Block } from './types'

interface BlockComponentProps {
  block: Block
  index: number
  totalBlocks: number
  onUpdate: (id: string, updates: Partial<Block>) => void
  onDelete: (id: string) => void
  onAddBlock: (type: 'text' | 'image', index: number) => void
  onMoveUp: (index: number) => void
  onMoveDown: (index: number) => void
}

export function BlockComponent({
  block,
  index,
  totalBlocks,
  onUpdate,
  onDelete,
  onAddBlock,
  onMoveUp,
  onMoveDown,
}: BlockComponentProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Bloco {index + 1} - {block.type === 'text' ? 'Texto' : 'Imagem'}
        </span>
        <div className="flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddBlock('text', index)}
                  className="h-8 w-8 p-0"
                >
                  <Type className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar bloco de texto acima</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddBlock('image', index)}
                  className="h-8 w-8 p-0"
                >
                  <Image className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar bloco de imagem acima</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0}
                  className="h-8 w-8 p-0"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mover para cima</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onMoveDown(index)}
                  disabled={index === totalBlocks - 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mover para baixo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(block.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Excluir bloco</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card className="relative hover:border-primary/30 transition-colors">
        <CardContent className="p-4">
          {block.type === 'text' ? (
            <TextBlockComponent block={block} onUpdate={onUpdate} />
          ) : (
            <ImageBlockComponent block={block} onUpdate={onUpdate} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
