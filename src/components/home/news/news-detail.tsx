'use client'
import { ArrowLeft, CalendarDays, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useShare } from '@/lib/hooks/share'
import { BlockContentRenderer } from '@/components/common/block-content-renderer'
import { dayJs } from '@/utils/dayjs'
import type { Block } from '@/components/ui/form-fields/blocks/types'
import type { AttachmentType } from '@/types/attachment.type'
import type { ContentBlock } from '@prisma/client'

type NewsDetailData = {
  news: {
    id: string
    title: string
    excerpt: string | null
    slug: string
    author: string
    publishedAt: Date | null
    createdAt: Date
    category: {
      name: string
    }
    featuredImage: AttachmentType | null
    contentBlocks: (ContentBlock & {
      file: AttachmentType | null
    })[]
  }
  relatedNews: Array<{
    id: string
    title: string
    slug: string
    publishedAt: Date | null
    createdAt: Date
    featuredImage: AttachmentType | null
  }>
  categories: string[]
}

export default function NewsDetail({ data }: { data: NewsDetailData }) {
  const { share } = useShare()
  const { news, relatedNews, categories } = data

  const handleShare = async () => {
    const shareUrl = window.location.href
    const shareTitle = news.title
    const shareText = news.excerpt || ''

    await share({
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    })
  }

  const blocksAsBlocks: Block[] = news.contentBlocks.map(block => ({
    id: block.id,
    nature: block.nature as 'TEXT' | 'IMAGE' | 'ACCORDION',
    order: block.order,
    withBorder: block.withBorder,
    gridSize: block.gridSize,
    ...(block.nature === 'TEXT' && {
      content: block.content,
    }),
    ...(block.nature === 'IMAGE' && {
      caption: block.caption,
      size: block.size,
      alignment: block.alignment,
      file: block.file,
    }),
    ...(block.nature === 'ACCORDION' && {
      accordionItems:
        (block.accordionItems as Array<{ title: string; content: string }>) ||
        [],
    }),
  })) as Block[]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/home/news">
              <ArrowLeft className="h-4 w-4" />
              Voltar para notícias
            </Link>
          </Button>

          <Button onClick={() => handleShare()} variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <div>
              <Badge className="mb-4">{news.category.name}</Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary">
                {news.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {dayJs(news.publishedAt || news.createdAt).format(
                    'DD [de] MMMM [de] YYYY',
                  )}
                </div>
                <div>Por: {news.author}</div>
              </div>
            </div>

            {news.featuredImage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={news.featuredImage.dataUrl}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            )}

            {news.excerpt && (
              <div className="prose prose-lg max-w-none">
                <p className="lead text-lg text-muted-foreground">
                  {news.excerpt}
                </p>
              </div>
            )}

            <BlockContentRenderer blocks={blocksAsBlocks} />
          </div>

          <div className="space-y-8">
            {relatedNews.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">
                  Notícias Relacionadas
                </h2>
                <div className="space-y-4">
                  {relatedNews.map(item => (
                    <Card
                      key={item.id}
                      className="group overflow-hidden transition-all hover:shadow-md"
                    >
                      <Link
                        href={`/home/news/${item.slug}`}
                        className="flex gap-4 p-4"
                      >
                        {item.featuredImage && (
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={item.featuredImage.dataUrl}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              unoptimized
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="line-clamp-2 text-sm font-medium group-hover:text-primary">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {dayJs(item.publishedAt || item.createdAt).format(
                              'DD [de] MMMM',
                            )}
                          </p>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="mb-4 text-xl font-semibold">Categorias</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
