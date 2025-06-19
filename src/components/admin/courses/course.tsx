'use client'

import { useState } from 'react'
import CourseTable from './course-table'
import CourseForm from './course-form'
import { BaseCard } from '@/components/ui/base-card'
import { useFindManyCourse } from '@/lib/zenstack-hooks'

export default function Course() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCourseId, setEditingCourseId] = useState<string | undefined>()

  const {
    data: courses,
    isLoading,
    refetch,
  } = useFindManyCourse({
    include: {
      professors: {
        include: {
          user: true,
        },
      },
    },
  })

  const handleAddNew = () => {
    setEditingCourseId(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (id: string) => {
    setEditingCourseId(id)
    setIsFormOpen(true)
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    refetch()
  }

  return (
    <>
      <BaseCard
        title="Cursos"
        description="Gerencie todos os cursos a partir deste painel."
        onAdd={handleAddNew}
        onUpdate={refetch}
        loading={isLoading}
      >
        <CourseTable
          courses={courses || []}
          onRefresh={refetch}
          onClickEdit={handleEditClick}
        />
      </BaseCard>
      <CourseForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        courseId={editingCourseId}
      />
    </>
  )
}
