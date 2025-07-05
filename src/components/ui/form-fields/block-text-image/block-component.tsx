'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { Trash2, Type, Image, ChevronUp, ChevronDown } from 'lucide-react'
import { TextBlockComponent } from './text-block'
import { ImageBlockComponent } from './image-block'
import { BlockConfig } from './block-config'
import type { Block, ImageBlock, TextBlock } from './types'
import { ContentNature, GridSize } from '@prisma/client'

interface BlockComponentProps {
  block: Block
  index: number
  totalBlocks: number
  onUpdate: (id: string, updates: Partial<Block>) => void
  onDelete: (id: string) => void
  onAddBlock: (nature: ContentNature, index: number) => void
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
  const getGridClass = (gridSize: GridSize | undefined) => {
    switch (gridSize) {
      case GridSize.ONE:
        return 'col-span-3'
      case GridSize.TWO:
        return 'col-span-6'
      case GridSize.THREE:
        return 'col-span-9'
      case GridSize.FOUR:
      default:
        return 'col-span-12'
    }
  }

  const borderClass = block.withBorder
    ? 'border-2 border-border/50'
    : 'border border-border/30'

  return (
    <div
      className={`group relative ${borderClass} rounded-md p-3 hover:border-border transition-colors ${getGridClass(
        block.gridSize,
      )}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {block.nature === 'TEXT' ? 'Texto' : 'Imagem'} {index + 1}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <BlockConfig block={block} onUpdate={onUpdate} />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddBlock(ContentNature.TEXT, index)}
                  className="h-6 w-6 p-0"
                >
                  <Type className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar texto acima</p>
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
                  onClick={() => onAddBlock(ContentNature.IMAGE, index)}
                  className="h-6 w-6 p-0"
                >
                  <Image className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adicionar imagem acima</p>
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
                  className="h-6 w-6 p-0"
                >
                  <ChevronUp className="h-3 w-3" />
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
                  className="h-6 w-6 p-0"
                >
                  <ChevronDown className="h-3 w-3" />
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
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Excluir bloco</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div>
        {block.nature === 'TEXT' ? (
          <TextBlockComponent block={block as TextBlock} onUpdate={onUpdate} />
        ) : (
          <ErrorBoundary>
            <ImageBlockComponent
              block={block as ImageBlock}
              onUpdate={onUpdate}
            />
          </ErrorBoundary>
        )}
      </div>
    </div>
  )
}
