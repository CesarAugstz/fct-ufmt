import { useFindUniqueCourse } from '@/lib/zenstack-hooks'
import { BlockContentRenderer } from '@/components/common/block-content-renderer'
import LoadingSpinner from '@/components/common/loading-spinner'

interface CourseAdmissionTabProps {
  courseSlug: string
}

export default function CourseAdmissionTab({
  courseSlug,
}: CourseAdmissionTabProps) {
  const { data: course, isLoading } = useFindUniqueCourse({
    where: { slug: courseSlug },
    select: {
      admissionContentBlocks: {
        include: { file: true },
        orderBy: { order: 'asc' },
      },
    },
  })

  if (!course) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Informações sobre ingresso em breve...
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <BlockContentRenderer
      blocks={course.admissionContentBlocks}
      className="prose dark:prose-invert prose-lg max-w-none"
    />
  )
}
