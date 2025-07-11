'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormSelect } from '@/components/ui/form-fields/form-select'
import LoadingSpinner from '@/components/common/loading-spinner'
import {
  useFindUniqueCourse,
  useUpdateCourse,
  useUpsertAttachment,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { CourseNature, Prisma } from '@prisma/client'
import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { revalidateCourses } from '@/lib/cache-revalidation'

import { FormBlockTextImage } from '@/components/ui/form-fields'
import { useAtomValue } from 'jotai'
import { courseSlugAtom } from '../../store/course.store'
import { useRouter } from 'next/navigation'
import { z } from '@/utils/zod'
import FormGrid from '@/components/ui/form-fields/form-grid'
import { getBlockSchema } from '@/components/ui/form-fields/blocks/blocks.schema'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  nature: z.enum([CourseNature.GRADUATION, CourseNature.POST_GRADUATION]),
  aboutContentBlocks: z.array(getBlockSchema()).optional(),
})

type CourseFormValues = z.infer<typeof formSchema>

export default function CourseGeneralTab() {
  const toast = useToast()
  const slug = useAtomValue(courseSlugAtom)
  const router = useRouter()

  const { mutateAsync: updateCourse, isPending } = useUpdateCourse()
  const { mutateAsync: upsertAttachment } = useUpsertAttachment()

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
    { enabled: !!slug },
  )

  const methods = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: course?.name ?? '',
      nature: course?.nature || CourseNature.GRADUATION,
      aboutContentBlocks: course?.aboutContentBlocks || [],
    },
  })

  const onSubmit = async (values: CourseFormValues) => {
    try {
      const blocksToDelete = course?.aboutContentBlocks
        ?.filter(
          block => !values.aboutContentBlocks?.find(b => b.id === block.id),
        )
        .map(block => block.id) as string[]

      const filesToCreate: Prisma.AttachmentCreateInput[] = []
      await updateCourse({
        where: { slug: slug! },
        data: {
          name: values.name,
          nature: values.nature,
          slug: formatToSlug(values.name),
          aboutContentBlocks: {
            deleteMany: { id: { in: blocksToDelete } },
            upsert: values?.aboutContentBlocks
              ?.map((block, index) => ({ ...block, order: index }))
              .map(block => {
                if (block.file) {
                  filesToCreate.push({
                    ...block.file,
                    contentBlocks: {
                      connect: { id: block.id },
                    },
                  })
                }
                return {
                  where: { id: block.id },
                  update: {
                    ...block,
                    accordionItems: block.accordionItems || [],
                    file: block.file
                      ? {
                          upsert: {
                            where: { id: block.file.id },
                            update: {},
                            create: {
                              ...block.file,
                            },
                          },
                        }
                      : undefined,
                  },
                  create: {
                    ...block,
                    accordionItems: block.accordionItems || [],
                    file: block.file ? { create: block.file } : undefined,
                  },
                }
              }),
          },
        },
      })
      await Promise.all(
        filesToCreate.map(file =>
          upsertAttachment({
            where: { id: file.id },
            update: {},
            create: { ...file } as any,
          }),
        ),
      )
      await revalidateCourses()
      if (slug !== formatToSlug(values.name)) {
        toast.success('Curso atualizado com sucesso! Redirecionando...')
        router.replace(`/admin/courses/${formatToSlug(values.name)}`)
        return
      }
      toast.success('Curso atualizado com sucesso!')
    } catch (error) {
      console.error('Course update error:', error)
      toast.error('Erro ao atualizar curso')
    }
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
