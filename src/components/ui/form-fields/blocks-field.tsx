'use client'

import { BlockComponent } from './blocks/block-component'
import { AddBlockButton } from './blocks/add-block-button'
import { BlockVisualizer } from './blocks/block-visualizer'
import type {
  Block,
  TextBlock,
  ImageBlock,
  AccordionBlock,
} from './blocks/types'
export type { Block, TextBlock, ImageBlock, AccordionBlock }
import { ulid } from 'ulidx'
import { Alignment, BlockSize, ContentNature, GridSize } from '@prisma/client'
import { useCallback } from 'react'

interface BlocksFieldProps {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

export function BlocksField({ blocks, onChange }: BlocksFieldProps) {
  const generateId = () => ulid()

  const addBlock = (nature: ContentNature, index?: number) => {
    const newBlock: Block =
      nature === 'TEXT'
        ? ({
            id: generateId(),
            nature,
            content: '',
            withBorder: false,
            gridSize: GridSize.FOUR,
          } as TextBlock)
        : nature === 'ACCORDION'
          ? ({
              id: generateId(),
              nature,
              accordionItems: [],
              withBorder: false,
              gridSize: GridSize.FOUR,
              order: 0,
            } as AccordionBlock)
          : ({
              nature,
              id: generateId(),
              file: null,
              caption: '',
              size: BlockSize.MEDIUM,
              alignment: Alignment.CENTER,
              withBorder: false,
              gridSize: GridSize.FOUR,
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
    const newBlocks = blocks.map(block =>
      block.id === id ? { ...block, ...updates } : block,
    ) as Block[]
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
    <div className="relative border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:border-transparent transition-all">
      <div className="p-3">
        <div className="grid grid-cols-12 gap-2">
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
