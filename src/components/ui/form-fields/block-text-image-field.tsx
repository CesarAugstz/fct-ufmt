'use client'

import { BlockComponent } from './block-text-image/block-component'
import { AddBlockButton } from './block-text-image/add-block-button'
import { BlockVisualizer } from './block-text-image/block-visualizer'
import type { Block, TextBlock, ImageBlock } from './block-text-image/types'
export type { Block, TextBlock, ImageBlock }
import { ulid } from 'ulidx'
import { Alignment, BlockSize, ContentNature } from '@prisma/client'
import { useCallback } from 'react'

interface BlockTextImageFieldProps {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

export function BlockTextImageField({
  blocks,
  onChange,
}: BlockTextImageFieldProps) {
  const generateId = () => ulid()

  const addBlock = (nature: ContentNature, index?: number) => {
    const newBlock: Block =
      nature === 'TEXT'
        ? ({ id: generateId(), nature, content: '' } as TextBlock)
        : ({
            nature,
            id: generateId(),
            file: null,
            caption: '',
            size: BlockSize.MEDIUM,
            alignment: Alignment.CENTER,
          } as ImageBlock)

    let newBlocks: Block[]
    if (index !== undefined) {
      newBlocks = [...blocks]
      newBlocks.splice(index, 0, newBlock)
    } else {
      newBlocks = [...blocks, newBlock]
    }
    newBlocks.forEach((block, index) => (block.order = index))

    onChange(newBlocks)
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    console.log('update block', id, updates, blocks)
    const newBlocks = blocks.map(block =>
      block.id === id ? { ...block, ...updates } : block,
    ) as Block[]
    console.log('new blocks', newBlocks)
    onChange(newBlocks)
  }

  const deleteBlock = (id: string) => {
    const newBlocks = blocks.filter(block => block.id !== id)
    newBlocks.forEach((block, index) => (block.order = index))
    onChange(newBlocks)
  }

  const moveBlockUp = (index: number) => {
    if (index === 0) return

    const newBlocks = [...blocks]
    const [block] = newBlocks.splice(index, 1)
    newBlocks.splice(index - 1, 0, block)
    newBlocks.forEach((block, index) => (block.order = index))
    onChange(newBlocks)
  }

  const moveBlockDown = useCallback(
    (index: number) => {
      if (index === blocks.length - 1) return

      const newBlocks = [...blocks]
      const [block] = newBlocks.splice(index, 1)
      newBlocks.splice(index + 1, 0, block)
      newBlocks.forEach((block, index) => (block.order = index))
      onChange(newBlocks)
    },
    [blocks, onChange],
  )

  return (
    <div className="relative border border-input rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:border-transparent transition-all">
      <div className="p-3 space-y-2">
        {blocks.map((block, index) => (
          <BlockComponent
            key={block.id}
            block={block}
            index={index}
            totalBlocks={blocks.length}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
            onAddBlock={addBlock}
            onMoveUp={moveBlockUp}
            onMoveDown={moveBlockDown}
          />
        ))}
      </div>

      <div className="border-t border-border/50 p-2">
        <AddBlockButton onAdd={type => addBlock(type)} />
      </div>

      {blocks.length > 0 && (
        <div className="border-t border-border/50">
          <BlockVisualizer blocks={blocks} />
        </div>
      )}
    </div>
  )
}
