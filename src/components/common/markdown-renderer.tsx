'use client'

import { useMarkdown } from '@/lib/hooks/markdown'
import LoadingSpinner from './loading-spinner'

interface MarkdownRendererProps {
  content: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function MarkdownRenderer({
  content,
  className = '',
  size = 'lg',
}: MarkdownRendererProps) {
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

  const sizeClass = {
    sm: 'prose-sm',
    md: 'prose-base',
    lg: 'prose-lg',
  }[size]

  return (
    <div
      className={`prose prose-slate ${sizeClass} dark:prose-invert max-w-none ${className}`}
    >
      {markdownContent}
    </div>
  )
}
