'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from '@/utils/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2, Edit } from 'lucide-react'
import {
  useFindManyNewsCategory,
  useCreateNewsCategory,
  useUpdateNewsCategory,
  useDeleteNewsCategory,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import LoadingSpinner from '@/components/common/loading-spinner'
import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { FormNumber, FormText, FormTextarea } from '@/components/ui/form-fields'
import FormGrid from '@/components/ui/form-fields/form-grid'

const categorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  slug: z.string().min(1, 'Slug é obrigatório'),
  order: z.number().min(0, 'Ordem deve ser maior ou igual a 0'),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface NewsCategoryFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function NewsCategoryForm({
  isOpen,
  onClose,
  onSuccess,
}: NewsCategoryFormProps) {
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const toast = useToast()

  const {
    data: categories,
    isLoading,
  } = useFindManyNewsCategory({
    orderBy: { order: 'asc' },
  })

  const { mutateAsync: createCategory, isPending: isCreating } =
    useCreateNewsCategory()
  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useUpdateNewsCategory()
  const { mutateAsync: deleteCategory } = useDeleteNewsCategory()

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      slug: '',
      order: 0,
    },
  })

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        await updateCategory({
          where: { id: editingCategory },
          data,
        })
        toast.success('Categoria atualizada com sucesso!')
      } else {
        await createCategory({ data })
        toast.success('Categoria criada com sucesso!')
      }

      form.reset()
      setEditingCategory(null)
      onSuccess?.()
    } catch {
      toast.error('Erro ao salvar categoria.')
    }
  }

  const handleEdit = (category: any) => {
    setEditingCategory(category.id)
    form.reset({
      name: category.name,
      description: category.description || '',
      slug: category.slug,
      order: category.order,
    })
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja excluir a categoria "${name}"?`)) {
      return
    }

    try {
      await deleteCategory({ where: { id } })
      toast.success('Categoria excluída com sucesso!')
    } catch {
      toast.error('Erro ao excluir categoria.')
    }
  }

  const handleCancel = () => {
    form.reset()
    setEditingCategory(null)
  }

  useEffect(() => {
    const subscription = form.watch((value, { name: fieldName }) => {
      if (fieldName === 'name' && value.name) {
        form.setValue('slug', formatToSlug(value.name))
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciar Categorias de Notícias</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormGrid>
                <FormText
                  name="name"
                  label="Nome"
                  placeholder="Nome da categoria"
                  span={2}
                />

                <FormText
                  name="slug"
                  label="Slug"
                  placeholder="slug-da-categoria"
                  span={2}
                />
              </FormGrid>

              <FormTextarea
                name="description"
                label="Descrição"
                placeholder="Descrição da categoria"
                rows={3}
              />

              <FormNumber name="order" label="Ordem" placeholder="0" min={0} />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1"
                >
                  {isCreating || isUpdating ? (
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                  ) : null}
                  {editingCategory ? 'Atualizar' : 'Criar'} Categoria
                </Button>
                {editingCategory && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </form>
          </Form>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Categorias Existentes</h3>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner className="h-6 w-6" />
              </div>
            ) : categories && categories.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Ordem</TableHead>
                    <TableHead className="w-20">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map(category => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {category.slug}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {category.description || '-'}
                      </TableCell>
                      <TableCell>{category.order}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDelete(category.id, category.name)
                            }
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nenhuma categoria encontrada.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
