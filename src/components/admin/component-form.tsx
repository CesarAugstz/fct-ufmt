import { useForm, Controller, Form, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormText } from '@/components/ui/form-fields/form-text'
import { Label } from '@/components/ui/label'
import LoadingSpinner from '@/components/common/loading-spinner'
import { ComponentFormValues } from '@/types/page-components'
import { FormSelect } from '../ui/form-fields/form-select'

const componentTypes = [
  { value: 'cardGroup', label: 'Grupo de Cards' },
  { value: 'banner', label: 'Banner' },
  { value: 'infoSection', label: 'Seção Informativa' },
]

const formSchema = z.object({
  type: z.string().min(1, { message: 'Tipo de componente é obrigatório' }),
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  description: z.string().optional(),
})

interface ComponentFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  isSubmitting: boolean
}

export function ComponentForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: ComponentFormProps) {
  const methods = useForm<ComponentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      title: '',
      description: '',
    },
  })

  const handleFormSubmit = (data: ComponentFormValues) => {
    const componentData = {
      id: Date.now().toString(),
      type: data.type,
      title: data.title,
      description: data.description,
      cards: data.type === 'cardGroup' ? [] : undefined,
    }
    onSubmit(componentData)
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Adicionar Novo Componente</DialogTitle>
      </DialogHeader>

      <FormProvider {...methods}>
        <Form>
          <FormFields />

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button
              onClick={methods.handleSubmit(handleFormSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting && <LoadingSpinner className="mr-2" />}
              Adicionar
            </Button>
          </div>
        </Form>
      </FormProvider>
    </DialogContent>
  )
}

function FormFields() {
  return (
    <>
      <div className="space-y-2">
        <FormSelect
          label="Tipo de Componente"
          name="type"
          options={componentTypes}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <FormText
          label="Título"
          name="title"
          placeholder="Título do componente"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição (opcional)</Label>
        <FormText
          label="Descrição"
          name="description"
          placeholder="Descrição breve"
        />
      </div>
    </>
  )
}
