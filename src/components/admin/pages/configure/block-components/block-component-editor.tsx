'use client'
import React from 'react'
import { BlockType } from '@prisma/client'
import { BlockContentType } from '@/types/admin/block-components.types'
import { TitleBlockEditor } from './title-block-editor'
import { MarkdownBlockEditor } from './markdown-block-editor'

interface BlockComponentEditorProps<T extends BlockType> {
  type: T
  content: BlockContentType<T>
}

export function BlockComponentEditor<T extends BlockType>({
  type,
  content,
}: BlockComponentEditorProps<T>) {
  console.log('BlockComponentEditor', type, content)
  switch (type) {
    case BlockType.TITLE:
      return <TitleBlockEditor />
    case BlockType.MARKDOWN:
      return <MarkdownBlockEditor />
    default:
      throw new Error(`Unsupported block type: ${type}`)
  }
}
