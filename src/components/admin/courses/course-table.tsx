'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Badge } from '@/components/ui/badge'
import { Edit, MoreVertical, Trash } from 'lucide-react'
import { useState } from 'react'
import { useDeleteCourse } from '@/lib/zenstack-hooks'
import { dayJs } from '@/utils/dayjs'
import { Course, Professor, User } from '@zenstackhq/runtime/models'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { revalidateCourses } from '@/lib/cache-revalidation'

type CourseWithRelations = Course & {
  professors: (Professor & { user: User })[]
}

interface CourseTableProps {
  courses: CourseWithRelations[]
  onRefresh: () => void
  onClickEdit: (id: string) => void
}

export default function CourseTable({
  courses,
  onRefresh,
  onClickEdit,
}: CourseTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null)

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
          onSuccess: async () => {
            await revalidateCourses()
            onRefresh()
            setDeleteDialogOpen(false)
            setCourseToDelete(null)
          },
        },
      )
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo do Curso</TableHead>
            <TableHead>Última atualização</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                Nenhum curso encontrado
              </TableCell>
            </TableRow>
          ) : (
            courses.map(course => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {course.nature === 'GRADUATION'
                      ? 'Graduação'
                      : 'Pós-Graduação'}
                  </Badge>
                </TableCell>
                <TableCell>{dayJs(course.updatedAt).fromNow()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onClickEdit(course.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(course.id)}
                        className="text-destructive"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
