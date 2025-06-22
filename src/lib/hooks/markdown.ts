'use client'

import { useEffect, useState } from 'react'
import rehypeReact from 'rehype-react'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import production from 'react/jsx-runtime'

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
