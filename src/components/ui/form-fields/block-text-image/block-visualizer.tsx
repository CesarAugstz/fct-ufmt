'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useMarkdown } from '@/lib/hooks/markdown'
import type { Block } from './types'

interface BlockVisualizerProps {
  blocks: Block[]
}

export function BlockVisualizer({ blocks }: BlockVisualizerProps) {
  const [isVisible, setIsVisible] = useState(false)

  const renderBlock = (block: Block) => {
    if (block.type === 'text') {
      return <TextPreview key={block.id} content={block.content} />
    }

    return <ImagePreview key={block.id} block={block} />
  }

  if (!blocks.length) {
    return null
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Visualização dos Blocos</CardTitle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(!isVisible)}
          className="flex items-center gap-2"
        >
          {isVisible ? (
            <>
              <EyeOff className="h-4 w-4" />
              Ocultar
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Visualizar
            </>
          )}
        </Button>
      </CardHeader>
      {isVisible && (
        <CardContent>
          <div className="space-y-6">
            {blocks.map(block => renderBlock(block))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function TextPreview({ content }: { content: string }) {
  const { markdownContent, loading, error } = useMarkdown(content)

  return (
    <div className="space-y-2">
      <div className="prose prose-slate prose-sm dark:prose-invert max-w-none">
        {loading && <div className="text-muted-foreground">Carregando...</div>}
        {!!error && (
          <div className="text-destructive">Erro ao renderizar markdown</div>
        )}
        {!loading && !error && !content?.trim() && (
          <div className="text-muted-foreground italic">
            Nenhum conteúdo de texto
          </div>
        )}
        {!loading && !error && content?.trim() && markdownContent}
      </div>
    </div>
  )
}

function ImagePreview({ block }: { block: Extract<Block, { type: 'image' }> }) {
  const getImageSizeClass = () => {
    switch (block.size || 'medium') {
      case 'small':
        return 'max-w-xs'
      case 'medium':
        return 'max-w-md'
      case 'large':
        return 'max-w-lg'
      case 'full':
        return 'w-full'
      default:
        return 'max-w-md'
    }
  }

  const getImageAlignmentClass = () => {
    switch (block.alignment || 'center') {
      case 'left':
        return 'mr-auto'
      case 'center':
        return 'mx-auto'
      case 'right':
        return 'ml-auto'
      default:
        return 'mx-auto'
    }
  }

  return (
    <div className="space-y-2">
      {block.url ? (
        <div className="space-y-2">
          <img
            src={block.url}
            alt={block.caption}
            className={`h-auto rounded-lg border ${getImageSizeClass()} ${getImageAlignmentClass()}`}
          />
          {block.caption && (
            <p className="text-sm text-muted-foreground italic">
              {block.caption}
            </p>
          )}
        </div>
      ) : (
        <div className="text-muted-foreground italic">Nenhuma imagem</div>
      )}
    </div>
  )
}
