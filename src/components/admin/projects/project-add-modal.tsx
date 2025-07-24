import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormSelect, FormText } from '@/components/ui/form-fields'
import { useToast } from '@/lib/hooks/toast'
import { useCreateProject } from '@/lib/zenstack-hooks'
import { z } from '@/utils/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProjectType } from '@prisma/client'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import FormButtons from '../form-buttons'

const createProjectSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  type: z.enum(ProjectType),
})

type CreateProjectSchema = z.infer<typeof createProjectSchema>

interface ProjectAddModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export default function ProjectAddModal({
  className,
  isOpen,
  onClose,
}: ProjectAddModalProps) {
  const { mutateAsync: createProject, isPending } = useCreateProject()
  const toast = useToast()

  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: '',
      type: ProjectType.RESEARCH,
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset()
    }
  }, [form, isOpen])

  const handleSubmit = useCallback(
    async (values: CreateProjectSchema) => {
      try {
        await createProject({
          data: {
            title: values.title,
            type: values.type,
          },
        })
        toast.success('Projeto criado com sucesso')
        onClose()
      } catch (e) {
        console.error(e)
        toast.exception(e)
      }
    },
    [createProject, onClose, toast],
  )

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar novo projeto</DialogTitle>
          <DialogDescription>Insira os dados do projeto</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, console.error)}
            className={twMerge('space-y-6', className)}
          >
            <FormText
              name="title"
              label="Título"
              placeholder="Título do projeto"
              required
            />

            <FormSelect
              name="type"
              label="Tipo"
              placeholder="Tipo do projeto"
              options={[
                { label: 'Projeto de Pesquisa', value: ProjectType.RESEARCH },
                { label: 'Projeto de Extensão', value: ProjectType.EXTENSION },
              ]}
              required
            />
          </form>

          <FormButtons
            onSubmit={form.handleSubmit(handleSubmit, console.error)}
            onCancel={onClose}
            isSubmitting={isPending}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
