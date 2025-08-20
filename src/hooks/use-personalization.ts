'use client'

import { useEffect } from 'react'
import { useFindFirstPersonalization } from '@/lib/zenstack-hooks/personalization'
import { usePersonalizationStore } from '@/store/personalization-store'
import { mapPersonalizationToColors } from '@/utils/mappers/personalization-mapper'

export function usePersonalization() {
  const { setColors, applyColors, isLoaded, setIsLoaded } =
    usePersonalizationStore()

  const { data: personalization } = useFindFirstPersonalization({
    where: { isActive: true },
  })

  useEffect(() => {
    if (personalization && !isLoaded) {
      const colors = mapPersonalizationToColors(personalization)
      setColors(colors)
      applyColors()
      setIsLoaded(true)
    }
  }, [personalization, isLoaded, setColors, applyColors, setIsLoaded])

  return {
    personalization,
    isLoaded,
  }
}
