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
import LoadingSpinner from '@/components/common/loading-spinner'
import {
  useCreateCourse,
  useFindUniqueCourse,
  useUpdateCourse,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { CourseNature } from '@prisma/client'
import { FormSelect } from '@/components/ui/form-fields/form-select'
import { formatToSlug } from '@/lib/formatters/slug.formatter'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  nature: z.enum([CourseNature.GRADUATION, CourseNature.POST_GRADUATION]),
})

type CourseFormValues = z.infer<typeof formSchema>

interface CourseFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  courseId?: string
}

export default function CourseForm({
  isOpen,
  onClose,
  onSuccess,
  courseId,
}: CourseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!courseId
  const toast = useToast()

  const { data: courseData, isLoading: isLoadingCourse } = useFindUniqueCourse(
    { where: { id: courseId } },
    { enabled: !!courseId },
  )

  const { mutate: updateCourse } = useUpdateCourse()
  const { mutate: createCourse } = useCreateCourse()

  const methods = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: courseData?.name || '',
      nature: courseData?.nature || CourseNature.GRADUATION,
    },
  })

  const onSubmit = async (values: CourseFormValues) => {
    setIsSubmitting(true)

    if (isEditMode && courseData) {
      updateCourse(
        {
          where: { id: courseData.id },
          data: {
            name: values.name,
            slug: formatToSlug(values.name),
            nature: values.nature,
          },
        },
        {
          onSuccess: () => {
            setIsSubmitting(false)
            onSuccess()
            toast.success('Curso atualizado com sucesso!')
          },
          onError: error => {
            console.error('Error updating course:', error)
            setIsSubmitting(false)
            toast.exception(error)
          },
        },
      )
      return
    }
    createCourse(
      {
        data: {
          name: values.name,
          nature: values.nature,
          slug: formatToSlug(values.name),
        },
      },
      {
        onSuccess: () => {
          setIsSubmitting(false)
          onSuccess()
          methods.reset()
          toast.success('Curso criado com sucesso!')
        },
        onError: error => {
          console.error('Error creating course:', error)
          setIsSubmitting(false)
          toast.exception(error)
        },
      },
    )
  }

  const handleClose = () => {
    methods.reset()
    onClose()
  }

  if (isEditMode && isLoadingCourse) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <div className="flex items-center justify-center p-4">
            <LoadingSpinner />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Curso' : 'Novo Curso'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edite as informações do curso abaixo.'
              : 'Preencha as informações para criar um novo curso.'}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormText
              name="name"
              label="Nome"
              placeholder="Digite o nome do curso"
            />

            <FormSelect
              name="nature"
              label="Tipo do Curso"
              options={[
                {
                  value: CourseNature.GRADUATION,
                  label: 'Graduação',
                },
                {
                  value: CourseNature.POST_GRADUATION,
                  label: 'Pós-Graduação',
                },
              ]}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} variant="default">
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
