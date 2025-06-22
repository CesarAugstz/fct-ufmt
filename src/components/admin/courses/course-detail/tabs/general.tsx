'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormSelect } from '@/components/ui/form-fields/form-select'
import { FormTextarea } from '@/components/ui/form-fields/form-textarea'
import LoadingSpinner from '@/components/common/loading-spinner'
import { useFindUniqueCourse, useUpdateCourse } from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { CourseNature } from '@prisma/client'
import { formatToSlug } from '@/lib/formatters/slug.formatter'

import { FormMarkdown } from '@/components/ui/form-fields'
import { useAtomValue } from 'jotai'
import { courseSlugAtom } from '../../store/course.store'
import { useRouter } from 'next/navigation'
import { z } from '@/utils/zod'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  nature: z.enum([CourseNature.GRADUATION, CourseNature.POST_GRADUATION]),
  description: z.string().min(20),
  aboutContent: z.string().optional(),
})

type CourseFormValues = z.infer<typeof formSchema>

export default function CourseGeneralTab() {
  const toast = useToast()
  const slug = useAtomValue(courseSlugAtom)
  const router = useRouter()

  const { mutate: updateCourse, isPending } = useUpdateCourse()

  const { data: course } = useFindUniqueCourse(
    {
      where: { slug: slug! },
      select: {
        id: true,
        name: true,
        nature: true,
        description: true,
        aboutContent: true,
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
      aboutContent: course?.aboutContent || '',
    },
  })

  const onSubmit = async (values: CourseFormValues) => {
    updateCourse(
      {
        where: { slug: slug! },
        data: {
          name: values.name,
          nature: values.nature,
          description: values.description,
          slug: formatToSlug(values.name),
          aboutContent: values.aboutContent,
        },
      },
      {
        onSuccess: () => {
          if (slug !== formatToSlug(values.name)) {
            toast.success('Curso atualizado com sucesso! Redirecionando...')
            router.push(`/admin/courses/${formatToSlug(values.name)}`)
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
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 gap-y-4 md:space-y-0 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
              <FormText
                name="name"
                label="Nome do Curso"
                placeholder="Digite o nome do curso"
                required
              />

              <FormSelect
                name="nature"
                label="Tipo do Curso"
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
                className="md:col-span-2"
                name="description"
                label="Descrição"
                placeholder="Digite uma descrição para o curso"
                resize="none"
                rows={4}
              />

              <FormMarkdown
                className="md:col-span-2"
                name="aboutContent"
                label="Sobre o Curso"
                placeholder="Digite o conteúdo sobre o curso"
                rows={10}
                preview={true}
              />
            </div>

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
