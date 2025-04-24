'use client'

import { BaseCard } from '@/components/ui/base-card'

export default function AdminPage() {
  return (
    <BaseCard
      title="Tela Inicial"
      emptyStateMessage='Nenhum componente adicionado. Clique em "Adicionar" para começar.'
      onAdd={() => console.log('Add Component')}
      onUpdate={() => console.log('Update Component')}
    >
      <div>Tela inicial </div>
    </BaseCard>
  )
}
