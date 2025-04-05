'use client'

import production from 'react/jsx-runtime'
import React, { useState, useEffect, Fragment } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeReact from 'rehype-react'
import { Card, CardContent } from '@/components/ui/card'

export function useMarkdown(content: string) {
  const [markdownContent, setMarkdownContent] = useState<React.ReactNode>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown | null>(null)

  useEffect(() => {
    let isMounted = true

    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeReact, production)

    const process = async () => {
      try {
        const result = await processor.process(content)
        if (isMounted) {
          setMarkdownContent(result.result)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error processing markdown:', error)
        if (isMounted) {
          setError(error)
          setLoading(false)
        }
      }
    }

    process()

    return () => {
      isMounted = false
    }
  }, [content])

  return { markdownContent, loading, error }
}

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
