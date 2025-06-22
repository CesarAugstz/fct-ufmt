import LoadingSpinner from '@/components/common/loading-spinner'
import { useMarkdown } from '@/lib/hooks/markdown'
import { useFindUniqueCourse } from '@/lib/zenstack-hooks'

interface CourseAboutTabProps {
  courseSlug: string
}

export default function CourseAboutTab({ courseSlug }: CourseAboutTabProps) {
  const { data: course, isLoading } = useFindUniqueCourse({
    where: { slug: courseSlug },
    select: { aboutContent: true },
  })

  const { markdownContent, loading, error } = useMarkdown(
    course?.aboutContent || '',
  )

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!course?.aboutContent) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Informações sobre o curso em breve...
        </p>
      </div>
    )
  }

  if (error) throw error

  return (
    <div className="prose dark:prose-invert prose-lg max-w-none">
      {markdownContent}
    </div>
  )
}
