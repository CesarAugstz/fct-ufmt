'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from '@/utils/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormNumber } from '@/components/ui/form-fields/form-number'
import { FormSwitch } from '@/components/ui/form-fields/form-switch'
import { FormBlocks } from '@/components/ui/form-fields/form-blocks'
import LoadingSpinner from '@/components/common/loading-spinner'
import {
  useCreateFaqItem,
  useFindUniqueFaqItem,
  useUpdateFaqItem,
  useUpsertAttachment,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { getBlockSchema } from '@/components/ui/form-fields/blocks/blocks.schema'
import { Prisma } from '@prisma/client'

const formSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  order: z.number().min(0, 'Ordem deve ser um número positivo'),
  published: z.boolean(),
  contentBlocks: z.array(getBlockSchema()).optional(),
})

type ItemFormValues = z.infer<typeof formSchema>

interface FaqItemFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  itemId?: string
  categoryId: string
}

export default function FaqItemForm({
  isOpen,
  onClose,
  onSuccess,
  itemId,
  categoryId,
}: FaqItemFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!itemId
  const toast = useToast()

  const { mutate: createItem } = useCreateFaqItem()
  const { mutateAsync: updateItem } = useUpdateFaqItem()
  const { mutateAsync: upsertAttachment } = useUpsertAttachment()
  const { data: item, isLoading: isLoadingItem } = useFindUniqueFaqItem(
    {
      where: { id: itemId },
      include: { contentBlocks: { include: { file: true } } },
    },
    { enabled: !!itemId },
  )

  const methods = useForm<ItemFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      title: item?.title || '',
      order: item?.order || 0,
      published: item?.published || false,
      contentBlocks: item?.contentBlocks || [],
    },
  })

  const onSubmit = async (values: ItemFormValues) => {
    if (!categoryId) return
    setIsSubmitting(true)

    try {
      const slug = formatToSlug(values.title)

      const blocksToDelete = item?.contentBlocks
        ?.filter(block => !values.contentBlocks?.find(b => b.id === block.id))
        .map(block => block.id) as string[]

      if (isEditMode && item) {
        const filesToCreate: Prisma.AttachmentCreateInput[] = []

        await updateItem({
          where: { id: item.id },
          data: {
            title: values.title,
            slug,
            order: values.order,
            published: values.published,
            contentBlocks: {
              deleteMany: { id: { in: blocksToDelete } },
              upsert: values?.contentBlocks
                ?.map((block, index) => ({ ...block, order: index }))
                .map(block => {
                  if (block.file) {
                    filesToCreate.push({
                      ...block.file,
                      contentBlocks: {
                        connect: { id: block.id },
                      },
                    })
                  }
                  return {
                    where: { id: block.id },
                    update: {
                      ...block,
                      accordionItems: block.accordionItems || [],
                      file: undefined,
                    },
                    create: {
                      ...block,
                      accordionItems: block.accordionItems || [],
                      file: block.file ? { create: block.file } : undefined,
                    },
                  }
                }),
            },
          },
        })
        await Promise.all(
          filesToCreate.map(file =>
            upsertAttachment({
              where: { id: file.id },
              update: {},
              create: { ...file } as any,
            }),
          ),
        )
        toast.success('Item atualizado com sucesso!')
        onSuccess()
        setIsSubmitting(false)
        return
      }
      createItem(
        {
          data: {
            title: values.title,
            slug,
            order: values.order,
            published: values.published,
            categoryId,
            contentBlocks: {
              create: values?.contentBlocks
                ?.map((block, index) => ({ ...block, order: index }))
                .map(block => ({
                  ...block,
                  accordionItems: block.accordionItems || [],
                  file: block.file ? { create: block.file } : undefined,
                })),
            },
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
    } catch (error) {
      console.error('Item creation error:', error)
      toast.error('Erro ao criar item')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-7xl md:max-w-[80vw] max-h-[90vh] overflow-y-auto">
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
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormText
                name="title"
                label="Título"
                placeholder="Digite o título da pergunta"
                required
                className="col-span-2"
              />

              <FormNumber name="order" label="Ordem" placeholder="0" min={0} />

              <FormSwitch
                name="published"
                label="Publicado"
                description="Marque para tornar este item visível no site"
              />
            </div>

            <div className="border-t pt-6">
              <FormBlocks
                name="contentBlocks"
                label="Conteúdo em Blocos"
                span={4}
                className="md:col-span-4"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
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
