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
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LoadingSpinner from '@/components/common/loading-spinner'
import {
  useCreateGenericPage,
  useUpdateGenericPage,
  useFindManySection,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { GenericPage } from '@zenstackhq/runtime/models'
import { revalidateGenericPages } from '@/lib/cache-revalidation'
import { formatToSlug } from '@/lib/formatters/slug.formatter'

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
  page?: GenericPage | null
}

export default function PageForm({
  isOpen,
  onClose,
  onSuccess,
  page,
}: PageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!page
  const toast = useToast()

  const { mutate: createPage } = useCreateGenericPage()
  const { mutate: updatePage } = useUpdateGenericPage()

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
      title: page?.title || '',
      description: page?.description || '',
      slug: page?.slug || '',
      sectionId: page?.sectionId || '',
    },
  })

  const onSubmit = async (values: PageFormValues) => {
    setIsSubmitting(true)

    if (isEditMode && page) {
      updatePage(
        {
          where: { id: page.id },
          data: values,
        },
        {
          onSuccess: () => {
            toast.success('Página atualizada com sucesso!')
            revalidateGenericPages()
            onSuccess()
            setIsSubmitting(false)
          },
          onError: error => {
            console.error('Page update error:', error)
            toast.error('Erro ao atualizar página')
            setIsSubmitting(false)
          },
        },
      )
    } else {
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
  }

  const handleClose = () => {
    methods.reset()
    onClose()
  }

  const handleTitleChange = (title: string) => {
    methods.setValue('title', title)
    if (!isEditMode && !methods.getValues('slug')) {
      methods.setValue('slug', formatToSlug(title))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Página' : 'Nova Página'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite as informações da página.'
              : 'Crie uma nova página no site.'}
          </DialogDescription>
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
              required
              description="URL amigável para a página"
            />

            <FormTextarea
              name="description"
              label="Descrição"
              placeholder="Digite uma breve descrição da página"
              rows={3}
            />

            <FormItem>
              <FormLabel>Seção *</FormLabel>
              <FormControl>
                <Select
                  value={methods.watch('sectionId')}
                  onValueChange={value => methods.setValue('sectionId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma seção" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections?.map(section => (
                      <SelectItem key={section.id} value={section.id}>
                        {section.title}
                        {section.parentSection && (
                          <span className="text-muted-foreground text-xs ml-2">
                            (em {section.parentSection.title})
                          </span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
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
