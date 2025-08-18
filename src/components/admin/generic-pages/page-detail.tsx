'use client'

import { useFindUniqueGenericPage } from '@/lib/zenstack-hooks'
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
import { Badge } from '@/components/ui/badge'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LoadingSpinner from '@/components/common/loading-spinner'

const formSchema = z.object({
  contentBlocks: z.array(getBlockSchema()).optional(),
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

  const { updateContentBlocks, isLoading: isUpdatingBlocks } =
    useUpdateContentBlocks({ genericPageId: page?.id })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: { contentBlocks: page?.contentBlocks ?? [] },
  })

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
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
    [page?.contentBlocks, toast, updateContentBlocks],
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
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/generic-pages">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {page.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{page.section.title}</Badge>
                <code className="bg-muted px-2 py-1 rounded text-sm">
                  /{page.slug}
                </code>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link
              href={`/pages/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
            </Link>
          </div>
        </div>

        {page.description && (
          <p className="text-muted-foreground">{page.description}</p>
        )}

        {/* Content Blocks Form */}
        <BaseCard
          title="Conteúdo da Página"
          description="Gerencie o conteúdo desta página através dos blocos abaixo"
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
      </div>
    </>
  )
}
