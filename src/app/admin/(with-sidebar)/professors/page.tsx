'use client'

import { useState } from 'react'
import ProfessorTable from '@/components/admin/professors/professor-table'
import ProfessorForm from '@/components/admin/professors/professor-form'
import { BaseCard } from '@/components/ui/base-card'
import { useFindManyProfessor } from '@/lib/zenstack-hooks'

export default function ProfessorsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProfId, setEditingProfId] = useState<string | undefined>()

  const {
    data: professors,
    isLoading,
    refetch,
  } = useFindManyProfessor({
    include: {
      user: true,
    },
  })

  const handleAddNew = () => {
    setEditingProfId(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (id: string) => {
    setEditingProfId(id)
    setIsFormOpen(true)
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    refetch()
  }

  return (
    <>
      <BaseCard
        title="Professores"
        description="Gerencie todos os professores a partir deste painel."
        onAdd={handleAddNew}
        onUpdate={refetch}
        loading={isLoading}
      >
        <ProfessorTable
          professors={professors || []}
          onRefresh={refetch}
          onClickEdit={handleEditClick}
        />
      </BaseCard>
      <ProfessorForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        professorId={editingProfId}
      />
    </>
  )
}
