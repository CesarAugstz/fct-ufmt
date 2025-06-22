'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CourseGeneralTab from './tabs/general'
import CourseProfessorsTab from './tabs/professors'
import CourseFaqTab from './tabs/faq'

export default function CourseTabs() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">Informações Gerais</TabsTrigger>
        <TabsTrigger value="professors">Professores</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-6">
        <CourseGeneralTab />
      </TabsContent>

      <TabsContent value="professors" className="space-y-6">
        <CourseProfessorsTab />
      </TabsContent>

      <TabsContent value="faq" className="space-y-6">
        <CourseFaqTab />
      </TabsContent>
    </Tabs>
  )
}
