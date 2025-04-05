'use client'
import React from 'react'
import { BlockType } from '@prisma/client'
import { BlockContentType } from '@/types/admin/block-components.types'
import { TitleBlockEditor } from './title-block-editor'
import { MarkdownBlockEditor } from './markdown-block-editor'

interface BlockComponentEditorProps<T extends BlockType> {
  type: T
  content: BlockContentType<T>
  onChange: (content: BlockContentType<T>) => void
}

export function BlockComponentEditor<T extends BlockType>({
  type,
  content,
  onChange,
}: BlockComponentEditorProps<T>) {
  switch (type) {
    case BlockType.TITLE:
      return (
        <TitleBlockEditor
          content={content as BlockContentType<'TITLE'>}
          onChange={onChange as any}
        />
      )
    case BlockType.MARKDOWN:
      return (
        <MarkdownBlockEditor
          content={content as BlockContentType<'MARKDOWN'>}
          onChange={onChange as any}
        />
      )
    default:
      throw new Error(`Unsupported block type: ${type}`)
  }
}
