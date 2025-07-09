'use client'

import { Alignment, BlockSize, GridSize } from '@prisma/client'
import Image from 'next/image'
import LoadingSpinner from './loading-spinner'
import { MarkdownRenderer } from './markdown-renderer'
import type {
  Block,
  AccordionItem,
} from '@/components/ui/form-fields/blocks/types'
import { AttachmentType } from '@/types/attachment.type'
import { Card } from '../ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem as UIAccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

interface BlockContentRendererProps {
  blocks: Block[]
  className?: string
  loading?: boolean
}

export function BlockContentRenderer({
  blocks,
  className = '',
  loading = false,
}: BlockContentRendererProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!blocks.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum conteúdo disponível.</p>
      </div>
    )
  }

  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order)

  const getGridClass = (gridSize: GridSize | undefined) => {
    switch (gridSize) {
      case GridSize.ONE:
        return 'col-span-3'
      case GridSize.TWO:
        return 'col-span-6'
      case GridSize.THREE:
        return 'col-span-9'
      case GridSize.FOUR:
      default:
        return 'col-span-12'
    }
  }

  return (
    <div className={`grid grid-cols-12 gap-6 ${className}`}>
      {sortedBlocks.map(block => (
        <div key={block.id} className={getGridClass(block.gridSize)}>
          <BlockItem block={block} />
        </div>
      ))}
    </div>
  )
}

function BlockItem({ block }: { block: Block }) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (!block.withBorder) {
      return <>{children}</>
    }

    return (
      <Card className="h-full border p-6 rounded-xl shadow-sm">{children}</Card>
    )
  }
  return (
    <Wrapper>
      {block.nature === 'TEXT' ? (
        <TextBlock content={block.content ?? ''} />
      ) : block.nature === 'ACCORDION' ? (
        <AccordionBlock accordionItems={block.accordionItems ?? []} />
      ) : (
        <ImageBlock
          file={block.file}
          caption={block.caption}
          size={block.size}
          alignment={block.alignment}
        />
      )}
    </Wrapper>
  )
}

function TextBlock({ content }: { content: string }) {
  return <MarkdownRenderer content={content} />
}

interface ImageBlockProps {
  file?: AttachmentType | null
  caption?: string | null
  size?: BlockSize | null
  alignment?: Alignment | null
}

function ImageBlock({ file, caption, size, alignment }: ImageBlockProps) {
  if (!file?.dataUrl) {
    return null
  }

  const getImageSizeClass = () => {
    switch (size) {
      case BlockSize.SMALL:
        return 'max-w-xs'
      case BlockSize.MEDIUM:
        return 'max-w-md'
      case BlockSize.LARGE:
        return 'max-w-lg'
      case BlockSize.FULL:
        return 'w-full'
      default:
        return 'max-w-md'
    }
  }

  const getImageAlignmentClass = () => {
    switch (alignment) {
      case Alignment.LEFT:
        return 'mr-auto'
      case Alignment.CENTER:
        return 'mx-auto'
      case Alignment.RIGHT:
        return 'ml-auto'
      default:
        return 'mx-auto'
    }
  }

  const getContainerAlignmentClass = () => {
    switch (alignment) {
      case Alignment.LEFT:
        return 'text-left'
      case Alignment.CENTER:
        return 'text-center'
      case Alignment.RIGHT:
        return 'text-right'
      default:
        return 'text-center'
    }
  }

  return (
    <figure className={`space-y-3 ${getContainerAlignmentClass()}`}>
      <div
        className={`relative ${getImageSizeClass()} ${getImageAlignmentClass()}`}
      >
        <Image
          src={file.dataUrl}
          alt={caption || file.name || 'Image'}
          width={800}
          height={600}
          className="h-auto w-full rounded-lg border shadow-sm object-cover"
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function AccordionBlock({
  accordionItems,
}: {
  accordionItems: AccordionItem[]
}) {
  if (!accordionItems?.length) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Nenhum item de accordion configurado.
      </div>
    )
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {accordionItems.map((item, index) => (
        <UIAccordionItem key={index} value={index.toString()}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <MarkdownRenderer content={item.content} size="sm" />
          </AccordionContent>
        </UIAccordionItem>
      ))}
    </Accordion>
  )
}
