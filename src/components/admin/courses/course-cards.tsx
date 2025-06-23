'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit, MoreVertical, Trash, Users, Calendar } from 'lucide-react'
import { useState } from 'react'
import { useDeleteCourse } from '@/lib/zenstack-hooks'
import { dayJs } from '@/utils/dayjs'
import { Course, Professor, User } from '@zenstackhq/runtime/models'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useRouter } from 'next/navigation'

type CourseWithRelations = Course & {
  professors: (Professor & { user: User })[]
}

interface CourseCardsProps {
  courses: CourseWithRelations[]
  onRefresh: () => void
  onClickEdit: (id: string) => void
}

export default function CourseCards({
  courses,
  onRefresh,
  onClickEdit,
}: CourseCardsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null)
  const router = useRouter()

  const { mutate: deleteCourse } = useDeleteCourse()

  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (courseToDelete) {
      deleteCourse(
        { where: { id: courseToDelete } },
        {
          onSuccess: () => {
            onRefresh()
            setDeleteDialogOpen(false)
            setCourseToDelete(null)
          },
        },
      )
    }
  }

  const handleCardClick = (slug: string) => {
    router.push(`/admin/courses/${slug}`)
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum curso encontrado</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card
            key={course.id}
            className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            onClick={() => handleCardClick(course.slug)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge
                  variant={
                    course.nature === 'GRADUATION' ? 'default' : 'secondary'
                  }
                  className="mb-2"
                >
                  {course.nature === 'GRADUATION'
                    ? 'Graduação'
                    : 'Pós-Graduação'}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={e => {
                        e.stopPropagation()
                        onClickEdit(course.id)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={e => {
                        e.stopPropagation()
                        handleDeleteClick(course.id)
                      }}
                      className="text-destructive"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-xl leading-tight">
                {course.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {course.description && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {course.description}
                </p>
              )}
              <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.professors.length} professores</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{dayJs(course.updatedAt).fromNow()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Tem certeza?"
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente o curso."
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </>
  )
}
