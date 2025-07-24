'use client'

import { getBlockSchema } from '@/components/ui/form-fields/blocks/blocks.schema'
import { FormBlocks } from '@/components/ui/form-fields/form-blocks'
import { contentBlocksPrismaSelection } from '@/lib/blocks/content-blocks-prisma-selection'
import { useToast } from '@/lib/hooks/toast'
import { useUpdateContentBlocks } from '@/lib/hooks/update-content-blocks'
import { useFindUniqueProject, useUpdateProject } from '@/lib/zenstack-hooks'
import { z } from '@/utils/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProjectType } from '@prisma/client'
import { useCallback } from 'react'
import { Form, FormProvider, useForm } from 'react-hook-form'
import FormButtons from '../form-buttons'
import { FormSelect, FormText, FormTextarea } from '@/components/ui/form-fields'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormGrid from '@/components/ui/form-fields/form-grid'
import { useRouter } from 'next/navigation'

const projectSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().nullish(),
  type: z.enum(ProjectType),
  contentBlocks: z.array(getBlockSchema()).optional(),
})
type ProjectSchema = z.infer<typeof projectSchema>

interface ProjectFormProps {
  className?: string
  projectId?: string
}
export default function ProjectForm({
  className,
  projectId,
}: ProjectFormProps) {
  const toast = useToast()
  const router = useRouter()
  const { data: project } = useFindUniqueProject(
    {
      where: { id: projectId },
      include: { contentBlocks: contentBlocksPrismaSelection },
    },
    { enabled: !!projectId },
  )
  const { mutateAsync: updateProject, isPending: isUpdatingProject } =
    useUpdateProject()
  const { updateContentBlocks, isLoading: isUpdatingContentBlocks } =
    useUpdateContentBlocks({ projectId })

  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    values: {
      title: project?.title ?? '',
      type: project?.type ?? ProjectType.RESEARCH,
      description: project?.description,
      contentBlocks: project?.contentBlocks ?? [],
    },
  })

  const handleSubmit = useCallback(
    async (values: ProjectSchema) => {
      try {
        await updateProject({
          where: { id: projectId },
          data: {
            title: values.title,
            type: values.type,
            description: values.description,
          },
        })
        await updateContentBlocks(
          values.contentBlocks ?? [],
          project?.contentBlocks,
        )
        toast.success('Projeto salvo com sucesso')
        router.push('/admin/projects')
      } catch (e) {
        console.error(e)
        toast.exception(e)
      }
    },
    [
      project?.contentBlocks,
      projectId,
      router,
      toast,
      updateContentBlocks,
      updateProject,
    ],
  )

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Projeto - {project?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form
            onSubmit={() =>
              form.handleSubmit(handleSubmit, e =>
                console.log('error', e, form.getValues()),
              )()
            }
            className="space-y-6"
          >
            <FormGrid>
              <FormText name="title" label="Título" required span={3} />
              <FormSelect
                name="type"
                label="Tipo"
                required
                options={[
                  { label: 'Pesquisa', value: ProjectType.RESEARCH },
                  { label: 'Extensão', value: ProjectType.EXTENSION },
                ]}
              />
              <FormTextarea name="description" label="Descrição" span={4} />
              <FormBlocks
                name="contentBlocks"
                label="Conteúdo em Blocos"
                required
                span={4}
              />
            </FormGrid>
          </Form>

          <FormButtons
            isSubmitting={isUpdatingContentBlocks || isUpdatingProject}
            onCancel={() => form.reset()}
            onSubmit={() => form.handleSubmit(handleSubmit)()}
          />
        </FormProvider>
      </CardContent>
    </Card>
  )
}
