'use client'

import { useEffect } from 'react'
import {
  usePersonalizationStore,
  PersonalizationColors,
} from '@/store/personalization-store'

interface PersonalizationProviderProps {
  children: React.ReactNode
  initialColors?: PersonalizationColors
}

export function PersonalizationProvider({
  children,
  initialColors,
}: PersonalizationProviderProps) {
  const { setColors, isLoaded, setIsLoaded } = usePersonalizationStore()

  useEffect(() => {
    if (initialColors && !isLoaded) {
      setColors(initialColors, true)
      setIsLoaded(true)
    }
  }, [initialColors, isLoaded, setColors, setIsLoaded])

  return <>{children}</>
}
