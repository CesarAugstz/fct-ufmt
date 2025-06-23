'use client'

import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/common/theme-toggle'
import UserDropdown from './user-dropdown/user-dropdown'
import { MobileSidebar } from '../sidebar'

export default function Header() {
  return (
    <header className="fixed top-4 left-4 right-4 md:left-72 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border rounded-xl shadow-lg z-30 py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MobileSidebar />
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}
