'use client'

import { useEffect } from 'react'
import { useFindFirstPersonalization } from '@/lib/zenstack-hooks/personalization'
import { usePersonalizationStore } from '@/store/personalization-store'
import { mapPersonalizationToColors } from '@/utils/mappers/personalization-mapper'

export function usePersonalization() {
  const { setColors, applyColors, isLoaded, setIsLoaded, colors } =
    usePersonalizationStore()

  const { data: personalization, isSuccess } = useFindFirstPersonalization()
  console.log('colors', {
    colors,
    isLoaded,
    personalization,
  })

  useEffect(() => {
    if (!personalization || !isSuccess) return
    const colors = mapPersonalizationToColors(personalization)
    console.log('called', colors)
    setColors(colors)
    applyColors()
    setIsLoaded(true)
  }, [
    personalization,
    isLoaded,
    setColors,
    applyColors,
    setIsLoaded,
    isSuccess,
  ])

  return {
    personalization,
    isLoaded,
  }
}
