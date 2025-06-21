'use client'

import { useFindManyCourse } from '@/lib/zenstack-hooks'

import { useState } from 'react'
import { CourseNature } from '@prisma/client'
import LoadingSpinner from '@/components/common/loading-spinner'
import { CourseHeader } from './course-header'
import { CourseFilter } from './course-filter'
import { CourseCard } from './course-card'

export default function CoursesPage() {
  const [selectedFilter, setSelectedFilter] = useState<CourseNature | 'ALL'>(
    'ALL',
  )

  const { data: courses, isLoading } = useFindManyCourse({
    include: {
      professors: {
        include: {
          user: true,
        },
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

  const filteredCourses =
    courses?.filter(course => {
      if (selectedFilter === 'ALL') return true
      return course.nature === selectedFilter
    }) || []

  const graduationCount =
    courses?.filter(c => c.nature === CourseNature.GRADUATION).length || 0
  const postGraduationCount =
    courses?.filter(c => c.nature === CourseNature.POST_GRADUATION).length || 0

  return (
    <div className="container mx-auto px-4 py-8">
      <CourseHeader />

      <CourseFilter
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        graduationCount={graduationCount}
        postGraduationCount={postGraduationCount}
        totalCount={courses?.length || 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Nenhum curso encontrado para o filtro selecionado.
          </p>
        </div>
      )}
    </div>
  )
}
