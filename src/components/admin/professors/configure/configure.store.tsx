import { atom } from 'jotai'
import { User, Briefcase, FileText, GraduationCap } from 'lucide-react'
import BasicTab from './components/tabs/basic/basic'
import ExtensionProjectsTab from './components/tabs/extension-projects/extension-projects'
import PublicationsTab from './components/tabs/publications/publications'
import ResearchTab from './components/tabs/research/research'
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { ProfessorWithRelations } from '@/app/admin/(without-sidebar)/professors-configure/page'

export const professorAtom = atom<ProfessorWithRelations | null>(null)

const tabs = [
  {
    id: 'basic',
    title: 'Informações Básicas',
    icon: User,
    component: BasicTab,
  },
  {
    id: 'research',
    title: 'Pesquisa',
    icon: Briefcase,
    component: ResearchTab,
  },
  {
    id: 'publications',
    title: 'Publicações',
    icon: FileText,
    component: PublicationsTab,
  },
  {
    id: 'extension-projects',
    title: 'Projetos de Extensão',
    icon: GraduationCap,
    component: ExtensionProjectsTab,
  },
] as const

export type TabType = (typeof tabs)[number]
export type TabId = TabType['id']

export const tabsAtom = atom(tabs)

export const activeTabAtom = atom<TabId>('basic')

export const nextTabAtom = atom<TabType | undefined>(get => {
  const tabs = get(tabsAtom)
  const activeTab = get(activeTabAtom)
  const nextIndex = tabs.findIndex(t => t.id === activeTab) + 1
  return tabs[nextIndex]
})

export const prevTabAtom = atom<TabType | undefined>(get => {
  const tabs = get(tabsAtom)
  const activeTab = get(activeTabAtom)
  const prevIndex = tabs.findIndex(t => t.id === activeTab) - 1
  return tabs[prevIndex]
})

export const completitionStatusAtom = atom(get => {
  const professor = get(professorAtom)

  const conditionsItems = [
    () => professor?.user?.name,
    () => professor?.user?.email,
    () => professor?.summary,
    () => professor?.courses.length ?? 0 > 0,
    () => professor?.specialties.length ?? 0 > 0,
    () => professor?.image,
    () => professor?.researchAreas.length ?? 0 > 0,
    () => professor?.officeHours,
    () => professor?.lattes,
    () => professor?.publications?.length ?? 0 > 0,
    () => professor?.researchProjects?.length ?? 0 > 0,
    () => professor?.extensionProjects?.length ?? 0 > 0,
  ]

  const conditions = conditionsItems.map(condition => condition())
  const completed = conditions.filter(Boolean).length
  const total = conditions.length

  return {
    completed,
    total,
  }
})

interface FormMethods {
  watch: UseFormWatch<ProfessorWithRelations>
  getValues: UseFormGetValues<ProfessorWithRelations>
  setValue: UseFormSetValue<ProfessorWithRelations>
}

export const formMethodsAtom = atom<FormMethods | null>(null)
