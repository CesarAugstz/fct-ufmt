'use client'

import { useCallback, useState } from 'react'
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

import LoadingSpinner from '@/components/common/loading-spinner'
import { useCreateGenericPage, useFindManySection } from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { revalidateGenericPages } from '@/lib/cache-revalidation'
import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { FormSelect } from '@/components/ui/form-fields'

const formSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  slug: z
    .string()
    .min(1, 'Slug é obrigatório')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug deve conter apenas letras minúsculas, números e hífens',
    ),
  sectionId: z.string().min(1, 'Seção é obrigatória'),
})

type PageFormValues = z.infer<typeof formSchema>

interface PageFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function PageForm({
  isOpen,
  onClose,
  onSuccess,
}: PageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const { mutate: createPage } = useCreateGenericPage()

  const { data: sections } = useFindManySection({
    orderBy: { title: 'asc' },
    include: {
      parentSection: {
        select: { title: true },
      },
    },
  })

  const methods = useForm<PageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      slug: '',
      sectionId: '',
    },
  })

  const onSubmit = async (values: PageFormValues) => {
    setIsSubmitting(true)

    createPage(
      {
        data: values,
      },
      {
        onSuccess: () => {
          toast.success('Página criada com sucesso!')
          revalidateGenericPages()
          onSuccess()
          setIsSubmitting(false)
        },
        onError: error => {
          console.error('Page creation error:', error)
          toast.error('Erro ao criar página')
          setIsSubmitting(false)
        },
      },
    )
  }

  const handleClose = () => {
    methods.reset()
    onClose()
  }

  const handleTitleChange = useCallback(
    (title: string) => {
      const formatted = formatToSlug(title)
      if (methods.getValues('slug') === formatted) return

      methods.setValue('slug', formatted)
    },
    [methods],
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Página</DialogTitle>
          <DialogDescription>Crie uma nova página no site</DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormText
              name="title"
              label="Título da Página"
              placeholder="Digite o título da página"
              required
              onChange={e => handleTitleChange(e.target.value)}
            />

            <FormText
              name="slug"
              label="Slug"
              placeholder="slug-da-pagina"
              disabled
              description="URL amigável para a página"
            />

            <FormTextarea
              name="description"
              label="Descrição"
              placeholder="Digite uma breve descrição da página"
              rows={3}
            />

            <FormSelect
              name="sectionId"
              label="Seção"
              placeholder="Selecione uma seção"
              required
              options={
                sections?.map(section => ({
                  value: section.id,
                  label: section.title,
                })) ?? []
              }
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <LoadingSpinner className="mr-2 h-4 w-4" />}
                Salvar
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
