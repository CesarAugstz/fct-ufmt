'use client'

import { useEffect, useState } from 'react'
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
import LoadingSpinner from '@/components/common/loading-spinner'
import {
  FormField,
  useRenderFormFields,
} from '@/lib/hooks/form/render-form-fields'

interface DialogFormProps<T extends z.ZodType<any, any>> {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: z.infer<T>) => Promise<void>
  fields: FormField[]
  title: string
  description?: string
  schema: T
  values?: Partial<z.infer<T>>
  isLoading?: boolean
  submitLabel?: string
  cancelLabel?: string
}

export default function DialogForm<T extends z.ZodType<any, any>>({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  schema,
  values,
  isLoading = false,
  fields,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
}: DialogFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    values: values ?? ({} as any),
  })

  useEffect(() => {
    if (isOpen) methods.reset({})
  }, [isOpen, values, methods])

  const formFields = useRenderFormFields({ fields })

  const handleSubmit = async (formValues: z.infer<T>) => {
    setIsSubmitting(true)
    try {
      await onSubmit(formValues)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {formFields}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  {cancelLabel}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <LoadingSpinner className="mr-2" />}
                  {submitLabel}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  )
}
