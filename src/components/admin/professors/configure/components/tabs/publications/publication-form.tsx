import { z } from 'zod'
import DialogForm from '@/components/common/dialog-form'
import { Publication } from './publication-card'
import { FormField } from '@/lib/hooks/form/render-form-fields'

const publicationSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  authors: z.array(z.string()).min(1, 'Pelo menos um autor é obrigatório'),
  date: z.date(),
  link: z.string().url('Link inválido').optional(),
})

type PublicationFormValues = z.infer<typeof publicationSchema>

interface PublicationFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  publication?: Publication
  onSubmit: (publication: Publication) => Promise<void>
}

export default function PublicationForm({
  isOpen,
  onClose,
  onSuccess,
  publication,
  onSubmit,
}: PublicationFormProps) {
  const isEditMode = !!publication

  const handleSubmit = async (values: PublicationFormValues) => {
    await onSubmit(values as Publication)
    onSuccess()
  }

  const fields: FormField[] = [
    {
      type: 'text',
      getProps: () => ({
        name: 'title',
        label: 'Título',
        placeholder: 'Digite o título da publicação',
        required: true,
      }),
    },
    {
      type: 'multiple-tags',
      getProps: () => ({
        name: 'authors',
        label: 'Autores',
      }),
    },
    {
      type: 'date',
      getProps: () => ({
        name: 'date',
        label: 'Data de Publicação',
        required: true,
        views: ['year', 'month'],
        format: 'MM/YYYY',
      }),
    },
    {
      type: 'text',
      getProps: () => ({
        name: 'link',
        label: 'Link (opcional)',
        placeholder: 'https://doi.org/exemplo',
      }),
    },
  ]

  return (
    <DialogForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={isEditMode ? 'Editar Publicação' : 'Adicionar Publicação'}
      description={
        isEditMode
          ? 'Atualize as informações da publicação.'
          : 'Insira os detalhes da nova publicação.'
      }
      schema={publicationSchema}
      values={publication}
      submitLabel={isEditMode ? 'Salvar' : 'Adicionar'}
      fields={fields}
    />
  )
}
