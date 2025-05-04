import { z } from 'zod'
import DialogForm from '@/components/common/dialog-form'
import { ExtensionProject } from './extension-project-card'
import { FormField } from '@/lib/hooks/form/render-form-fields'
import { ProjectStatus } from '@/types/admin/professor.types'

const extensionProjectSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.enum([ProjectStatus.ONGOING, ProjectStatus.FINISHED]),
  description: z.string().optional(),
})

type ExtensionProjectFormValues = z.infer<typeof extensionProjectSchema>

interface ExtensionProjectFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  project?: ExtensionProject
  onSubmit: (project: ExtensionProject) => Promise<void>
}

export default function ExtensionProjectForm({
  isOpen,
  onClose,
  onSuccess,
  project,
  onSubmit,
}: ExtensionProjectFormProps) {
  const isEditMode = !!project

  const handleSubmit = async (values: ExtensionProjectFormValues) => {
    await onSubmit(values as ExtensionProject)
    onSuccess()
  }

  const fields: FormField[] = [
    {
      type: 'text',
      getProps: () => ({
        name: 'title',
        label: 'Título',
        placeholder: 'Digite o título do projeto',
        required: true,
      }),
    },
    {
      type: 'date',
      getProps: () => ({
        name: 'startDate',
        label: 'Data de Início',
        required: true,
        views: ['year', 'month'],
        format: 'MM/YYYY',
      }),
    },
    {
      type: 'date',
      getProps: () => ({
        name: 'endDate',
        label: 'Data de Término (opcional)',
        views: ['year', 'month'],
        format: 'MM/YYYY',
      }),
    },
    {
      type: 'select',
      getOptions: () => ({
        name: 'status',
        label: 'Status',
        options: [
          { value: ProjectStatus.ONGOING, label: 'Em andamento' },
          { value: ProjectStatus.FINISHED, label: 'Finalizado' },
        ],
        required: true,
      }),
    },
    {
      type: 'textarea',
      getProps: () => ({
        name: 'description',
        label: 'Descrição',
        placeholder: 'Descreva o projeto de extensão',
      }),
    },
  ]

  return (
    <DialogForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={
        isEditMode
          ? 'Editar Projeto de Extensão'
          : 'Adicionar Projeto de Extensão'
      }
      description={
        isEditMode
          ? 'Atualize as informações do projeto de extensão.'
          : 'Insira os detalhes do novo projeto de extensão.'
      }
      schema={extensionProjectSchema}
      values={project}
      submitLabel={isEditMode ? 'Salvar' : 'Adicionar'}
      fields={fields}
    />
  )
}
