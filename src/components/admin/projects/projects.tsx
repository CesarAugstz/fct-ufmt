'use client'
import { BaseCard } from '@/components/ui/base-card'
import ProjectCards from './project-cards'
import { useCallback, useState } from 'react'
import { useDeleteProject, useFindManyProject } from '@/lib/zenstack-hooks'
import ProjectAddModal from './project-add-modal'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useToast } from '@/lib/hooks/toast'
import { useRouter } from 'next/navigation'
import { revalidateProjects } from '@/lib/cache-revalidation'

interface ProjectsProps {
  className?: string
}

export default function Projects({ className }: ProjectsProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(
    null,
  )
  const toast = useToast()
  const router = useRouter()

  const { data: projects, isLoading } = useFindManyProject()
  const { mutateAsync: deleteProject, isPending: isDeleting } =
    useDeleteProject()

  const handleDelete = useCallback((id: string) => {
    setProjectIdToDelete(id)
  }, [])
  const handleDeleteConfirm = useCallback(async () => {
    if (!projectIdToDelete) return
    try {
      await deleteProject({ where: { id: projectIdToDelete } })
      toast.success('Projeto excluído com sucesso!')
    } catch (error) {
      toast.exception(error, 'Erro ao excluir projeto')
    } finally {
      setProjectIdToDelete(null)
      await revalidateProjects()
    }
  }, [deleteProject, projectIdToDelete, toast])

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`projects/${id}`)
    },
    [router],
  )

  const handleAdd = () => {
    setIsAddModalOpen(true)
  }

  return (
    <>
      <BaseCard
        title="Projetos"
        description="Gerencie os projetos de pesquisa e extensão"
        onAdd={handleAdd}
        className={className}
      >
        <ProjectCards
          projects={projects ?? []}
          loading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </BaseCard>

      <ProjectAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <ConfirmDialog
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        variant="destructive"
        open={projectIdToDelete !== null}
        title="Confirmar"
        description="Tem certeza que deseja excluir este projeto?"
      />
    </>
  )
}
