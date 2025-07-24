'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Settings,
  Users,
  House,
  Library,
  Menu,
  Newspaper,
  ShieldUser,
  PanelsTopLeft,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'

interface Route {
  name: string
  path: string
  icon: React.ReactNode
  disabled?: boolean
}

const routes: Route[] = [
  {
    name: 'Tela Inicial',
    path: '/admin',
    icon: <House className="mr-2 h-5 w-5" />,
  },
  {
    name: 'Docentes',
    path: '/admin/professors',
    icon: <Users className="mr-2 h-5 w-5" />,
  },
  {
    name: 'Usuários',
    path: '/admin/users',
    icon: <Users className="mr-2 h-5 w-5" />,
  },
  {
    name: 'Cursos',
    path: '/admin/courses',
    icon: <Library className="mr-2 h-5 w-5" />,
  },
  {
    name: 'Notícias',
    path: '/admin/news',
    icon: <Newspaper className="mr-2 h-5 w-5" />,
  },
  {
    name: 'Gestão',
    path: '/admin/management',
    icon: <ShieldUser className="mr-2 h-5 w-5" />,
  },
  {
    name: 'Projetos',
    path: '/admin/projects',
    icon: <PanelsTopLeft className="mr-2 h-5 w-5" />,
  },
  {
    name: 'Configurações',
    path: '/admin/settings',
    icon: <Settings className="mr-2 h-5 w-5" />,
    disabled: true,
  },
] as const

function SidebarContent({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname()

  const activeRoute = routes.findLast(route =>
    pathname.includes(route.path),
  )?.path

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-foreground">FCT</h1>
        </div>
      </div>

      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {routes.map(route => (
            <Link
              onClick={() => onClick?.()}
              href={route.disabled ? '#' : route.path}
              key={route.path}
            >
              <Button
                disabled={route?.disabled}
                variant={activeRoute === route.path ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                {route.icon}
                {route.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <SidebarContent onClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

export default function Sidebar() {
  return (
    <div className="hidden md:flex fixed left-4 top-4 bottom-4 w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border rounded-xl shadow-lg z-40">
      <SidebarContent />
    </div>
  )
}
