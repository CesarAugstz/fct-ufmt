'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash, UserPlus } from 'lucide-react'
import { useFindManyProfessor, useUpdateCourse } from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'

import ProfileImage from '@/components/common/profile-image'
import { useAtomValue } from 'jotai'
import { courseSlugAtom } from '../../store/course.store'
import AddProfessorsDialog from '../../forms/add-professors-dialog'

export default function CourseProfessorsTab() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const toast = useToast()
  const slug = useAtomValue(courseSlugAtom)

  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse()

  const { data: professors } = useFindManyProfessor(
    {
      where: {
        courses: {
          some: {
            slug: slug!,
          },
        },
      },
      include: {
        user: { select: { name: true, email: true } },
        courses: { select: { name: true } },
      },
    },
    { enabled: !!slug },
  )

  if (!slug) return null

  const handleRemoveProfessor = (professorId: string) => {
    updateCourse(
      {
        where: { slug },
        data: {
          professors: {
            disconnect: { id: professorId },
          },
        },
      },
      {
        onSuccess: () => {
          toast.success('Professor removido com sucesso!')
        },
        onError: error => {
          console.error('Error removing professor:', error)
          toast.error('Erro ao remover professor')
        },
      },
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Professores do Curso</CardTitle>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Professor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {professors?.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Nenhum professor vinculado ao curso
              </p>
              <p className="text-sm text-muted-foreground">
                Clique em "Adicionar Professor" para começar
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {professors?.map(professor => (
                <div
                  key={professor.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <ProfileImage
                      alt={professor.user.name || ''}
                      src={professor.image || undefined}
                      className="w-12 h-12"
                    />
                    <div>
                      <h3 className="font-medium">{professor.user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {professor.user.email}
                      </p>
                      {professor.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {professor.specialties.slice(0, 2).map(specialty => (
                            <Badge
                              key={specialty}
                              variant="secondary"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                          {professor.specialties.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{professor.specialties.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveProfessor(professor.id)}
                    disabled={isUpdating}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddProfessorsDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
    </>
  )
}
