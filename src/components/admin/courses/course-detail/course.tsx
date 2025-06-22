'use client'

import { useParams, useRouter } from 'next/navigation'
import { useFindUniqueCourse } from '@/lib/zenstack-hooks'
import LoadingSpinner from '@/components/common/loading-spinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { courseSlugAtom } from '../store/course.store'
import Header from './header'
import CourseDetailTabs from './tabs'

export default function CourseDetail() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const setCourseSlug = useSetAtom(courseSlugAtom)

  useEffect(() => {
    setCourseSlug(slug)
  }, [setCourseSlug, slug])

  const { data: course, isLoading } = useFindUniqueCourse({
    where: { slug },
    select: {
      name: true,
      nature: true,
      description: true,
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Curso não encontrado</p>
        <Button onClick={() => router.back()} className="mt-4">
          Voltar
        </Button>
      </div>
    )
  }

  return (
    <Card className="space-y-6">
      <CardHeader className="flex gap-2">
        <Header />
      </CardHeader>

      <CardContent>
        <CourseDetailTabs />
      </CardContent>
    </Card>
  )
}
