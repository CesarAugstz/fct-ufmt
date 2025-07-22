'use client'

import { useFindFirstManagement } from '@/lib/zenstack-hooks'
import { BaseCard } from '@/components/ui/base-card'
import { useToast } from '@/lib/hooks/toast'
import { Form, FormProvider, useForm } from 'react-hook-form'
import { FormBlocks } from '@/components/ui/form-fields/form-blocks'
import { z } from '@/utils/zod'
import { getBlockSchema } from '@/components/ui/form-fields/blocks/blocks.schema'
import { useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateContentBlocks } from '@/lib/hooks/update-content-blocks'
import FormButtons from '../form-buttons'
import { revalidateManagement } from '@/lib/cache-revalidation'

const formSchema = z.object({
  contentBlocks: z.array(getBlockSchema()).optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function Management() {
  const toast = useToast()

  const { data: management, isLoading } = useFindFirstManagement({
    include: {
      contentBlocks: {
        include: { file: true },
        orderBy: { order: 'asc' },
      },
    },
  })

  const { updateContentBlocks, isLoading: isUpdatingBlocks } =
    useUpdateContentBlocks({ managementId: management?.id })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: { contentBlocks: management?.contentBlocks ?? [] },
  })

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await updateContentBlocks(
          values.contentBlocks ?? [],
          management?.contentBlocks,
        )
        await revalidateManagement()

        toast.success('Gestão atualizada com sucesso!')
      } catch (error) {
        console.error('Error updating management:', error)
        toast.error('Erro ao atualizar gestão')
      }
    },
    [management?.contentBlocks, toast, updateContentBlocks],
  )

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <BaseCard
        title="Gestão"
        description="Gerencie a página de gestão a partir deste painel"
      >
        <FormProvider {...form}>
          <Form
            onSubmit={() =>
              form.handleSubmit(onSubmit, e =>
                console.log('error', e, form.getValues()),
              )()
            }
            className="space-y-6"
          >
            <FormBlocks
              name="contentBlocks"
              label="Conteúdo em Blocos"
              required
              span={4}
            />
          </Form>

          <FormButtons
            isSubmitting={isUpdatingBlocks}
            onCancel={() => form.reset()}
            onSubmit={() => form.handleSubmit(onSubmit)()}
          />
        </FormProvider>
      </BaseCard>
    </>
  )
}
