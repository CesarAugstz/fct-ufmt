import ProfessorDetail from '@/components/home/professors/professor-detail'

export default async function ProfessorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProfessorDetail id={id} />
}
