import { CollegeData } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CollegeDataStore {
  setCollegeData: (data: CollegeData) => void
  collegeData: CollegeData | null
}

export const useCollegeDataStore = create<CollegeDataStore>()(
  persist(
    set => ({
      setCollegeData: (data: CollegeData) => set({ collegeData: data }),
      collegeData: null,
    }),
    {
      name: 'college-data',
    },
  ),
)
