'use client'
import { ArrowLeft, CalendarDays, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { newsItems } from './news-data-mock'
import { useToast } from '@/lib/hooks/toast'
import { useIsMobile } from '@/lib/hooks/is-mobile'

export default function NewsDetail({ id }: { id: string }) {
  const news = newsItems.find(item => item.id === parseInt(id))
  const toast = useToast()
  const isMobile = useIsMobile()

  const handleShare = async () => {
    const platform = isMobile ? 'native' : 'copy'

    const shareUrl = window.location.href
    const shareTitle = news?.title || 'Notícia FCT'
    const shareText = news?.excerpt || ''

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Link copiado para a área de transferência!')
      } catch (error) {
        console.log('Error copying:', error)
      }
    }
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

  const relatedNews = newsItems
    .filter(item => item.category === news.category && item.id !== news.id)
    .slice(0, 3)

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
              <Badge className="mb-4">{news.category}</Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#003366]">
                {news.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {new Date(news.date).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>

            {/* Featured image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="lead">{news.excerpt}</p>

              {/* Mock detailed content */}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <h2>Subtítulo da Notícia</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>

              <ul>
                <li>Ponto importante sobre o assunto</li>
                <li>Outro aspecto relevante a ser considerado</li>
                <li>Informação adicional para contextualização</li>
              </ul>

              <blockquote>
                &quot;Citação relevante sobre o tema ou declaração de alguma
                autoridade no assunto.&quot;
              </blockquote>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related news */}
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
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <h3 className="line-clamp-2 text-sm font-medium group-hover:text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                          })}
                        </p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="mb-4 text-xl font-semibold">Categorias</h2>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(newsItems.map(item => item.category))).map(
                  category => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                    >
                      {category}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
