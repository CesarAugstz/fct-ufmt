import { z } from 'zod'
import DialogForm from '@/components/common/dialog-form'
import { ResearchProject } from './research-project-card'
import { FormField } from '@/lib/hooks/form/render-form-fields'

const researchProjectSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.enum(['ongoing', 'finished']),
  description: z.string().optional(),
})

type ResearchProjectFormValues = z.infer<typeof researchProjectSchema>

interface ResearchProjectFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  project?: ResearchProject
  onSubmit: (project: ResearchProject) => Promise<void>
}

export default function ResearchProjectForm({
  isOpen,
  onClose,
  onSuccess,
  project,
  onSubmit,
}: ResearchProjectFormProps) {
  const isEditMode = !!project

  const handleSubmit = async (values: ResearchProjectFormValues) => {
    await onSubmit(values as ResearchProject)
    onSuccess()
  }

  const fields: FormField[] = [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      getProps: () => ({
        name: 'title',
        label: 'Título',
        placeholder: 'Digite o título do projeto',
        required: true,
      }),
    },
    {
      name: 'startDate',
      label: 'Data de Início',
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
      name: 'endDate',
      label: 'Data de Término (opcional)',
      type: 'date',
      getProps: () => ({
        name: 'endDate',
        label: 'Data de Término (opcional)',
        views: ['year', 'month'],
        format: 'MM/YYYY',
      }),
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      getOptions: () => ({
        name: 'status',
        label: 'Status',
        options: [
          { value: 'ongoing', label: 'Em andamento' },
          { value: 'finished', label: 'Finalizado' },
        ],
        required: true,
      }),
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      getProps: () => ({
        name: 'description',
        label: 'Descrição',
        placeholder: 'Descreva o projeto de pesquisa',
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
          ? 'Editar Projeto de Pesquisa'
          : 'Adicionar Projeto de Pesquisa'
      }
      description={
        isEditMode
          ? 'Atualize as informações do projeto de pesquisa.'
          : 'Insira os detalhes do novo projeto de pesquisa.'
      }
      schema={researchProjectSchema}
      values={project}
      submitLabel={isEditMode ? 'Salvar' : 'Adicionar'}
      fields={fields}
    />
  )
}
