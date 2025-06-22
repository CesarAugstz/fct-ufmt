'use client'

import { BlockComponent } from './block-text-image/block-component'
import { AddBlockButton } from './block-text-image/add-block-button'
import { BlockVisualizer } from './block-text-image/block-visualizer'
import type { Block, TextBlock, ImageBlock } from './block-text-image/types'
export type { Block, TextBlock, ImageBlock }
import { ulid } from 'ulidx'

interface BlockTextImageFieldProps {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

export function BlockTextImageField({
  blocks,
  onChange,
}: BlockTextImageFieldProps) {
  const generateId = () => ulid()

  const addBlock = (type: 'text' | 'image', index?: number) => {
    const newBlock: Block =
      type === 'text'
        ? ({ id: generateId(), type: 'text', content: '' } as TextBlock)
        : ({
            id: generateId(),
            type: 'image',
            file: null,
            url: null,
            caption: '',
            size: 'medium',
            alignment: 'center',
          } as ImageBlock)

    let newBlocks: Block[]
    if (index !== undefined) {
      newBlocks = [...blocks]
      newBlocks.splice(index, 0, newBlock)
    } else {
      newBlocks = [...blocks, newBlock]
    }

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
    onChange(newBlocks)
  }

  const moveBlockUp = (index: number) => {
    if (index === 0) return

    const newBlocks = [...blocks]
    const [block] = newBlocks.splice(index, 1)
    newBlocks.splice(index - 1, 0, block)
    onChange(newBlocks)
  }

  const moveBlockDown = (index: number) => {
    if (index === blocks.length - 1) return

    const newBlocks = [...blocks]
    const [block] = newBlocks.splice(index, 1)
    newBlocks.splice(index + 1, 0, block)
    onChange(newBlocks)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
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

      <AddBlockButton onAdd={type => addBlock(type)} />

      <BlockVisualizer blocks={blocks} />
    </div>
  )
}
