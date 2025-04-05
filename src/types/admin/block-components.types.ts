import { BlockComponent, BlockType } from '@prisma/client'
import { z } from 'zod'

export const titleBlockSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  backgroundImage: z.string().optional(),
  height: z.enum(['sm', 'md', 'lg', 'xl']).default('sm'),
})

export const markdownBlockSchema = z.object({
  content: z.string().min(1, 'Content is required'),
})

export type TitleBlockContent = z.infer<typeof titleBlockSchema>
export type MarkdownBlockContent = z.infer<typeof markdownBlockSchema>

export type BlockComponentContent = TitleBlockContent | MarkdownBlockContent

export type BlockContentTypeMap = {
  [BlockType.TITLE]: TitleBlockContent
  [BlockType.MARKDOWN]: MarkdownBlockContent
}

export type BlockContentType<T extends BlockType> = BlockContentTypeMap[T]

export const getDefaultContentForBlockType = (blockType: BlockType): any => {
  switch (blockType) {
    case BlockType.TITLE:
      return { title: 'New Title', subtitle: '', height: 'sm' }
    case BlockType.MARKDOWN:
      return { content: 'Enter markdown content here' }
    default:
      throw new Error(`Unknown block type: ${blockType}`)
  }
}

export type BlockComponentType = Omit<OmitDbFields<BlockComponent>, 'pageId'>

type OmitDbFields<T> = Omit<T, | 'createdAt' | 'updatedAt'>
