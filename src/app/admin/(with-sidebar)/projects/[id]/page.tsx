import ProjectForm from '@/components/admin/projects/project-form'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProjectForm projectId={id} />
}
