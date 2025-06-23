'use client'

import { useMarkdown } from '@/lib/hooks/markdown'
import { Alignment, BlockSize, Prisma } from '@prisma/client'
import Image from 'next/image'
import LoadingSpinner from './loading-spinner'
import type { Block } from '@/components/ui/form-fields/block-text-image/types'

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

  return (
    <div className={`space-y-6 ${className}`}>
      {sortedBlocks.map(block => (
        <BlockItem key={block.id} block={block} />
      ))}
    </div>
  )
}

function BlockItem({ block }: { block: Block }) {
  if (block.nature === 'TEXT') {
    return <TextBlock content={block.content ?? ''} />
  }

  if (block.nature === 'IMAGE') {
    return (
      <ImageBlock
        file={block.file}
        caption={block.caption}
        size={block.size}
        alignment={block.alignment}
      />
    )
  }

  return null
}

function TextBlock({ content }: { content: string }) {
  const { markdownContent, loading, error } = useMarkdown(content)

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner className="h-6 w-6" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-destructive p-4 border border-destructive/20 rounded-lg">
        Erro ao renderizar conteúdo
      </div>
    )
  }

  if (!content?.trim()) {
    return null
  }

  return (
    <div className="prose prose-slate prose-lg dark:prose-invert max-w-none">
      {markdownContent}
    </div>
  )
}

interface ImageBlockProps {
  file?: Prisma.AttachmentCreateInput | null
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
