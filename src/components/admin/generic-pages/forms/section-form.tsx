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
  useCreateSection,
  useUpdateSection,
  useFindManySection,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { Section } from '@zenstackhq/runtime/models'
import { revalidateSections } from '@/lib/cache-revalidation'

const formSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  parentSectionId: z.string().optional().nullable(),
})

type SectionFormValues = z.infer<typeof formSchema>

interface SectionFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  section?: Section | null
}

export default function SectionForm({
  isOpen,
  onClose,
  onSuccess,
  section,
}: SectionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!section
  const toast = useToast()

  const { mutate: createSection } = useCreateSection()
  const { mutate: updateSection } = useUpdateSection()

  const { data: allSections } = useFindManySection({
    orderBy: { title: 'asc' },
    include: {
      subSections: true,
      parentSection: true,
    },
  })

  const methods = useForm<SectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section?.title || '',
      parentSectionId: section?.parentSectionId || null,
    },
  })

  const getAvailableParentSections = () => {
    if (!allSections) return []

    if (!isEditMode) return allSections

    const getSectionAndDescendants = (sectionId: string): string[] => {
      const descendants: string[] = [sectionId]
      const childSections = allSections.filter(
        s => s.parentSectionId === sectionId,
      )

      for (const child of childSections) {
        descendants.push(...getSectionAndDescendants(child.id))
      }

      return descendants
    }

    const excludedIds = getSectionAndDescendants(section!.id)
    return allSections.filter(s => !excludedIds.includes(s.id))
  }

  const availableParentSections = getAvailableParentSections()

  const onSubmit = async (values: SectionFormValues) => {
    setIsSubmitting(true)

    const submitData = {
      ...values,
      parentSectionId: values.parentSectionId || null,
    }

    if (isEditMode && section) {
      updateSection(
        {
          where: { id: section.id },
          data: submitData,
        },
        {
          onSuccess: () => {
            toast.success('Seção atualizada com sucesso!')
            revalidateSections()
            onSuccess()
            setIsSubmitting(false)
          },
          onError: error => {
            console.error('Section update error:', error)
            toast.error('Erro ao atualizar seção')
            setIsSubmitting(false)
          },
        },
      )
    } else {
      createSection(
        {
          data: submitData,
        },
        {
          onSuccess: () => {
            toast.success('Seção criada com sucesso!')
            revalidateSections()
            onSuccess()
            setIsSubmitting(false)
          },
          onError: error => {
            console.error('Section creation error:', error)
            toast.error('Erro ao criar seção')
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Seção' : 'Nova Seção'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite as informações da seção.'
              : 'Crie uma nova seção para organizar as páginas.'}
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormText
              name="title"
              label="Título da Seção"
              placeholder="Digite o título da seção"
              required
            />

            <FormItem>
              <FormLabel>Seção Pai (Opcional)</FormLabel>
              <FormControl>
                <Select
                  value={methods.watch('parentSectionId') || ''}
                  onValueChange={value =>
                    methods.setValue(
                      'parentSectionId',
                      value === '' ? null : value,
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma seção pai" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null as unknown as string}>
                      Nenhuma (Seção Raiz)
                    </SelectItem>
                    {availableParentSections.map(parentSection => (
                      <SelectItem
                        key={parentSection.id}
                        value={parentSection.id}
                      >
                        {parentSection.title}
                        {parentSection.parentSection && (
                          <span className="text-muted-foreground text-xs ml-2">
                            (em {parentSection.parentSection.title})
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
