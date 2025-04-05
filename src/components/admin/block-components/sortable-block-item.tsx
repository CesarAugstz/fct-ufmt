'use client'
import { useState } from 'react'
import { BlockType } from '@prisma/client'
import { GripVertical, Trash2, Edit, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BlockComponentEditor } from './block-component-editor'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useBlocks } from '@/contexts/BlocksContext'
import { BlockComponentView } from './block-component-view'

interface SortableBlockItemProps {
  id: string
  block: {
    id: string
    type: BlockType
    content: any
  }
}

export function SortableBlockItem({ id, block }: SortableBlockItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editingContent, setEditingContent] = useState(block.content)
  const { updateBlock, deleteBlock } = useBlocks()
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSave = () => {
    updateBlock(block.id, editingContent)
    setIsEditing(false)
  }

  const handleDiscard = () => {
    setEditingContent(block.content)
    setIsEditing(false)
  }

  const handleContentChange = (content: any) => {
    setEditingContent(content)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-md p-4 bg-primary-foreground transition-colors shadow-sm"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            {...attributes}
            {...listeners}
            className="mr-2 cursor-move"
          >
            <GripVertical />
          </div>
          <span className="font-medium">
            {block.type === BlockType.TITLE ? 'Title Block' : 'Markdown Block'}
          </span>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDiscard}
              >
                <X className="h-4 w-4 mr-1" />
                Discard
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteBlock(block.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isEditing ? (
        <BlockComponentEditor
          type={block.type}
          content={editingContent}
          onChange={handleContentChange}
        />
      ) : (
        <BlockComponentView
          type={block.type}
          content={block.content}
        />
      )}
    </div>
  )
}
