'use client'
import React from 'react'
import { BlockType } from '@prisma/client'
import { BlockContentType } from '@/types/admin/block-components.types'
import Title from '@/components/common/blocks/title'
import Markdown from '@/components/common/blocks/markdown'

interface BlockComponentViewProps<T extends BlockType> {
  type: T
  content: BlockContentType<T>
}

export function BlockComponentView<T extends BlockType>({
  type,
  content,
}: BlockComponentViewProps<T>) {
  //console.log('BlockComponentView', type, content)
  switch (type) {
    case BlockType.TITLE:
      const titleContent = content as BlockContentType<'TITLE'>
      return (
        <Title
          title={titleContent.title}
          subtitle={titleContent.subtitle}
          backgroundImage={titleContent.backgroundImage}
          height={titleContent.height as 'sm' | 'md' | 'lg' | 'xl'}
        />
      )
    case BlockType.MARKDOWN:
      const markdownContent = content as BlockContentType<'MARKDOWN'>
      return (
        <Markdown content={markdownContent.content} />
      )
    default:
      throw new Error(`Unsupported block type: ${type}`)
  }
}
