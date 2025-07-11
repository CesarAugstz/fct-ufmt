import LoadingSpinner from '@/components/common/loading-spinner'
import { BlockContentRenderer } from '@/components/common/block-content-renderer'
import { useFindUniqueCourse } from '@/lib/zenstack-hooks'

interface CourseAboutTabProps {
  courseSlug: string
}

export default function CourseAboutTab({ courseSlug }: CourseAboutTabProps) {
  const { data: course, isLoading } = useFindUniqueCourse({
    where: { slug: courseSlug },
    select: {
      aboutContentBlocks: {
        include: { file: true },
        orderBy: { order: 'asc' },
      },
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!course?.aboutContentBlocks?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Informações sobre o curso em breve...
        </p>
      </div>
    )
  }

  return (
    <BlockContentRenderer
      blocks={course.aboutContentBlocks}
      className="prose dark:prose-invert prose-lg max-w-none"
    />
  )
}
