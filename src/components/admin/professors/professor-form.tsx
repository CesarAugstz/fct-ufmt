'use client'

import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Role } from '@prisma/client'
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
  useCreateProfessor,
  useFindManyCourse,
  useFindUniqueProfessor,
  useUpdateProfessor,
} from '@/lib/zenstack-hooks'

import { useToast } from '@/lib/hooks/toast'
import { ProfessorSchema } from '@/utils/schemas/professor.schema'
import { FormMultiSelect } from '@/components/common/form/form-mutiple-select'

const formSchema = ProfessorSchema.formSchema

type ProfessorFormValues = z.infer<typeof formSchema>

interface ProfessorFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  professorId?: string
}

export default function ProfessorForm({
  isOpen,
  onClose,
  onSuccess,
  professorId,
}: ProfessorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!professorId
  const toast = useToast()

  const { data: professorData, isLoading: isLoadingUser } =
    useFindUniqueProfessor(
      { where: { id: professorId }, include: { user: true, courses: true } },
      { enabled: !!professorId },
    )

  const { user: userData } = professorData ?? {}

  const { data: coursesData } = useFindManyCourse()

  const { mutate: updateProfessor } = useUpdateProfessor()
  const { mutate: createProfessor } = useCreateProfessor()

  const methods = useForm<ProfessorFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: userData?.name || '',
      email: userData?.email || '',
      password: '',
      courses: professorData?.courses?.map(c => c.id) || [],
      role: 'PROFESSOR',
    },
  })

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen, methods])

  const onSubmit = async (values: ProfessorFormValues) => {
    setIsSubmitting(true)

    if (isEditMode && userData) {
      updateProfessor(
        {
          where: { id: userData.id },
          data: {
            courses: { connect: values.courses.map(id => ({ id })) },
            user: {
              update: {
                name: values.name,
                email: values.email,
                password: values.password,
              },
            },
          },
        },
        {
          onSuccess: () => {
            setIsSubmitting(false)
            onSuccess()
          },
          onError: error => {
            console.error('Error updating professor:', error)
            setIsSubmitting(false)
            toast.exception(error)
          },
        },
      )
    } else {
      if (!values.password) {
        methods.setError('password', {
          type: 'manual',
          message: 'Senha é obrigatória para novos professores',
        })
        setIsSubmitting(false)
        return
      }

      createProfessor(
        {
          data: {
            courses: { connect: values.courses.map(id => ({ id })) },
            extensionProjects: [],
            publications: [],
            researchProjects: [],
            user: {
              create: {
                name: values.name,
                email: values.email,
                password: values.password,
                role: values.role as Role,
              },
            },
          },
        },
        {
          onSuccess: () => {
            setIsSubmitting(false)
            onSuccess()
          },
          onError: error => {
            console.error('Error creating professor:', error)
            setIsSubmitting(false)
            toast.exception(error)
          },
        },
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Professor' : 'Adicionar Novo Professor'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Atualize as informações do professor no formulário abaixo.'
              : 'Insira os detalhes do novo professor.'}
          </DialogDescription>
        </DialogHeader>

        {isLoadingUser ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormText
                name="name"
                label="Nome"
                placeholder="Digite o nome do professor"
              />

              <FormText
                name="email"
                label="Email"
                placeholder="Digite o endereço de email"
                required
              />

              <FormText
                name="password"
                label={
                  isEditMode
                    ? 'Senha (deixe em branco para manter a atual)'
                    : 'Senha'
                }
                placeholder={
                  isEditMode ? 'Digite a nova senha' : 'Digite a senha'
                }
                type="password"
                required={!isEditMode}
              />

              <FormMultiSelect
                name="courses"
                label="Cursos"
                options={
                  coursesData?.map(course => ({
                    value: course.id,
                    label: course.name,
                  })) || []
                }
              />

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" variant="default" disabled={isSubmitting}>
                  {isSubmitting && <LoadingSpinner className="mr-2" />}
                  {isEditMode ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  )
}
