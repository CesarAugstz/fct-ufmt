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
import { unstable_cache } from 'next/cache'
import { db } from '@/server/db'
import { Page } from '@prisma/client'
import { NavMenuItem } from './nav-menu-item'
import Link from 'next/link'

export interface Section {
  id: string
  name: string
  parentId: string | null
  isVisible: boolean
  order: number
  children?: Section[]
  page?: Page | null
}

const getSections = unstable_cache(
  async () => {
    return await db.section.findMany({
      where: { isVisible: true },
      include: {
        children: {
          include: {
            page: true,
            children: { include: { page: true, children: true } },
          },
        },
        page: true,
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
                <Link
                  href={
                    section.page?.slug
                      ? `/home/pages/${section.page?.slug}`
                      : '#'
                  }
                  className="ml-2"
                >
                  <Button
                    variant="ghost"
                    className="text-white font-medium tracking-wide hover:text-blue-100 hover:bg-white/10 px-3 py-1.5 h-auto transition-all duration-200 rounded-md text-sm relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-300 after:transform after:-translate-x-1/2 hover:after:w-2/3 after:transition-all after:duration-300"
                    disabled={!section.page?.slug}
                  >
                    {section.name}
                  </Button>
                </Link>
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
        disabled={!section.page?.slug}
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
