'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/common/loading-spinner'
import { useFindUniqueCourse, useUpdateCourse } from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { revalidateCourses } from '@/lib/cache-revalidation'

import { FormBlockTextImage } from '@/components/ui/form-fields'
import { useAtomValue } from 'jotai'
import { courseSlugAtom } from '../../store/course.store'
import { z } from '@/utils/zod'
import FormGrid from '@/components/ui/form-fields/form-grid'
import { getBlockSchema } from '@/components/ui/form-fields/blocks/blocks.schema'

const formSchema = z.object({
  admissionContentBlocks: z.array(getBlockSchema()).optional(),
})

type CourseFormValues = z.infer<typeof formSchema>

export default function AdmissionTab() {
  const toast = useToast()
  const slug = useAtomValue(courseSlugAtom)

  const { mutate: updateCourse, isPending } = useUpdateCourse()

  const isLoading = isPending

  const { data: course } = useFindUniqueCourse(
    {
      where: { slug: slug! },
      select: {
        id: true,
        admissionContentBlocks: {
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
      admissionContentBlocks: course?.admissionContentBlocks || [],
    },
  })

  const onSubmit = async (values: CourseFormValues) => {
    console.log('submitting form', values)

    updateCourse(
      {
        where: { slug: slug! },
        data: {
          admissionContentBlocks: {
            upsert: values?.admissionContentBlocks
              ?.map((block, index) => ({ ...block, order: index }))
              .map(block => ({
                where: { id: block.id },
                update: {
                  ...block,
                  accordionItems: block.accordionItems || [],
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
                  accordionItems: block.accordionItems || [],
                  file: block.file ? { create: block.file } : undefined,
                },
              })),
          },
        },
      },
      {
        onSuccess: async () => {
          await revalidateCourses()
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
      <CardContent>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit, e =>
              console.log('error', e, methods.getValues()),
            )}
            className="space-y-6"
          >
            <FormGrid>
              <FormBlockTextImage
                span={4}
                name="admissionContentBlocks"
                className="md:col-span-4"
                label="Conteúdo em Blocos"
              />
            </FormGrid>

            <div className="flex justify-end">
              <Button type="submit" variant="default" disabled={isLoading}>
                {isLoading && <LoadingSpinner size="sm" />}
                Salvar Alterações
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}
