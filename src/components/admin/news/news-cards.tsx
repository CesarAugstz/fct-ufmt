'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Eye, Pin, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUpdateNews } from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { NewsStatus } from '@prisma/client'
import { dayJs } from '@/utils/dayjs'
import LoadingSpinner from '@/components/common/loading-spinner'

interface NewsItem {
  id: string
  title: string
  excerpt?: string | null
  slug: string
  status: NewsStatus
  isPinned: boolean
  publishedAt?: Date | null
  author: string
  createdAt: Date
  category: {
    id: string
    name: string
  }
  featuredImage?: {
    id: string
    dataUrl: string
    name: string
  } | null
  _count: {
    contentBlocks: number
  }
}

interface NewsCardsProps {
  news: NewsItem[]
  onRefresh: () => void
  loading?: boolean
  onDelete?: (id: string) => void
}

export default function NewsCards({
  news,
  onRefresh,
  loading,
  onDelete,
}: NewsCardsProps) {
  const router = useRouter()
  const toast = useToast()
  const { mutateAsync: updateNews } = useUpdateNews()

  const handleEdit = (id: string) => {
    router.push(`/admin/news/${id}`)
  }

  const handleView = (slug: string) => {
    window.open(`/home/news/${slug}`, '_blank')
  }

  const handleTogglePin = async (id: string, currentPinned: boolean) => {
    try {
      await updateNews({
        where: { id },
        data: { isPinned: !currentPinned },
      })
      toast.success(
        `Notícia ${!currentPinned ? 'fixada' : 'desfixada'} com sucesso.`,
      )
      onRefresh()
    } catch {
      toast.error('Erro ao atualizar notícia.')
    }
  }

  const getStatusBadge = (status: NewsStatus) => {
    const variants = {
      DRAFT: 'secondary',
      PUBLISHED: 'default',
      ARCHIVED: 'outline',
    } as const

    const labels = {
      DRAFT: 'Rascunho',
      PUBLISHED: 'Publicado',
      ARCHIVED: 'Arquivado',
    }

    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!news.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhuma notícia encontrada. Clique em "Criar Notícia" para começar.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {news.map(item => (
        <Card key={item.id} className="group hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-1">
                <CardTitle className="text-sm font-medium line-clamp-2">
                  {item.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.category.name}</span>
                  <span>•</span>
                  <span>{item.author}</span>
                </div>
              </div>
              {item.isPinned && (
                <Pin className="h-4 w-4 text-orange-500 flex-shrink-0" />
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {item.featuredImage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src={item.featuredImage.dataUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {item.excerpt && (
              <p className="text-xs text-muted-foreground line-clamp-3">
                {item.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusBadge(item.status)}
                <span className="text-xs text-muted-foreground">
                  {item._count.contentBlocks} blocos
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {dayJs(item.createdAt).format('DD/MM/YYYY')}
              </span>
            </div>

            <div className="flex items-center gap-1 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(item.id)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleView(item.slug)}
                className="h-8 w-8 p-0"
              >
                <Eye className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTogglePin(item.id, item.isPinned)}
                className="h-8 w-8 p-0"
              >
                <Pin
                  className={`h-3 w-3 ${item.isPinned ? 'text-orange-500' : ''}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete?.(item.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
