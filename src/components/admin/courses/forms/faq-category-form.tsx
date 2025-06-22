'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormTextarea } from '@/components/ui/form-fields/form-textarea'
import { FormNumber } from '@/components/ui/form-fields/form-number'
import LoadingSpinner from '@/components/common/loading-spinner'
import {
  useCreateFaqCategory,
  useUpdateFaqCategory,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { FaqCategory } from '@zenstackhq/runtime/models'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  order: z.number().min(0, 'Ordem deve ser um número positivo'),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface FaqCategoryFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  courseId: string
  category?: FaqCategory | null
}

export default function FaqCategoryForm({
  isOpen,
  onClose,
  onSuccess,
  courseId,
  category,
}: FaqCategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!category
  const toast = useToast()

  const { mutate: createCategory } = useCreateFaqCategory()
  const { mutate: updateCategory } = useUpdateFaqCategory()

  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
      order: category?.order || 0,
    },
  })

  const onSubmit = async (values: CategoryFormValues) => {
    setIsSubmitting(true)

    if (isEditMode && category) {
      updateCategory(
        {
          where: { id: category.id },
          data: values,
        },
        {
          onSuccess: () => {
            toast.success('Categoria atualizada com sucesso!')
            onSuccess()
            setIsSubmitting(false)
          },
          onError: error => {
            console.error('Category update error:', error)
            toast.error('Erro ao atualizar categoria')
            setIsSubmitting(false)
          },
        },
      )
    } else {
      createCategory(
        {
          data: {
            ...values,
            courseId,
          },
        },
        {
          onSuccess: () => {
            toast.success('Categoria criada com sucesso!')
            onSuccess()
            setIsSubmitting(false)
          },
          onError: error => {
            console.error('Category creation error:', error)
            toast.error('Erro ao criar categoria')
            setIsSubmitting(false)
          },
        },
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Categoria' : 'Nova Categoria'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite as informações da categoria FAQ.'
              : 'Crie uma nova categoria para organizar as perguntas frequentes.'}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormText
              name="name"
              label="Nome da Categoria"
              placeholder="Digite o nome da categoria"
              required
            />

            <FormTextarea
              name="description"
              label="Descrição"
              placeholder="Digite uma descrição para a categoria"
              rows={3}
            />

            <FormNumber name="order" label="Ordem" placeholder="0" min={0} />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <LoadingSpinner className="mr-2 h-4 w-4" />}
                {isEditMode ? 'Salvar' : 'Criar'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
