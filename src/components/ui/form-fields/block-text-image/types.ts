import { AttachmentType } from '@/types/attachment.type'
import { ContentBlock } from '@prisma/client'

export type TextBlock = Pick<ContentBlock, 'id' | 'content' | 'order'> & {
  nature: 'TEXT'
}

export type ImageBlock = Pick<
  ContentBlock,
  'id' | 'caption' | 'size' | 'alignment' | 'order'
> & {
  nature: 'IMAGE'
  file: AttachmentType | null
}

export type Block = TextBlock | ImageBlock
