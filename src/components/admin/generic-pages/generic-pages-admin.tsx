'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import LoadingSpinner from '@/components/common/loading-spinner'
import SectionManagementModal from './section-management-modal'
import PageForm from './forms/page-form'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  FolderTree,
  StickyNote,
  ExternalLink,
} from 'lucide-react'
import {
  useFindManyGenericPage,
  useDeleteGenericPage,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { GenericPage } from '@zenstackhq/runtime/models'
import Link from 'next/link'
import { BaseCard } from '@/components/ui/base-card'
import { revalidateGenericPages } from '@/lib/cache-revalidation'

export default function GenericPagesAdmin() {
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false)
  const [isPageFormOpen, setIsPageFormOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [deletingPage, setDeletingPage] = useState<GenericPage | null>(null)
  const toast = useToast()

  const { mutate: deletePage } = useDeleteGenericPage()

  const { data: pages, isLoading: isPagesLoading } = useFindManyGenericPage({
    where: {
      OR: searchTerm
        ? [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { slug: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ]
        : undefined,
    },
    orderBy: { title: 'asc' },
    include: {
      section: {
        select: { id: true, title: true },
      },
      _count: {
        select: { contentBlocks: true },
      },
    },
  })

  const handleAddPage = () => {
    setIsPageFormOpen(true)
  }

  const handleDeletePage = (page: GenericPage) => {
    setDeletingPage(page)
  }

  const handleFormSuccess = () => {
    setIsPageFormOpen(false)
  }

  const handleConfirmDeletePage = () => {
    if (!deletingPage) return

    deletePage(
      { where: { id: deletingPage.id } },
      {
        onSuccess: async () => {
          toast.success('Página excluída com sucesso!')
          setDeletingPage(null)
          await revalidateGenericPages()
        },
        onError: error => {
          console.error('Page delete error:', error)
          toast.error('Erro ao excluir página')
        },
      },
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <BaseCard title="Páginas" description="Gerencie as páginas do site">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar páginas..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setIsSectionModalOpen(true)}
              >
                <FolderTree className="h-4 w-4 mr-2" />
                Gerenciar Seções
              </Button>

              <Button onClick={handleAddPage}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Página
              </Button>
            </div>
          </div>

          {/* Pages Table */}
          <Card>
            <CardHeader>
              <CardTitle>Páginas</CardTitle>
            </CardHeader>
            <CardContent>
              {isPagesLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner className="h-8 w-8" />
                </div>
              ) : !pages?.length ? (
                <div className="text-center py-12">
                  <StickyNote className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? 'Nenhuma página encontrada'
                      : 'Nenhuma página criada'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm
                      ? 'Tente buscar com outros termos'
                      : 'Clique em "Nova Página" para começar'}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Seção</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Conteúdo</TableHead>
                      <TableHead>Criado em</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map(page => (
                      <TableRow key={page.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/admin/generic-pages/${page.id}`}
                            className="hover:text-primary"
                          >
                            {page.title}
                          </Link>
                          {page.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {page.description}
                            </p>
                          )}
                        </TableCell>

                        <TableCell>
                          {page.section && (
                            <Badge variant="secondary">
                              {page.section.title}
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            /{page.slug}
                          </code>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline">
                            {page._count.contentBlocks} blocos
                          </Badge>
                        </TableCell>

                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(page.createdAt).toLocaleDateString('pt-BR')}
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/generic-pages/${page.id}`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/pages/${page.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Visualizar
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleDeletePage(page)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </BaseCard>

      {/* Section Management Modal */}
      <SectionManagementModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
      />

      {/* Page Form Modal */}
      <PageForm
        isOpen={isPageFormOpen}
        onClose={() => setIsPageFormOpen(false)}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingPage}
        onOpenChange={() => setDeletingPage(null)}
        onConfirm={handleConfirmDeletePage}
        title="Excluir Página"
        description={`Tem certeza que deseja excluir a página "${deletingPage?.title}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  )
}
