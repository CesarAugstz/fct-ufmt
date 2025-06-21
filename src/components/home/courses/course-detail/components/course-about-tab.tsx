import { useCourseAbout } from '../hooks/use-course-data'

interface CourseAboutTabProps {
  courseSlug: string
}

export default function CourseAboutTab({ courseSlug }: CourseAboutTabProps) {
  const { aboutContent } = useCourseAbout(courseSlug)

  if (!aboutContent) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Informações sobre o curso em breve...
        </p>
      </div>
    )
  }

  return (
    <div className="prose prose-lg max-w-none">
      <div
        dangerouslySetInnerHTML={{ __html: aboutContent }}
        className="text-foreground leading-relaxed"
      />
    </div>
  )
}
