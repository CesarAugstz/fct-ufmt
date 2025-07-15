'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from '@/utils/zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormSelect } from '@/components/ui/form-fields/form-select'
import { FormTextarea } from '@/components/ui/form-fields/form-textarea'
import { FormSwitch } from '@/components/ui/form-fields/form-switch'
import FormGrid from '@/components/ui/form-fields/form-grid'
import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { revalidateNews } from '@/lib/cache-revalidation'
import {
  useCreateNews,
  useUpdateNews,
  useFindManyNewsCategory,
  useFindUniqueNews,
  useUpsertAttachment,
} from '@/lib/zenstack-hooks'
import type { NewsStatus, Prisma } from '@prisma/client'
import { FormBlockTextImage } from '@/components/ui/form-fields'
import { getBlockSchema } from '@/components/ui/form-fields/blocks/blocks.schema'
import { FormFile } from '@/components/ui/form-fields/form-file'
import { ulid } from 'ulidx'

const newsFormSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  excerpt: z.string().optional(),
  author: z.string().min(1, 'Autor é obrigatório'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const),
  isPinned: z.boolean(),
  contentBlocks: z.array(getBlockSchema()).optional(),
  featuredImage: z.object(
    {
      id: z.ulid(),
      name: z.string(),
      dataUrl: z.string(),
      mimeType: z.string(),
      size: z.number(),
    },
    { message: 'Imagem de capa é obrigatória' },
  ),
})

type NewsFormData = z.infer<typeof newsFormSchema>

