'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BlockType } from '@prisma/client'
import { GripVertical, Trash2, Edit, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BlockComponentEditor } from './block-component-editor'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { BlockComponentView } from './block-component-view'
import { useAtomValue, useSetAtom } from 'jotai'
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
  console.log('SortableBlockItem', id, block)
  const [blockInitialContent, setBlockInitialContent] = useState<any>(
    block.content,
  )
  const formGetValue = useAtomValue(formGetValuesAtom)
  const setBlocksState = useSetAtom(blocksAtom)
  const [isEditing, setIsEditing] = useState(false)
  const setBlockEditingContent = useSetAtom(blockEditContentAtom)

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  console.log('isEditing', isEditing)

  const handleSave = useCallback(() => {
    const values = formGetValue?.()

    console.log('contentUpdated', values)

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
    console.log('discarding changes', block.content)
    setIsEditing(false)
    setBlockEditingContent(null)
  }, [block.content, setIsEditing, setBlockEditingContent])

  const handleClickEdit = useCallback(() => {
    console.log('click edit', block.content)
    setIsEditing(true)
    setBlockEditingContent(block.content)
  }, [block, setIsEditing, setBlockEditingContent])

  const handleDelete = useCallback(() => {
    console.log('delete block', block.id)
    setBlocksState(prevBlocks => {
      const updatedBlocks = prevBlocks.filter(b => b.id !== block.id)
      return updatedBlocks
    })
    setIsEditing(false)
    setBlockEditingContent(null)
  }, [setBlockEditingContent, block.id, setBlocksState, setIsEditing])

  console.log('isEditing', isEditing)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-md p-4 bg-primary-foreground transition-colors shadow-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div {...attributes} {...listeners} className="mr-2 cursor-move">
            <GripVertical />
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
