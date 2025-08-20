'use client'

import { useEffect } from 'react'
import { CollegeData } from '@prisma/client'
import { useCollegeDataStore } from '@/store/college-data-store'

interface CollegeDataProviderProps {
  children: React.ReactNode
  collegeData?: CollegeData | null
}

export function CollegeDataProvider({
  children,
  collegeData,
}: CollegeDataProviderProps) {
  const { setCollegeData } = useCollegeDataStore()

  console.log('collegedataprovider', collegeData)
  useEffect(() => {
    if (collegeData) {
      setCollegeData(collegeData)
    }
  }, [collegeData, setCollegeData])

  return <>{children}</>
}
