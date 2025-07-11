'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Plus, Edit, HelpCircle, Trash2, ExternalLink } from 'lucide-react'
import { FaqCategory, FaqItem } from '@zenstackhq/runtime/models'
import {
  useFindUniqueCourse,
  useDeleteFaqCategory,
  useDeleteFaqItem,
} from '@/lib/zenstack-hooks'
import { useAtomValue } from 'jotai'
import { courseSlugAtom } from '../../store/course.store'
import { useToast } from '@/lib/hooks/toast'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import Link from 'next/link'
import FaqCategoryForm from '../../forms/faq-category-form'
import FaqItemForm from '../../forms/faq-item-form'
import LoadingSpinner from '@/components/common/loading-spinner'

export default function CourseFaqTab() {
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false)
  const [isItemFormOpen, setIsItemFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<FaqCategory | null>(
    null,
  )
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  )
  const [deletingCategory, setDeletingCategory] = useState<FaqCategory | null>(
    null,
  )
  const [deletingItem, setDeletingItem] = useState<FaqItem | null>(null)

  const slug = useAtomValue(courseSlugAtom)
  const toast = useToast()

  const { mutate: deleteCategory } = useDeleteFaqCategory()
  const { mutate: deleteItem } = useDeleteFaqItem()

  const { data: course, isLoading } = useFindUniqueCourse(
    {
      where: { slug: slug! },
      select: {
        id: true,
        name: true,
        slug: true,
        faqCategories: {
          orderBy: { order: 'asc' },
          include: {
            faqItems: {
              orderBy: { order: 'asc' },
              include: {
                contentBlocks: true,
              },
            },
          },
        },
      },
    },
    { enabled: !!slug },
  )

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsCategoryFormOpen(true)
  }

  const handleEditCategory = (category: FaqCategory) => {
    setEditingCategory(category)
    setIsCategoryFormOpen(true)
  }

  const handleDeleteCategory = (category: FaqCategory) => {
    setDeletingCategory(category)
  }

  const handleConfirmDeleteCategory = () => {
    if (!deletingCategory) return

    deleteCategory(
      { where: { id: deletingCategory.id } },
      {
        onSuccess: () => {
          toast.success('Categoria excluída com sucesso!')
          setDeletingCategory(null)
        },
        onError: error => {
          console.error('Category delete error:', error)
          toast.error('Erro ao excluir categoria')
        },
      },
    )
  }

  const handleAddItem = (categoryId: string) => {
    setEditingItem(null)
    setSelectedCategoryId(categoryId)
    setIsItemFormOpen(true)
  }

  const handleEditItem = (item: FaqItem) => {
    setEditingItem(item)
    setSelectedCategoryId(item.categoryId)
    setIsItemFormOpen(true)
  }

  const handleDeleteItem = (item: FaqItem) => {
    setDeletingItem(item)
  }

  const handleConfirmDeleteItem = () => {
    if (!deletingItem) return

    deleteItem(
      { where: { id: deletingItem.id } },
      {
        onSuccess: () => {
          toast.success('Item excluído com sucesso!')
          setDeletingItem(null)
        },
        onError: error => {
          console.error('Item delete error:', error)
          toast.error('Erro ao excluir item')
        },
      },
    )
  }

  const handleFormSuccess = () => {
    setIsCategoryFormOpen(false)
    setIsItemFormOpen(false)
    setEditingCategory(null)
    setEditingItem(null)
    setSelectedCategoryId(null)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>FAQ do Curso</CardTitle>
            <Button onClick={handleAddCategory}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Categoria
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!course?.faqCategories?.length ? (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Nenhuma categoria FAQ encontrada
              </p>
              <p className="text-sm text-muted-foreground">
                Clique em "Nova Categoria" para começar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {course.faqCategories.map(category => (
                <Card key={category.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {category.name}
                        </CardTitle>
                        {category.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.description}
                          </p>
                        )}
                        <Badge variant="outline" className="mt-2">
                          {category.faqItems.length} itens
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddItem(category.id)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Item
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCategory(category)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {category.faqItems.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        Nenhum item nesta categoria
                      </p>
                    ) : (
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqItems.map(item => (
                          <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="text-left">
                              <div className="flex justify-between items-center w-full mr-4">
                                <span>{item.title}</span>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={
                                      item.published ? 'default' : 'secondary'
                                    }
                                    className="text-xs"
                                  >
                                    {item.published ? 'Publicado' : 'Rascunho'}
                                  </Badge>
                                  <Link
                                    href={`/home/courses/${course.slug}/faq/${item.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary"
                                    onClick={e => e.stopPropagation()}
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </Link>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={e => {
                                      e.stopPropagation()
                                      handleEditItem(item)
                                    }}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={e => {
                                      e.stopPropagation()
                                      handleDeleteItem(item)
                                    }}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pt-2">
                                <p className="text-muted-foreground text-sm mb-2">
                                  Slug:{' '}
                                  <code className="bg-muted px-1 rounded">
                                    {item.slug}
                                  </code>
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  {item.contentBlocks?.length || 0} blocos de
                                  conteúdo
                                </p>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <FaqCategoryForm
        isOpen={isCategoryFormOpen}
        onClose={() => setIsCategoryFormOpen(false)}
        onSuccess={handleFormSuccess}
        courseId={course?.id || ''}
        category={editingCategory}
      />

      <FaqItemForm
        isOpen={isItemFormOpen}
        onClose={() => setIsItemFormOpen(false)}
        onSuccess={handleFormSuccess}
        categoryId={selectedCategoryId || ''}
        itemId={editingItem?.id}
      />

      <ConfirmDialog
        open={!!deletingCategory}
        onOpenChange={() => setDeletingCategory(null)}
        onConfirm={handleConfirmDeleteCategory}
        title="Excluir Categoria"
        description={`Tem certeza que deseja excluir a categoria "${deletingCategory?.name}"? Esta ação não pode ser desfeita e todos os itens desta categoria também serão excluídos.`}
      />

      <ConfirmDialog
        open={!!deletingItem}
        onOpenChange={() => setDeletingItem(null)}
        onConfirm={handleConfirmDeleteItem}
        title="Excluir Item FAQ"
        description={`Tem certeza que deseja excluir o item "${deletingItem?.title}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  )
}
