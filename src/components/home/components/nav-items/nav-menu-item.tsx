'use client'

import { useRouter } from 'next/navigation'
import { Section } from './nav-items'
import { ExternalLink, ChevronRight } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavMenuItemProps {
  item: Section
}

export function NavMenuItem({ item }: NavMenuItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const router = useRouter()

  if (!hasChildren) {
    return (
      <DropdownMenuItem
        onClick={() =>
          item?.page?.slug ? router.push(`/home/pages/${item.page.slug}`) : null
        }
        className="cursor-pointer group/item flex items-center px-4 py-2.5 my-0.5 text-[#00335e] hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 hover:text-blue-700 rounded-md transition-all duration-200 focus:bg-blue-50 focus:text-blue-700 text-sm font-medium relative overflow-hidden"
      >
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
