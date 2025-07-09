'use client'

import { useState } from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import CourseGeneralTab from './tabs/general'
import CourseProfessorsTab from './tabs/professors'
import CourseFaqTab from './tabs/faq'
import AdmissionTab from './tabs/admission'
import TabsHeader from '@/components/common/tabs-header'

export default function CourseTabs() {
  const tabs = [
    { name: 'Informações Gerais', component: CourseGeneralTab },
    { name: 'Admissão', component: AdmissionTab },
    { name: 'Professores', component: CourseProfessorsTab },
    { name: 'FAQ', component: CourseFaqTab },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0].name)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsHeader tabs={tabs.map(tab => tab.name)} showSearch={false} />

      {tabs.map(tab => (
        <TabsContent key={tab.name} value={tab.name}>
          <tab.component />
        </TabsContent>
      ))}
    </Tabs>
  )
}
