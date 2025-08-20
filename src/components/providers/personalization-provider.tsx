'use client'

import { usePersonalization } from '@/hooks/use-personalization'

interface PersonalizationProviderProps {
  children: React.ReactNode
}

export function PersonalizationProvider({
  children,
}: PersonalizationProviderProps) {
  usePersonalization()

  return <>{children}</>
}
