import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useFindManySection,
  useInfiniteFindManySection,
} from '@/lib/zenstack-hooks'
import { getPrisma } from '@/app/api/model/[...path]/route'
import { unstable_cache } from 'next/cache'
import { db } from '@/server/db'

export interface Section {
  id: string
  name: string
  slug: string
  parentId: string | null
  isVisible: boolean
  order: number
  children?: Section[]
}

const navigationSections: Section[] = [
  {
    id: 'instituto',
    name: 'O INSTITUTO',
    slug: 'instituto',
    parentId: null,
    isVisible: true,
    order: 1,
    children: [
      {
        id: 'sobre',
        name: 'Sobre o Instituto',
        slug: 'sobre',
        parentId: 'instituto',
        isVisible: true,
        order: 1,
      },
      {
        id: 'estrutura',
        name: 'Estrutura Organizacional',
        slug: 'estrutura',
        parentId: 'instituto',
        isVisible: true,
        order: 2,
        children: [
          {
            id: 'diretoria',
            name: 'Diretoria',
            slug: 'diretoria',
            parentId: 'estrutura',
            isVisible: true,
            order: 1,
          },
          {
            id: 'conselhos',
            name: 'Conselhos',
            slug: 'conselhos',
            parentId: 'estrutura',
            isVisible: true,
            order: 2,
          },
        ],
      },
      {
        id: 'historico',
        name: 'Histórico',
        slug: 'historico',
        parentId: 'instituto',
        isVisible: true,
        order: 3,
      },
      {
        id: 'localizacao',
        name: 'Localização',
        slug: 'localizacao',
        parentId: 'instituto',
        isVisible: true,
        order: 4,
      },
    ],
  },
  {
    id: 'estudante',
    name: 'ESTUDANTE',
    slug: 'estudante',
    parentId: null,
    isVisible: true,
    order: 2,
    children: [
      {
        id: 'graduacao',
        name: 'Graduação',
        slug: 'graduacao',
        parentId: 'estudante',
        isVisible: true,
        order: 1,
      },
      {
        id: 'pos-graduacao',
        name: 'Pós-Graduação',
        slug: 'pos-graduacao',
        parentId: 'estudante',
        isVisible: true,
        order: 2,
      },
      {
        id: 'calendario',
        name: 'Calendário Acadêmico',
        slug: 'calendario',
        parentId: 'estudante',
        isVisible: true,
        order: 3,
      },
      {
        id: 'estagios',
        name: 'Estágios',
        slug: 'estagios',
        parentId: 'estudante',
        isVisible: true,
        order: 4,
      },
    ],
  },
  {
    id: 'nuti',
    name: 'NUTI',
    slug: 'nuti',
    parentId: null,
    isVisible: true,
    order: 6,
  },
]

const getSections = unstable_cache(
  async () => {
    return await db.section.findMany({
      where: { isVisible: true },
      include: {
        children: { include: { children: { include: { children: true } } } },
      },
    })
  },
  ['sections'],
  { revalidate: 3600, tags: ['sections'] },
)

export default async function NavItems() {
  const sections = await getSections()

  const rootSections = sections.filter(section => section.parentId === null)

  const sortedSections = [...rootSections]
    .filter(section => section.isVisible)
    .sort((a, b) => a.order - b.order)

  return (
    <nav className="bg-gradient-to-r from-[#001a35] via-[#002347] to-[#00305e] text-white py-3 sticky top-0 z-50 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] border-b border-blue-900/20">
      <div className="container mx-auto px-4 overflow-x-auto">
        <ul className="flex space-x-1 md:space-x-4 min-w-max py-0.5">
          {sortedSections.map(section => (
            <li key={section.id} className="relative group">
              {section.children && section.children.length > 0 ? (
                <NavDropdown section={section} />
              ) : (
                <Button
                  variant="ghost"
                  className="text-white font-medium tracking-wide hover:text-blue-100 hover:bg-white/10 px-3 py-1.5 h-auto transition-all duration-200 rounded-md text-sm relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-300 after:transform after:-translate-x-1/2 hover:after:w-2/3 after:transition-all after:duration-300"
                >
                  {section.name}
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

interface NavDropdownProps {
  section: Section
}

function NavDropdown({ section }: NavDropdownProps) {
  const hasChildren = section.children && section.children.length > 0

  if (!hasChildren) {
    return (
      <Button
        variant="ghost"
        className="text-white font-medium tracking-wide hover:text-blue-100 hover:bg-white/10 px-3 py-1.5 h-auto transition-all duration-200 rounded-md text-sm"
      >
        {section.name}
      </Button>
    )
  }

  const sortedChildren = [...(section.children ?? [])]
    .filter(child => child.isVisible)
    .sort((a, b) => a.order - b.order)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white font-medium tracking-wide hover:text-blue-100 hover:bg-white/10 px-3 py-1.5 h-auto flex items-center transition-all duration-200 rounded-md text-sm relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-300 after:transform after:-translate-x-1/2 group-hover:after:w-2/3 after:transition-all after:duration-300"
        >
          {section.name}{' '}
          <ChevronDown className="ml-1.5 h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-lg border border-blue-100/30 bg-white/98 backdrop-blur-md shadow-[0_10px_40px_-15px_rgba(0,30,80,0.3)] animate-in fade-in-50 zoom-in-95 data-[side=top]:slide-in-from-bottom-2 p-1.5 mt-1"
        sideOffset={8}
      >
        {sortedChildren.map(child => (
          <NavMenuItem key={child.id} item={child} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface NavMenuItemProps {
  item: Section
}

function NavMenuItem({ item }: NavMenuItemProps) {
  const hasChildren = item.children && item.children.length > 0

  if (!hasChildren) {
    return (
      <DropdownMenuItem className="cursor-pointer group/item flex items-center px-4 py-2.5 my-0.5 text-[#00335e] hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 hover:text-blue-700 rounded-md transition-all duration-200 focus:bg-blue-50 focus:text-blue-700 text-sm font-medium relative overflow-hidden">
        <span className="relative z-10 flex items-center">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-300 opacity-0 group-hover/item:opacity-100 transition-all duration-200 group-hover/item:scale-110"></span>
          {item.name}
          <ExternalLink className="ml-2 h-3 w-3 opacity-0 -translate-x-1 group-hover/item:opacity-70 group-hover/item:translate-x-0 transition-all duration-200" />
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-300"></span>
      </DropdownMenuItem>
    )
  }

  const sortedChildren = [...(item.children ?? [])]
    .filter(child => child.isVisible)
    .sort((a, b) => a.order - b.order)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group/nested flex items-center justify-between w-full px-4 py-2.5 my-0.5 text-[#00335e] hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 hover:text-blue-700 rounded-md transition-all duration-200 cursor-pointer text-sm font-medium relative overflow-hidden">
          <span className="relative z-10 flex items-center">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-300 opacity-0 group-hover/nested:opacity-100 transition-all duration-200 group-hover/nested:scale-110"></span>
            {item.name}
          </span>
          <ChevronRight className="relative z-10 h-3.5 w-3.5 opacity-60 group-hover/nested:opacity-100 group-hover/nested:translate-x-0.5 transition-all duration-200" />
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover/nested:opacity-100 transition-all duration-300"></span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        sideOffset={-5}
        className="w-64 rounded-lg border border-blue-100/30 bg-white/98 backdrop-blur-md shadow-[0_10px_40px_-15px_rgba(0,30,80,0.3)] animate-in slide-in-from-left-2 fade-in-50 zoom-in-95 p-1.5"
      >
        {sortedChildren.map(child => (
          <NavMenuItem key={child.id} item={child} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
