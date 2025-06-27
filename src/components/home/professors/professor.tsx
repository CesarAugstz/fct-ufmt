'use client'

import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import TabsHeader from '@/components/common/tabs-header'
import { searchContains } from '@/lib/utils'
import { useFindManyCourse, useFindManyProfessor } from '@/lib/zenstack-hooks'
import ProfessorCard from './professor-card'

export default function Professors() {
  const [activeTab, setActiveTab] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const { data: courses } = useFindManyCourse()
  const { data: professors = [] } = useFindManyProfessor({
    include: {
      user: true,
      courses: true,
      image: { select: { id: true } },
    },
  })

  const coursesTabs = ['Todos', ...(courses?.map(c => c.name) ?? [])]

  const filteredProfessors = professors.filter(prof => {
    if (searchTerm) {
      const matchesName =
        prof.user?.name && searchContains(searchTerm, prof.user.name)
      const matchesCourses = prof.courses.some(c =>
        searchContains(searchTerm, c.name),
      )
      if (!matchesName && !matchesCourses) return false
    }

    if (activeTab !== 'Todos') {
      return prof.courses.some(c => c.name === activeTab)
    }

    return true
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-primary" />
            <h2 className="text-4xl font-bold tracking-tight text-primary">
              Professores
            </h2>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">
          Conheça nosso corpo docente altamente qualificado
        </p>
      </div>

      <Tabs
        defaultValue="Todos"
        className="mb-8"
        onValueChange={setActiveTab}
        orientation="vertical"
      >
        <TabsHeader
          onSearchTermChange={setSearchTerm}
          tabs={coursesTabs}
          inputPlaceholder="Busque por nome ou curso"
        />

        <Separator className="bg-secondary h-[2px]" />

        <TabsContent value={activeTab} className="mt-8">
          <div className="divide-y divide-gray-200">
            {filteredProfessors.map((professor, index) => (
              <ProfessorCard
                key={professor.id}
                professor={professor}
                index={index}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
