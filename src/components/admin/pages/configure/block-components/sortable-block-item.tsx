'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BlockType } from '@prisma/client'
import {
  GripVertical,
  Trash2,
  Edit,
  Save,
  X,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BlockComponentEditor } from './block-component-editor'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BlockComponentView } from './block-component-view'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  blockEditContentAtom,
  blockEditingAtom,
  blocksAtom,
  formGetValuesAtom,
} from '../state/blocks.state'

interface SortableBlockItemProps {
  id: string
  block: {
    id: string
    blockType: BlockType
    content: any
    order: number
  }
}

export function SortableBlockItem({ id, block }: SortableBlockItemProps) {
  const [blockInitialContent, setBlockInitialContent] = useState<any>(
    block.content,
  )
  const formGetValue = useAtomValue(formGetValuesAtom)
  const [blocksState, setBlocksState] = useAtom(blocksAtom)
  const [isEditing, setIsEditing] = useState(false)
  const setBlockEditingContent = useSetAtom(blockEditContentAtom)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSave = useCallback(() => {
    const values = formGetValue?.()

    setBlocksState(prevBlocks => {
      const updatedBlocks = prevBlocks.map(b => {
        if (b.id === block.id) {
          return {
            ...b,
            content: values ?? ('' as any),
          }
        }
        return b
      })
      return updatedBlocks
    })
    setIsEditing(false)
  }, [block.id, setIsEditing, setBlocksState, formGetValue])

  const handleDiscard = useCallback(() => {
    setBlockInitialContent(block.content)
    setIsEditing(false)
    setBlockEditingContent(null)
  }, [block.content, setIsEditing, setBlockEditingContent])

  const handleClickEdit = useCallback(() => {
    setIsEditing(true)
    setBlockEditingContent(block.content)
  }, [block, setIsEditing, setBlockEditingContent])

  const handleDelete = useCallback(() => {
    setBlocksState(prevBlocks => {
      const updatedBlocks = prevBlocks.filter(b => b.id !== block.id)
      return updatedBlocks
    })
    setIsEditing(false)
    setBlockEditingContent(null)
  }, [setBlockEditingContent, block.id, setBlocksState, setIsEditing])

  const moveBlock = useCallback(
    (direction: 'up' | 'down') => {
      const index = blocksState.findIndex(block => block.id === id)
      if (index === -1) return

      if (direction === 'up' && index === 0) return

      if (direction === 'down' && index === blocksState.length - 1) return

      const newBlocks = [...blocksState]

      const orderedBlocks = newBlocks.sort((a, b) => a.order - b.order)

      if (direction === 'up') {
        orderedBlocks[index - 1].order += 1
        orderedBlocks[index].order -= 1
      } else {
        orderedBlocks[index + 1].order -= 1
        orderedBlocks[index].order += 1
      }
      setBlocksState(orderedBlocks.sort((a, b) => a.order - b.order))
    },
    [setBlocksState, blocksState, id],
  )

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-md p-4 bg-secondary transition-colors shadow-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="mr-2 p-2 w-fit gap-2 flex bg-secondary">
            <Button
              className="h-5 w-5 hover:bg-primary-foreground"
              variant="ghost"
              size="icon"
              onClick={() => moveBlock('up')}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              className="h-5 w-5 hover:bg-primary-foreground"
              variant="ghost"
              size="icon"
              onClick={() => moveBlock('down')}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
          <span className="font-medium">
            {block.blockType === BlockType.TITLE
              ? 'Title Block'
              : 'Markdown Block'}
          </span>
        </div>

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="default" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={handleDiscard}>
                <X className="h-4 w-4 mr-1" />
                Discard
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={handleClickEdit}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}

          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isEditing ? (
        <BlockComponentEditor
          type={block.blockType}
          content={blockInitialContent}
        />
      ) : (
        <BlockComponentView type={block.blockType} content={block.content} />
      )}
    </div>
  )
}
