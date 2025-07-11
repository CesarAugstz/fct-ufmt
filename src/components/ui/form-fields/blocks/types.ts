import { AttachmentType } from '@/types/attachment.type'
import { ContentBlock } from '@prisma/client'

export interface AccordionItem {
  title: string
  content: string
}

export type TextBlock = Pick<
  ContentBlock,
  'id' | 'content' | 'order' | 'withBorder' | 'gridSize'
> & {
  nature: 'TEXT'
}

export type AccordionBlock = Pick<
  ContentBlock,
  'id' | 'order' | 'withBorder' | 'gridSize'
> & {
  nature: 'ACCORDION'
  accordionItems: AccordionItem[]
}

export type ImageBlock = Pick<
  ContentBlock,
  'id' | 'caption' | 'size' | 'alignment' | 'order' | 'withBorder' | 'gridSize'
> & {
  nature: 'IMAGE'
  file: AttachmentType | null
}

export type Block = TextBlock | ImageBlock | AccordionBlock
