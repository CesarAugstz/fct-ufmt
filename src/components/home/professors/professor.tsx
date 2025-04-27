'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Book, GraduationCap, Mail, ArrowRight, User } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { professorsMock } from './professors-data-mock'
import { CourseMapper } from '@/utils/mappers/course.mapper'
import { motion } from 'framer-motion'
import { getAnimationOnViewUp } from '@/utils/animations/on-view-up'
import { Separator } from '@/components/ui/separator'
import TabsHeader from '@/components/common/tabs-header'
import { searchContains } from '@/lib/utils'

const courses = ['Todos', ...CourseMapper.courseOptions.map(c => c.label)]

export default function Professors() {
  const [activeTab, setActiveTab] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProfessors, setFilteredProfessors] = useState(professorsMock)

  useEffect(
    function filterProfessors() {
      let filtered = professorsMock

      if (searchTerm) {
        filtered = filtered.filter(
          prof =>
            searchContains(searchTerm, prof.name) ||
            searchContains(searchTerm, prof.courses.map(c => c).join(' ')),
        )
      }

      if (activeTab !== 'Todos') {
        filtered = filtered.filter(prof =>
          prof.courses.includes(CourseMapper.courseMapReverse[activeTab]),
        )
      }
      console.log(filtered)
      setFilteredProfessors(filtered)
    },
    [activeTab, searchTerm],
  )

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
          tabs={courses}
          inputPlaceholder="Busque por nome ou curso"
        />

        <Separator className="bg-secondary h-[2px]" />

        <TabsContent value={activeTab} className="mt-8">
          <div className="divide-y divide-gray-200">
            {filteredProfessors.map((professor, index) => (
              <motion.div
                key={professor.id}
                className="flex flex-col rounded-lg md:flex-row gap-6 py-8 group hover:bg-background-hover transition-colors"
                {...getAnimationOnViewUp(index, 'y', false)}
              >
                <div className="flex justify-center">
                  <div className="rounded-full flex relative w-48 h-48 overflow-hidden flex-shrink-0">
                    {professor.image ? (
                      <Image
                        src={professor.image ?? '/example/profile.jpg'}
                        alt={professor.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <User className="h-full w-full text-gray-400 opacity-50 rounded-full" />
                    )}
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {professor.courses.map(course => (
                      <Badge key={course} variant="secondary">
                        {CourseMapper.getCourseLabel(course)}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                    <Link href={`/home/professors/${professor.id}`}>
                      {professor.name}
                    </Link>
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Mail className="h-4 w-4" />
                    {professor.email}
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {professor.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {professor.specialties.slice(0, 3).map(specialty => (
                      <Badge
                        key={specialty}
                        variant="outline"
                        className="bg-primary/5"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    {professor.publications && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Book className="h-4 w-4" />
                        {professor.publications.length} publicações
                      </div>
                    )}
                    <Button variant="ghost" className="group" asChild>
                      <Link
                        href={`/home/professors/${professor.id}`}
                        className="flex items-center gap-2"
                      >
                        Ver perfil
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
