'use client'

import React from 'react'
import { useMarkdown } from '@/lib/hooks/markdown'

export default function Markdown({ content }: { content: string }) {
  const { markdownContent, loading, error } = useMarkdown(content)

  if (error) throw error

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto flex flex-col self-center">
      <div className="prose prose-slate prose-sm sm:prose-base lg:prose-lg w-full mx-auto dark:prose-invert">
        {markdownContent}
      </div>
    </div>
  )
}
