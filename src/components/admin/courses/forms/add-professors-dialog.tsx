'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Search } from 'lucide-react'
import {
  useInfiniteFindManyProfessor,
  useUpdateCourse,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import LoadingSpinner from '@/components/common/loading-spinner'
import ProfileImage from '@/components/common/profile-image'
import { useDebounce } from '@/hooks/use-debounce'
import { useAtomValue } from 'jotai'
import { courseSlugAtom } from '../store/course.store'

interface AddProfessorsDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddProfessorsDialog({
  isOpen,
  onOpenChange,
}: AddProfessorsDialogProps) {
  const [selectedProfessors, setSelectedProfessors] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const toast = useToast()
  const slug = useAtomValue(courseSlugAtom)

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const fetchArgs = {
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      user: {
        name: 'asc',
      },
    },
    where: {
      OR: [
        {
          user: {
            name: { contains: debouncedSearchTerm, mode: 'insensitive' },
          },
        },
        {
          user: {
            email: { contains: debouncedSearchTerm, mode: 'insensitive' },
          },
        },
      ],
      courses: {
        none: {
          slug: slug!,
        },
      },
    },
    take: 10,
  }

  const {
    data: professors,
    fetchNextPage: loadMoreProfessors,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteFindManyProfessor(
    {
      ...fetchArgs,
      orderBy: {
        user: {
          name: 'asc',
        },
      },
      where: {
        OR: [
          {
            user: {
              name: { contains: debouncedSearchTerm, mode: 'insensitive' },
            },
          },
          {
            user: {
              email: { contains: debouncedSearchTerm, mode: 'insensitive' },
            },
          },
        ],
        courses: {
          none: {
            slug: slug!,
          },
        },
      },
    },
    {
      enabled: !!slug,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 10) return undefined
        const fetched = pages.flatMap(page => page).length
        return {
          ...fetchArgs,
          skip: fetched,
        }
      },
    },
  )

  const professorsData = useMemo(() => {
    return professors?.pages?.flatMap(professor => professor) ?? []
  }, [professors])

  const { mutate: updateCourse } = useUpdateCourse()

  if (!slug) return null

  const handleAddProfessors = () => {
    if (selectedProfessors.length === 0) return

    setIsUpdating(true)

    updateCourse(
      {
        where: { slug: slug! },
        data: {
          professors: {
            connect: selectedProfessors.map(id => ({ id })),
          },
        },
      },
      {
        onSuccess: () => {
          toast.success('Professores adicionados com sucesso!')
          handleClose()
          setIsUpdating(false)
        },
        onError: error => {
          console.error('Error adding professors:', error)
          toast.error('Erro ao adicionar professores')
          setIsUpdating(false)
        },
      },
    )
  }

  const handleClose = () => {
    onOpenChange(false)
    setSelectedProfessors([])
    setSearchTerm('')
  }

  const handleProfessorToggle = (professorId: string, checked: boolean) => {
    if (checked) {
      setSelectedProfessors(prev => [...prev, professorId])
    } else {
      setSelectedProfessors(prev => prev.filter(id => id !== professorId))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Professores</DialogTitle>
          <DialogDescription>
            Selecione os professores que deseja adicionar ao curso.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar professores por nome, email ou especialidade..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {isFetching && professorsData.length === 0 ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner className="h-6 w-6" />
            </div>
          ) : professorsData?.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {debouncedSearchTerm.trim()
                ? 'Nenhum professor encontrado para a busca'
                : 'Nenhum professor disponível para adicionar'}
            </p>
          ) : (
            <div className="max-h-96 overflow-y-auto space-y-2">
              {professorsData?.map(professor => (
                <div
                  key={professor.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={selectedProfessors.includes(professor.id)}
                    onCheckedChange={checked =>
                      handleProfessorToggle(professor.id, !!checked)
                    }
                  />
                  <ProfileImage
                    alt={professor.user.name || ''}
                    imageId={professor.imageId}
                    className="w-10 h-10"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{professor.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {professor.user.email}
                    </p>
                    {professor.specialties.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {professor.specialties.slice(0, 3).join(', ')}
                        {professor.specialties.length > 3 && '...'}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {hasNextPage && !isFetchingNextPage && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => loadMoreProfessors()}
                  disabled={isFetchingNextPage}
                >
                  Carregar mais
                </Button>
              )}
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <LoadingSpinner className="h-6 w-6" />
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddProfessors}
              disabled={selectedProfessors.length === 0 || isUpdating}
            >
              {isUpdating && <LoadingSpinner className="mr-2 h-4 w-4" />}
              Adicionar ({selectedProfessors.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
