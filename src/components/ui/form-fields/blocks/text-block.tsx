'use client'

import { MarkdownEditor } from '@/components/common/markdown-editor'
import type { TextBlock, Block } from './types'

interface TextBlockComponentProps {
  block: TextBlock
  onUpdate: (id: string, updates: Partial<Block>) => void
}

export function TextBlockComponent({
  block,
  onUpdate,
}: TextBlockComponentProps) {
  return (
    <MarkdownEditor
      value={block.content ?? ''}
      onChange={value => onUpdate(block.id, { content: value })}
      placeholder="Escreva seu conteúdo em Markdown..."
      minHeight={200}
    />
  )
}
