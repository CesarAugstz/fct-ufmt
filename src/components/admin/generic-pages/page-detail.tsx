'use client'

import {
  useFindManySection,
  useFindUniqueGenericPage,
  useUpdateGenericPage,
} from '@/lib/zenstack-hooks'
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
import { revalidateGenericPages } from '@/lib/cache-revalidation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LoadingSpinner from '@/components/common/loading-spinner'
import { useRouter } from 'next/navigation'
import { FormSelect, FormText } from '@/components/ui/form-fields'
import { formatToSlug } from '@/lib/formatters/slug.formatter'

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  slug: z.string().optional(),
  contentBlocks: z.array(getBlockSchema()).optional(),
  sectionId: z.ulid().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface PageDetailProps {
  pageId: string
}

export default function PageDetail({ pageId }: PageDetailProps) {
  const toast = useToast()

  const { data: page, isLoading } = useFindUniqueGenericPage({
    where: { id: pageId },
    include: {
      contentBlocks: {
        include: { file: true },
        orderBy: { order: 'asc' },
      },
      section: {
        select: { id: true, title: true },
      },
    },
  })

  const { data: sections } = useFindManySection()

  const router = useRouter()

  const { updateContentBlocks, isLoading: isUpdatingBlocks } =
    useUpdateContentBlocks({ genericPageId: page?.id })

  const { mutateAsync: updateGenericPage, isPending: isUpdatingPage } =
    useUpdateGenericPage()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: {
      title: page?.title,
      description: page?.description ?? '',
      slug: page?.slug ?? '',
      sectionId: page?.sectionId,
      contentBlocks: page?.contentBlocks ?? [],
    },
  })

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await updateGenericPage({
          where: { id: pageId },
          data: {
            title: values.title,
            description: values.description,
            slug: values.slug,
            sectionId: values.sectionId,
          },
        })
        await updateContentBlocks(
          values.contentBlocks ?? [],
          page?.contentBlocks,
        )
        await revalidateGenericPages()

        toast.success('Página atualizada com sucesso!')
      } catch (error) {
        console.error('Error updating page:', error)
        toast.error('Erro ao atualizar página')
      }
    },
    [
      page?.contentBlocks,
      pageId,
      toast,
      updateContentBlocks,
      updateGenericPage,
    ],
  )

  const handleTitleChange = useCallback(
    (title: string) => {
      const formatted = formatToSlug(title)
      if (form.getValues('slug') === formatted) return

      form.setValue('slug', formatted)
    },
    [form],
  )

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Página não encontrada
        </h2>
        <p className="text-muted-foreground mb-4">
          A página que você está procurando não existe.
        </p>
        <Link href="/admin/generic-pages">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para páginas
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <BaseCard
      onBack={() => router.back()}
      title="Editar Página"
      description="Gerencie a página"
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
          <FormText
            onChange={e => handleTitleChange(e.target.value)}
            name="title"
            label="Título"
            required
            span={4}
          />
          <FormText name="slug" label="Slug" disabled span={4} />

          <FormSelect
            name="sectionId"
            label="Seção"
            required
            span={4}
            options={
              sections?.map(s => ({ value: s.id, label: s.title })) ?? []
            }
          />
          <FormBlocks
            name="contentBlocks"
            label="Conteúdo em Blocos"
            required
            span={4}
          />
        </Form>

        <FormButtons
          isSubmitting={isUpdatingBlocks || isUpdatingPage}
          onCancel={() => form.reset()}
          onSubmit={() => form.handleSubmit(onSubmit)()}
        />
      </FormProvider>
    </BaseCard>
  )
}
