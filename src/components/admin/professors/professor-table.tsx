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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Edit, MoreVertical, Trash } from 'lucide-react'
import { useState } from 'react'
import { useDeleteUser } from '@/lib/zenstack-hooks'
import { dayJs } from '@/utils/dayjs'
import { Course } from '@prisma/client'
import { CourseMapper } from '@/utils/mappers/course.mapper'

interface ProfessorWithRelations {
  courses: Course[]
  id: string
  user: {
    email: string
    name?: string | null
  }
  createdAt: Date
  updatedAt: Date
}

interface ProfessorTableProps {
  professors: ProfessorWithRelations[]
  onRefresh: () => void
  onClickEdit: (id: string) => void
}

export default function ProfessorTable({
  professors,
  onRefresh,
  onClickEdit,
}: ProfessorTableProps) {
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const { mutate: deleteUser } = useDeleteUser()

  const handleDelete = () => {
    if (!userToDelete) return

    deleteUser(
      {
        where: { id: userToDelete },
      },
      {
        onSuccess: () => {
          setUserToDelete(null)
          onRefresh()
        },
      },
    )
  }

  if (professors.length === 0) {
    return <div className="text-center py-4">Nenhum professor encontrado</div>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Cursos</TableHead>
            <TableHead>Última atualização</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {professors.map(professor => (
            <TableRow key={professor.id}>
              <TableCell>{professor.user.name}</TableCell>
              <TableCell>{professor.user.email}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {professor.courses?.map(course => (
                    <Badge key={course} variant="secondary">
                      {CourseMapper.getCourseLabel(course)}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{dayJs(professor.updatedAt).fromNow()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onClickEdit(professor.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setUserToDelete(professor.id)}
                      className="text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o
              professor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
