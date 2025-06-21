'use client'

import { notFound } from 'next/navigation'
import { CourseHeader, CourseTabs } from './'
import { useCourseData } from './hooks/use-course-data'
import LoadingSpinner from '@/components/common/loading-spinner'

interface CourseDetailPageProps {
  slug: string
}

export default function CourseDetailPage({ slug }: CourseDetailPageProps) {
  const { course, isLoading, error } = useCourseData(slug)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (error) {
    console.error('Course loading error:', error)
    return notFound()
  }

  if (!course) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <CourseHeader course={course as any} />
      <CourseTabs courseSlug={slug} />
    </div>
  )
}
