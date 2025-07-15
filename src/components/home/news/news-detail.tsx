'use client'
import { ArrowLeft, CalendarDays, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useShare } from '@/lib/hooks/share'
import { useFindUniqueNews, useFindManyNews } from '@/lib/zenstack-hooks'
import LoadingSpinner from '@/components/common/loading-spinner'
import { BlockContentRenderer } from '@/components/common/block-content-renderer'
import { dayJs } from '@/utils/dayjs'

export default function NewsDetail({ slug }: { slug: string }) {
  const { share } = useShare()

  const { data: news, isLoading } = useFindUniqueNews({
    where: { slug },
    include: {
      category: true,
      featuredImage: true,
      contentBlocks: {
        include: {
          file: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  })

  const { data: relatedNews = [] } = useFindManyNews({
    where: {
      status: 'PUBLISHED',
      categoryId: news?.categoryId,
      NOT: { slug },
    },
    include: {
      featuredImage: true,
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  })

  const { data: allNews = [] } = useFindManyNews({
    where: { status: 'PUBLISHED' },
    include: { category: true },
  })

  const handleShare = async () => {
    if (!news) return

    const shareUrl = window.location.href
    const shareTitle = news.title
    const shareText = news.excerpt || ''

    await share({
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Notícia não encontrada</h1>
          <p className="mt-2 text-muted-foreground">
            A notícia que você está procurando não existe ou foi removida.
          </p>
          <Button asChild className="mt-4">
            <Link href="/home/news">Voltar para notícias</Link>
          </Button>
        </div>
      </div>
    )
  }

  const categories = Array.from(
    new Set(allNews.map(item => item.category.name)),
  )

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

        {/* Main content */}
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <Badge className="mb-4">{news.category.name}</Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#003366]">
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

            {/* Featured image */}
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

            {/* Excerpt */}
            {news.excerpt && (
              <div className="prose prose-lg max-w-none">
                <p className="lead text-lg text-muted-foreground">
                  {news.excerpt}
                </p>
              </div>
            )}

            {/* Content Blocks */}
            <BlockContentRenderer blocks={news.contentBlocks} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related news */}
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
                        href={`/home/news/${item.id}`}
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

            {/* Categories */}
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
