'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, FileText, Image as ImageIcon, List } from 'lucide-react'
import { BlockContentRenderer } from '@/components/common/block-content-renderer'
import type { Block } from './types'

interface BlockVisualizerProps {
  blocks: Block[]
}

export function BlockVisualizer({ blocks }: BlockVisualizerProps) {
  const [isVisible, setIsVisible] = useState(false)

  if (!blocks.length) {
    return null
  }

  const textBlocks = blocks.filter(block => block.nature === 'TEXT').length
  const imageBlocks = blocks.filter(block => block.nature === 'IMAGE').length
  const accordionBlocks = blocks.filter(
    block => block.nature === 'ACCORDION',
  ).length

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-foreground">
              Visualização Final
            </span>
          </div>
          <div className="flex items-center gap-2">
            {textBlocks > 0 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                <FileText className="h-3 w-3 mr-1" />
                {textBlocks} texto{textBlocks > 1 ? 's' : ''}
              </Badge>
            )}
            {imageBlocks > 0 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                <ImageIcon className="h-3 w-3 mr-1" />
                {imageBlocks} imagem{imageBlocks > 1 ? 's' : ''}
              </Badge>
            )}
            {accordionBlocks > 0 && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                <List className="h-3 w-3 mr-1" />
                {accordionBlocks} accordion{accordionBlocks > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant={isVisible ? 'default' : 'outline'}
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          className="flex items-center gap-2 text-sm"
        >
          {isVisible ? (
            <>
              <EyeOff className="h-4 w-4" />
              Ocultar Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Ver Preview
            </>
          )}
        </Button>
      </div>
      {isVisible && (
        <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
          <BlockContentRenderer blocks={blocks} />
        </div>
      )}
      {!isVisible && (
        <div className="text-center py-3">
          <p className="text-sm text-muted-foreground">
            Clique em "Ver Preview" para visualizar como o conteúdo será exibido
          </p>
        </div>
      )}
    </div>
  )
}
