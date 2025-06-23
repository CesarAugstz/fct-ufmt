import { ContentBlock, Prisma } from '@prisma/client'

export type TextBlock = Pick<ContentBlock, 'id' | 'content' | 'order'> & {
  nature: 'TEXT'
}

export type ImageBlock = Pick<
  ContentBlock,
  'id' | 'caption' | 'size' | 'alignment' | 'order'
> & {
  nature: 'IMAGE'
  file: Prisma.AttachmentCreateInput | null
}

export type Block = TextBlock | ImageBlock
