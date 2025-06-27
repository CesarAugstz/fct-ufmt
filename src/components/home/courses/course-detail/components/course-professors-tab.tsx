'use client'

import LoadingSpinner from '@/components/common/loading-spinner'
import { ProfessorCard } from '@/components/home/professors'
import { useFindManyProfessor } from '@/lib/zenstack-hooks'

interface CourseProfessorsTabProps {
  courseSlug: string
}

export default function CourseProfessorsTab({
  courseSlug,
}: CourseProfessorsTabProps) {
  const { isLoading, data: professors = [] } = useFindManyProfessor({
    where: {
      courses: {
        some: {
          slug: courseSlug,
        },
      },
    },
    include: {
      user: true,
      courses: true,
      image: { select: { id: true } },
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!professors.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhum professor encontrado para este curso.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="divide-y divide-gray-200">
        {professors.map((professor, index) => (
          <ProfessorCard
            key={professor.id}
            professor={professor}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
