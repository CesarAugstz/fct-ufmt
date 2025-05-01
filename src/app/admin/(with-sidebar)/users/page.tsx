'use client'

import { useState } from 'react'
import { useFindManyUser } from '@/lib/zenstack-hooks'
import UserTable from '@/components/admin/users/user-table'
import UserForm from '@/components/admin/users/user-form'

import { BaseCard } from '@/components/ui/base-card'

export default function UsersPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | undefined>()

  const { data: users, isLoading, refetch } = useFindManyUser({})

  const handleAddNew = () => {
    setEditingUserId(undefined)
    setIsFormOpen(true)
  }

  const handleEditClick = (id: string) => {
    setEditingUserId(id)
    setIsFormOpen(true)
  }

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    refetch()
  }

  return (
    <>
      <BaseCard
        title="Usuários"
        description="Gerencie todos os usuários a partir deste painel."
        onAdd={handleAddNew}
        onUpdate={refetch}
        loading={isLoading}
      >
        <UserTable
          users={users || []}
          onRefresh={refetch}
          onClickEdit={handleEditClick}
        />
      </BaseCard>
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        userId={editingUserId}
      />
    </>
  )
}
