'use client'

import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useDeleteNews, useFindManyNews } from '@/lib/zenstack-hooks'
import NewsCards from './news-cards'
import NewsCategoryForm from './news-category-form'
import { useRouter } from 'next/navigation'
import { BaseCard } from '@/components/ui/base-card'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useToast } from '@/lib/hooks/toast'

export default function News() {
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false)
  const router = useRouter()
  const { mutateAsync: deleteNews } = useDeleteNews()
  const [idToDelete, setIdToDelete] = useState<null | string>(null)
  const toast = useToast()

  const {
    data: news,
    isLoading,
    refetch,
  } = useFindManyNews({
    include: {
      category: true,
      featuredImage: true,
      _count: {
        select: {
          contentBlocks: true,
        },
      },
    },
    orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
  })

  const handleCreateNews = () => {
    router.push('/admin/news/create')
  }

  const handleManageCategories = () => {
    setIsCategoryFormOpen(true)
  }

  const handleDelete = useCallback(async () => {
    if (!idToDelete) return

    try {
      await deleteNews({ where: { id: idToDelete } })
      toast.success('Excluido com sucesso')
    } catch (e) {
      console.error('Error deleting news', e)
      toast.error('Erro ao excluir')
    }
  }, [deleteNews, idToDelete, toast])

  return (
    <>
      <BaseCard
        title="Notícias"
        description="Gerencie todas as notícias a partir deste painel"
        rightButtons={
          <>
            <Button
              variant="outline"
              onClick={handleManageCategories}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Gerenciar Categorias
            </Button>
            <Button onClick={handleCreateNews} className="gap-2">
              <Plus className="h-4 w-4" />
              Criar Notícia
            </Button>
          </>
        }
      >
        <NewsCards
          onDelete={id => setIdToDelete(id)}
          news={news || []}
          onRefresh={refetch}
          loading={isLoading}
        />
      </BaseCard>
      <NewsCategoryForm
        isOpen={isCategoryFormOpen}
        onClose={() => setIsCategoryFormOpen(false)}
        onSuccess={() => {
          setIsCategoryFormOpen(false)
        }}
      />
      <ConfirmDialog
        open={!!idToDelete}
        onOpenChange={open => !open && setIdToDelete(null)}
        title="Tem certeza?"
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente a notícia."
        onConfirm={handleDelete}
        variant="destructive"
      />
    </>
  )
}