interface NewsFormProps {
  id?: string
}
export function NewsForm({ id }: NewsFormProps) {
  const router = useRouter()
  const { mutateAsync: upsertAttachment } = useUpsertAttachment()
  const { data: categories = [] } = useFindManyNewsCategory({
    orderBy: { name: 'asc' },
  })
  const { data: news } = useFindUniqueNews(
    {
      where: { id: id! },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        author: true,
        categoryId: true,
        status: true,
        isPinned: true,
        featuredImage: {
          select: {
            id: true,
            name: true,
            dataUrl: true,
            mimeType: true,
            size: true,
          },
        },
        contentBlocks: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            nature: true,
            content: true,
            caption: true,
            size: true,
            alignment: true,
            fileId: true,
            order: true,
            withBorder: true,
            accordionItems: true,
            gridSize: true,
            file: {
              select: {
                id: true,
                name: true,
                dataUrl: true,
                mimeType: true,
                size: true,
              },
            },
          },
        },
      },
    },
    { enabled: !!id },
  )

  const createNews = useCreateNews()
  const updateNews = useUpdateNews()

  const form = useForm<NewsFormData>({
    resolver: zodResolver(newsFormSchema),
    values: {
      title: news?.title ?? '',
      slug: news?.slug ?? '',
      excerpt: news?.excerpt ?? '',
      author: news?.author ?? '',
      categoryId: news?.categoryId ?? '',
      contentBlocks: news?.contentBlocks ?? [],
      status: (news?.status as NewsStatus) ?? 'DRAFT',
      isPinned: news?.isPinned ?? false,
      featuredImage: (news?.featuredImage ??
        null) as NewsFormData['featuredImage'],
    },
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    form.setValue('title', title)
    if (!id || !news?.slug) {
      const slug = formatToSlug(title)
      form.setValue('slug', slug)
    }
  }

  const onSubmit = async (data: NewsFormData) => {
    try {
      const blocksToDelete = news?.contentBlocks
        ?.filter(block => !data.contentBlocks?.find(b => b.id === block.id))
        .map(block => block.id) as string[]

      const filesToCreate: Prisma.AttachmentCreateInput[] = []

      if (!id) {
        const created = await createNews.mutateAsync({
          data: {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            author: data.author,
            categoryId: data.categoryId,
            status: data.status,
            isPinned: data.isPinned,
            contentBlocks: {
              create: data?.contentBlocks
                ?.map((block, index) => ({ ...block, order: index }))
                .map(block => ({
                  ...block,
                  accordionItems: block.accordionItems || [],
                  file: block.file ? { create: block.file } : undefined,
                })),
            },
          },
        })
        filesToCreate.push({
          ...data.featuredImage,
          newsFeaturedImage: { connect: { id: created?.id } },
        })
      } else if (news) {
        await updateNews.mutateAsync({
          where: { id: news.id },
          data: {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            author: data.author,
            category: { connect: { id: data.categoryId } },
            status: data.status,
            isPinned: data.isPinned,
            featuredImage: {
              upsert: {
                where: { id: news.featuredImage?.id ?? ulid() },
                update: {},
                create: data.featuredImage,
              },
            },
            contentBlocks: {
              deleteMany: { id: { in: blocksToDelete } },
              upsert: data?.contentBlocks
                ?.map((block, index) => ({ ...block, order: index }))
                .map(block => {
                  if (block.file) {
                    filesToCreate.push({
                      ...block.file,
                      contentBlocks: { connect: { id: block.id } },
                    })
                  }
                  return {
                    where: { id: block.id },
                    update: {
                      ...block,
                      accordionItems: block.accordionItems || [],
                      file: undefined,
                    },
                    create: {
                      ...block,
                      accordionItems: block.accordionItems || [],
                      file: undefined,
                    },
                  }
                }),
            },
          },
        })
      }
      console.log('filesToCreate', filesToCreate)
      await Promise.all(
        filesToCreate.map(file =>
          upsertAttachment({
            where: { id: file.id! },
            update: {},
            create: {
              id: file.id!,
              name: file.name,
              dataUrl: file.dataUrl,
              mimeType: file.mimeType,
              size: file.size,
              ...(file?.newsFeaturedImage?.connect?.id
                ? {
                    newsFeaturedImage: {
                      connect: { id: file.newsFeaturedImage.connect.id! },
                    },
                  }
                : undefined),
              ...(file?.contentBlocks?.connect?.id
                ? {
                    contentBlocks: {
                      connect: { id: file.contentBlocks.connect.id! },
                    },
                  }
                : undefined),
            },
          }),
        ),
      )
      toast.success('Notícia salva com sucesso')
      await revalidateNews()
      router.push('/admin/news')
    } catch (error) {
      console.error('Erro ao salvar notícia:', error)
      toast.error('Erro ao salvar notícia')
    }
  }

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }))

  const statusOptions = [
    { value: 'DRAFT' as const, label: 'Rascunho' },
    { value: 'PUBLISHED' as const, label: 'Publicado' },
    { value: 'ARCHIVED' as const, label: 'Arquivado' },
  ]

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{!id ? 'Criar Nova Notícia' : 'Editar Notícia'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormGrid>
              <FormText
                name="title"
                label="Título"
                placeholder="Digite o título da notícia"
                onChange={handleTitleChange}
                required
              />

              <FormText
                name="slug"
                label="Slug"
                placeholder="slug-da-noticia"
                required
              />

              <FormFile
                span={2}
                name="featuredImage"
                label="Imagem de capa"
                accept="image/*"
              />

              <FormTextarea
                name="excerpt"
                label="Resumo"
                placeholder="Breve descrição da notícia"
                span={6}
                rows={3}
              />

              <FormText
                name="author"
                label="Autor"
                placeholder="Nome do autor"
                required
              />

              <FormSelect
                name="categoryId"
                label="Categoria"
                placeholder="Selecione uma categoria"
                options={categoryOptions}
                required
              />

              <FormSelect
                name="status"
                label="Status"
                options={statusOptions}
                required
              />

              <FormSwitch
                name="isPinned"
                label="Destacar notícia"
                description="Notícias destacadas aparecem no topo da lista"
              />

              <FormBlockTextImage
                span={6}
                name="contentBlocks"
                className="md:col-span-4"
                label="Conteúdo da notícia"
              />
            </FormGrid>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={createNews.isPending || updateNews.isPending}
                variant="default"
              >
                {!id ? 'Criar Notícia' : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
