import { CourseDetailPage } from '@/components/home/courses/course-detail'

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <CourseDetailPage slug={slug} />
}
