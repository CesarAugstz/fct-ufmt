'use client'

import PersonalizationForm from './forms/personalization-form'
import {
  usePersonalizationStore,
  PersonalizationColors,
} from '@/store/personalization-store'
import {
  useFindFirstPersonalization,
  useUpsertPersonalization,
} from '@/lib/zenstack-hooks/personalization'
import { toast } from 'sonner'
import LoadingSpinner from '@/components/common/loading-spinner'
import { mapPersonalizationToColors } from '@/utils/mappers/personalization-mapper'

export default function PersonalizationAdmin() {
  const { setColors, applyColors } = usePersonalizationStore()

  const { data: personalization, isLoading } = useFindFirstPersonalization()

  const { mutate: upsertPersonalization } = useUpsertPersonalization({
    onSuccess: data => {
      if (data) {
        const colors = mapPersonalizationToColors(data)
        setColors(colors)
        applyColors()
        toast.success('Personalização salva com sucesso!')
      }
    },
    onError: error => {
      console.error('Erro ao salvar personalização:', error)
      toast.error('Erro ao salvar personalização')
    },
  })

  const handleFormSuccess = (data: PersonalizationColors) => {
    upsertPersonalization({
      where: { id: personalization?.id || 'default' },
      update: {
        ...data,
      },
      create: {
        id: 'default',
        ...data,
      },
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Personalização</h1>
          <p className="text-muted-foreground">
            Gerencie as cores e temas do sistema
          </p>
        </div>
      </div>

      <PersonalizationForm
        onSuccess={handleFormSuccess}
        personalization={
          personalization
            ? mapPersonalizationToColors(personalization)
            : undefined
        }
      />
    </div>
  )
}
