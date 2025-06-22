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
import { FormSelect } from '@/components/ui/form-fields/form-select'
import { FormSwitch } from '@/components/ui/form-fields/form-switch'
import LoadingSpinner from '@/components/common/loading-spinner'
import { useCreateFaqItem, useUpdateFaqItem } from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { FaqItem } from '@zenstackhq/runtime/models'
import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { FaqNature } from '@prisma/client'

const formSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  content: z.string().optional(),
  nature: z.enum([FaqNature.SIMPLE, FaqNature.PAGE]).default(FaqNature.SIMPLE),
  order: z.number().min(0, 'Ordem deve ser um número positivo').default(0),
  published: z.boolean().default(false),
})

type ItemFormValues = z.infer<typeof formSchema>

interface FaqItemFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  categoryId: string | null
  item?: FaqItem | null
}

export default function FaqItemForm({
  isOpen,
  onClose,
  onSuccess,
  categoryId,
  item,
}: FaqItemFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!item
  const toast = useToast()

  const { mutate: createItem } = useCreateFaqItem()
  const { mutate: updateItem } = useUpdateFaqItem()

  const methods = useForm<ItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item?.title || '',
      content: item?.content || '',
      nature: item?.nature || FaqNature.SIMPLE,
      order: item?.order || 0,
      published: item?.published || false,
    },
  })

  const onSubmit = async (values: ItemFormValues) => {
    if (!categoryId) return

    setIsSubmitting(true)

    const slug = formatToSlug(values.title)

    if (isEditMode && item) {
      updateItem(
        {
          where: { id: item.id },
          data: {
            ...values,
            slug,
          },
        },
        {
          onSuccess: () => {
            toast.success('Item atualizado com sucesso!')
            onSuccess()
            setIsSubmitting(false)
          },
          onError: error => {
            console.error('Item update error:', error)
            toast.error('Erro ao atualizar item')
            setIsSubmitting(false)
          },
        },
      )
    } else {
      createItem(
        {
          data: {
            ...values,
            slug,
            categoryId,
          },
        },
        {
          onSuccess: () => {
            toast.success('Item criado com sucesso!')
            onSuccess()
            setIsSubmitting(false)
          },
          onError: error => {
            console.error('Item creation error:', error)
            toast.error('Erro ao criar item')
            setIsSubmitting(false)
          },
        },
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Item FAQ' : 'Novo Item FAQ'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite as informações do item FAQ.'
              : 'Crie um novo item de pergunta frequente.'}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormText
                name="title"
                label="Título"
                placeholder="Digite o título da pergunta"
                required
                className="col-span-2"
              />

              <FormSelect
                name="nature"
                label="Tipo"
                placeholder="Selecione o tipo"
                options={[
                  { value: FaqNature.SIMPLE, label: 'Simples' },
                  { value: FaqNature.PAGE, label: 'Página' },
                ]}
                required
              />

              <FormNumber name="order" label="Ordem" placeholder="0" min={0} />
            </div>

            <FormTextarea
              name="content"
              label="Conteúdo"
              placeholder="Digite o conteúdo da resposta"
              rows={6}
            />

            <FormSwitch
              name="published"
              label="Publicado"
              description="Marque para tornar este item visível no site"
            />

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
