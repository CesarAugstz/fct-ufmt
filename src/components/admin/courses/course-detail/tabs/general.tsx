'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormSelect } from '@/components/ui/form-fields/form-select'
import { FormTextarea } from '@/components/ui/form-fields/form-textarea'
import LoadingSpinner from '@/components/common/loading-spinner'
import {
  useDeleteManyAttachment,
  useDeleteManyContentBlock,
  useFindUniqueCourse,
  useUpdateCourse,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import {
  Alignment,
  BlockSize,
  ContentNature,
  CourseNature,
} from '@prisma/client'
import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { revalidateCourses } from '@/lib/cache-revalidation'

import { FormBlockTextImage } from '@/components/ui/form-fields'
import { useAtomValue } from 'jotai'
import { courseSlugAtom } from '../../store/course.store'
import { useRouter } from 'next/navigation'
import { z } from '@/utils/zod'
import FormGrid from '@/components/ui/form-fields/form-grid'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  nature: z.enum([CourseNature.GRADUATION, CourseNature.POST_GRADUATION]),
  description: z.string().min(20),
  aboutContentBlocks: z
    .array(
      z.object({
        id: z.string(),
        nature: z.enum(ContentNature),
        content: z.string().nullish(),
        caption: z.string().nullish(),
        size: z.enum(BlockSize).nullish(),
        alignment: z.enum(Alignment).nullish(),
        order: z.number().nullish(),
        file: z
          .object({
            id: z.ulid(),
            name: z.string(),
            dataUrl: z.string(),
            mimeType: z.string(),
            size: z.number(),
          })
          .nullish(),
      }),
    )
    .optional(),
})

type CourseFormValues = z.infer<typeof formSchema>

export default function CourseGeneralTab() {
  const toast = useToast()
  const slug = useAtomValue(courseSlugAtom)
  const router = useRouter()

  const { mutateAsync: deleteBlock } = useDeleteManyContentBlock()
  const { mutateAsync: deleteFile } = useDeleteManyAttachment()
  const { mutate: updateCourse, isPending } = useUpdateCourse()

  const { data: course } = useFindUniqueCourse(
    {
      where: { slug: slug! },
      select: {
        id: true,
        name: true,
        nature: true,
        description: true,
        aboutContentBlocks: {
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
    { enabled: !!slug },
  )

  const methods = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: course?.name ?? '',
      nature: course?.nature || CourseNature.GRADUATION,
      description: course?.description || '',
      aboutContentBlocks: course?.aboutContentBlocks || [],
    },
  })

  const onSubmit = async (values: CourseFormValues) => {
    console.log('submitting form', values)
    await deleteBlock({
      where: {
        courseId: course?.id,
        NOT: {
          id: { in: values.aboutContentBlocks?.map(block => block.id) },
        },
      },
    })

    await deleteFile({
      where: {
        id: {
          in:
            (values.aboutContentBlocks
              ?.filter(block => !!block.file)
              .map(block => block.file?.id)
              .filter(id => !!id) as string[]) || undefined,
        },
      },
    })

    updateCourse(
      {
        where: { slug: slug! },
        data: {
          name: values.name,
          nature: values.nature,
          description: values.description,
          slug: formatToSlug(values.name),
          aboutContentBlocks: {
            upsert: values?.aboutContentBlocks
              ?.map((block, index) => ({ ...block, order: index }))
              .map(block => ({
                where: { id: block.id },
                update: {
                  ...block,
                  file: block.file
                    ? {
                        create: {
                          ...block.file,
                        },
                      }
                    : undefined,
                },
                create: {
                  ...block,
                  file: block.file ? { create: block.file } : undefined,
                },
              })),
          },
        },
      },
      {
        onSuccess: async () => {
          await revalidateCourses()
          if (slug !== formatToSlug(values.name)) {
            toast.success('Curso atualizado com sucesso! Redirecionando...')
            router.replace(`/admin/courses/${formatToSlug(values.name)}`)
            return
          }
          toast.success('Curso atualizado com sucesso!')
        },
        onError: error => {
          console.error('Course update error:', error)
          toast.error('Erro ao atualizar curso')
        },
      },
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações Gerais</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit, e =>
              console.log('error', e, methods.getValues()),
            )}
            className="space-y-6"
          >
            <FormGrid>
              <FormText
                name="name"
                label="Nome do Curso"
                placeholder="Digite o nome do curso"
                className="md:col-span-2"
                required
              />

              <FormSelect
                name="nature"
                label="Tipo do Curso"
                className="md:col-span-2"
                placeholder="Selecione o tipo"
                options={[
                  { value: CourseNature.GRADUATION, label: 'Graduação' },
                  {
                    value: CourseNature.POST_GRADUATION,
                    label: 'Pós-Graduação',
                  },
                ]}
                required
              />

              <FormTextarea
                name="description"
                label="Descrição"
                className="md:col-span-4"
                placeholder="Digite uma descrição para o curso"
                resize="none"
                rows={4}
              />

              <FormBlockTextImage
                span={4}
                name="aboutContentBlocks"
                className="md:col-span-4"
                label="Conteúdo em Blocos"
              />
            </FormGrid>

            <div className="flex justify-end">
              <Button type="submit" variant="default" disabled={isPending}>
                {isPending && <LoadingSpinner className="mr-2 h-4 w-4" />}
                Salvar Alterações
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}
