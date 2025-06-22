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
import { Plus, Edit, HelpCircle } from 'lucide-react'
import { FaqCategory, FaqItem } from '@zenstackhq/runtime/models'
import FaqCategoryForm from '../../forms/faq-category-form'
import FaqItemForm from '../../forms/faq-item-form'

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

  const course = {}

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsCategoryFormOpen(true)
  }

  const handleEditCategory = (category: FaqCategory) => {
    setEditingCategory(category)
    setIsCategoryFormOpen(true)
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

  const handleFormSuccess = () => {
    setIsCategoryFormOpen(false)
    setIsItemFormOpen(false)
    setEditingCategory(null)
    setEditingItem(null)
    setSelectedCategoryId(null)
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
          {course?.faqCategories?.length === 0 ? (
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
              {course?.faqCategories?.map(category => (
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
                        {category.faqItems
                          .sort((a, b) => a.order - b.order)
                          .map(item => (
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
                                      {item.published
                                        ? 'Publicado'
                                        : 'Rascunho'}
                                    </Badge>
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
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pt-2">
                                  {item.content ? (
                                    <div
                                      className="prose prose-sm max-w-none"
                                      dangerouslySetInnerHTML={{
                                        __html: item.content,
                                      }}
                                    />
                                  ) : (
                                    <p className="text-muted-foreground italic">
                                      Sem conteúdo
                                    </p>
                                  )}
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
        courseId={'11'} // course.id}
        category={editingCategory}
      />

      <FaqItemForm
        isOpen={isItemFormOpen}
        onClose={() => setIsItemFormOpen(false)}
        onSuccess={handleFormSuccess}
        categoryId={selectedCategoryId}
        item={editingItem}
      />
    </div>
  )
}
