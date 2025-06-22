'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import {
  CourseAboutTab,
  CourseProfessorsTab,
  CourseAdmissionTab,
  CourseFAQTab,
  CoursePolesSection,
  CourseSeminarsSection,
} from '../'
import TabsHeader from '@/components/common/tabs-header'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface CourseTabsProps {
  courseSlug: string
}

const tabs = [
  { name: 'Sobre o curso', component: CourseAboutTab },
  { name: 'Professores', component: CourseProfessorsTab },
  { name: 'Ingresso', component: CourseAdmissionTab },
  { name: 'Dúvidas frequentes', component: CourseFAQTab },
]

export default function CourseTabs({ courseSlug }: CourseTabsProps) {
  const router = useRouter()
  const params = useSearchParams()
  const tabParam = params.get('tab')
  const [activeTab, setActiveTab] = useState(tabs[0].name)

  useEffect(() => {
    const tab = tabs.find(t => t.name === tabParam)?.name

    if (tab) {
      router.push(`/home/courses/${courseSlug}?tab=${tab}`, { scroll: false })
      setActiveTab(tab)
    }
  }, [router, courseSlug, tabParam])

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab)
      router.replace(`/home/courses/${courseSlug}?tab=${tab}`, {
        scroll: false,
      })
    },
    [courseSlug, router],
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Conheça o curso</h2>

        <Tabs
          onValueChange={handleTabChange}
          value={activeTab}
          defaultValue={tabs[0].name}
          className="w-full"
        >
          <TabsHeader showSearch={false} tabs={tabs.map(tab => tab.name)} />

          {tabs.map(tab => (
            <TabsContent key={tab.name} value={tab.name}>
              <tab.component courseSlug={courseSlug} />
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 space-y-16">
          <CourseSeminarsSection courseSlug={courseSlug} />
          <CoursePolesSection courseSlug={courseSlug} />
        </div>
      </div>
    </div>
  )
}
