import Configure from '@/components/admin/professors/configure/configure'
import { getServerAuthSession } from '@/server/auth'
import { db } from '@/server/db'
import { Course, Professor } from '@zenstackhq/runtime/models'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerAuthSession()
  const userId = session?.user.id

  if (!userId) return redirect('/login')

  const professor = await db.professor.findFirst({
    where: { user: { id: userId } },
    include: { user: true },
  })

  if (!professor) return redirect('/admin/professors')

  return (
    <Configure professor={professor as unknown as ProfessorWithRelations} />
  )
}

export type ProfessorWithRelations = Professor & {
  user: {
    email: string
    name: string
  }
  courses: Course[]
}
