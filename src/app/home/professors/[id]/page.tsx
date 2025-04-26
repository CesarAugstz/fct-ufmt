import ProfessorDetail from '@/components/home/professors/professor-detail'

export default function ProfessorPage({ params }: { params: { id: string } }) {
  return <ProfessorDetail id={params.id} />
}
