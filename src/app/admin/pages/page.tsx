'use client'
import { TableMadrid } from '@/components/common/table/table-madrid'
import { BaseCard } from '@/components/ui/base-card'
import { Button } from '@/components/ui/button'
import { useDeletePage, useFindManyPage } from '@/lib/zenstack-hooks'
import { Page as PageType } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table'
import { Edit, Trash2, Settings } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PagesDialog } from '@/components/admin/pages/components/PagesDialog'

export default function Page() {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editPageId, setEditPageId] = useState<string | null>(null)
  const deleteMutation = useDeletePage()

  const { data: pages, isLoading } = useFindManyPage()

  const onDeletePage = useCallback(
    (id: string) => {
      try {
        const confirmation = confirm(
          'Are you sure you want to delete this page?',
        )

        if (!confirmation) return

        deleteMutation.mutateAsync({
          where: {
            id,
          },
        })
      } catch (error) {
        console.error('Error deleting page:', error)
      }
    },
    [deleteMutation],
  )

  const columnHelper = createColumnHelper<PageType>()

  const columns = [
    columnHelper.accessor('name', {
      header: () => <span>Name</span>,
      minSize: 2000,
      cell: info => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor('slug', {
      header: () => <span>Slug</span>,
      cell: info => <span>{info.getValue()}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span>Actions</span>,
      cell: info => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEditPageId(info.row.original.id)
              setIsDialogOpen(true)
            }}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => router.push(`/admin/pages/${info.row.original.id}/configure`)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Configure
          </Button>
          <Button
            onClick={() => onDeletePage(info.row.original.id)}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      ),
    }),
  ]

  return (
    <>
      <BaseCard
        title="Gerenciamento de páginas"
        onAdd={() => {
          setEditPageId(null)
          setIsDialogOpen(true)
        }}
        loading={isLoading}
        addButtonText="Nova página"
        onUpdate={() => {
          console.log('Update pages')
        }}
        updateButtonText="Atualizar"
        showEmptyState={!pages?.length}
        emptyStateMessage="Nenhuma página criada ainda. Clique em 'Nova página' para criar sua primeira página."
      >
        <TableMadrid data={pages || []} columns={columns} />
      </BaseCard>
      <PagesDialog
        type={editPageId ? 'edit' : 'add'}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        pageId={editPageId}
      />
    </>
  )
}
