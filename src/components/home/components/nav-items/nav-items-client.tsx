'use client'

import { ChevronDown, Dot, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NavMenuItem } from './nav-menu-item'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCallback, useEffect, useRef, useState } from 'react'
import { VisuallyHidden } from 'radix-ui'
import { Section } from '@/lib/navigation'
import { useMousePosition } from '@/hooks/use-mouse-position'
import { useRouter } from 'next/navigation'

interface NavItemsClientProps {
  sections: Section[]
}

export default function NavItemsClient({ sections }: NavItemsClientProps) {
  return (
    <nav className="bg-gradient-to-r from-[#001a35] via-[#002347] to-[#00305e] text-white py-3 sticky top-0 z-50 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4)] border-b border-blue-900/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Mobile Menu */}
          <div className="md:hidden w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white w-full hover:bg-white/10"
                  size="icon"
                >
                  <Menu
                    style={{ aspectRatio: '99/1' }}
                    width={30}
                    className=""
                  />
                </Button>
              </SheetTrigger>
              <VisuallyHidden.Root>
                <SheetTitle>Menu</SheetTitle>
              </VisuallyHidden.Root>{' '}
              <SheetContent side="left" className="w-[300px] p-0">
                <div className="py-4 mt-6 px-2">
                  <ul className="space-y-2">
                    {sections.map(section => (
                      <MobileNavItem key={section.name} section={section} />
                    ))}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block w-full overflow-x-auto">
            <ul className="flex space-x-1 md:space-x-4 min-w-max py-0.5">
              {sections.map(section => (
                <li key={section.name} className="relative group">
                  {section.children && section.children.length > 0 ? (
                    <NavDropdown section={section} />
                  ) : (
                    <Link href={section.href ?? '#'} className="ml-2">
                      <Button
                        variant="ghost"
                        className="text-white font-medium tracking-wide hover:text-blue-100 hover:bg-white/10 px-3 py-1.5 h-auto transition-all duration-200 rounded-md text-sm relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-300 after:transform after:-translate-x-1/2 hover:after:w-2/3 after:transition-all after:duration-300"
                        disabled={!section.href}
                      >
                        {section.name}
                      </Button>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileNavItem({
  section,
  depth = 0,
}: {
  section: Section
  depth?: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  if (!section.children?.length) {
    return (
      <li>
        <Link href={section.href ?? '#'} className="flex flex-row items-center">
          {depth !== 0 && (
            <Dot size={depth ? 18 : 14} className="absolute h-4 w-4" />
          )}
          <Button
            variant="ghost"
            className="w-full justify-start text-left font-medium"
            disabled={!section.href}
          >
            {section.name}
          </Button>
        </Link>
      </li>
    )
  }

  return (
    <li>
      <Button
        variant="ghost"
        className="w-full justify-between text-left font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {section.name}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>
      {isOpen && (
        <ul className="ml-4 mt-2 space-y-2">
          {section.children.map(child => (
            <MobileNavItem key={child.name} section={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

interface NavDropdownProps {
  section: Section
}

function NavDropdown({ section }: NavDropdownProps) {
  const hasChildren = section.children && section.children.length > 0
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const dropdownContentRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()
  const router = useRouter()

  const [isHovered, setIsHovered] = useState(false)

  const getIsHover = useCallback(() => {
    const isHoverDiv = divRef.current?.contains(
      document.elementFromPoint(mousePosition.x, mousePosition.y),
    )
    const isHoverDropdown = dropdownContentRef.current?.contains(
      document.elementFromPoint(mousePosition.x, mousePosition.y),
    )

    return isHoverDiv || isHoverDropdown
  }, [mousePosition.x, mousePosition.y])

  useEffect(() => {
    const isHover = getIsHover()

    if (isHover) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      setIsHovered(true)
    } else {
      timeoutRef.current = setTimeout(() => {
        if (!getIsHover()) setIsHovered(false)
      }, 100)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [getIsHover, mousePosition])

  if (!hasChildren) {
    return (
      <Button
        variant="ghost"
        className="text-white font-medium tracking-wide hover:text-blue-100 hover:bg-white/10 px-3 py-1.5 h-auto transition-all duration-200 rounded-md text-sm"
        disabled={!section.href}
      >
        {section.name}
      </Button>
    )
  }

  const sortedChildren = [...(section.children ?? [])]

  return (
    <div ref={divRef}>
      <DropdownMenu open={isHovered}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            asChild
            className="text-white font-medium tracking-wide hover:text-blue-100 hover:bg-white/10 px-3 py-1.5 h-auto flex items-center transition-all duration-200 rounded-md text-sm relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-blue-300 after:transform after:-translate-x-1/2 group-hover:after:w-2/3 after:transition-all after:duration-300"
            onClick={() => section?.href && router.push(section.href)}
          >
            <Link href={section.href ?? '#'}>
              {section.name}{' '}
              <ChevronDown className="ml-1.5 h-3.5 w-3.5 opacity-70 group-hover:opacity-100 transition-all" />
            </Link>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 rounded-lg border border-blue-100/30 bg-white/98 backdrop-blur-md shadow-[0_10px_40px_-15px_rgba(0,30,80,0.3)] animate-in fade-in-50 zoom-in-95 data-[side=top]:slide-in-from-bottom-2 p-1.5 mt-1"
          sideOffset={8}
          ref={dropdownContentRef}
        >
          {sortedChildren.map(child => (
            <NavMenuItem key={child.name} item={child} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
