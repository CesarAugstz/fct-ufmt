'use client'

import Image from 'next/image'
import { Search, Instagram, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/common/theme-toggle'
import Link from 'next/link'

interface HeaderProps {
  collegeData?: {
    name?: string | null
    acronym?: string | null
    logo?: {
      id: string
      dataUrl: string
      name: string
    } | null
    instagram?: string | null
    youtube?: string | null
  } | null
}

export function Header({ collegeData }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-[#002347] to-[#003366] text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {(collegeData?.logo || collegeData?.name) && (
          <Link href="/home" className="flex items-center mb-4 md:mb-0">
            {collegeData?.logo && (
              <div className="mr-3">
                <div className="bg-white p-2 rounded-lg shadow-lg">
                  <Image
                    src={collegeData.logo.dataUrl}
                    alt={collegeData.logo.name}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                </div>
              </div>
            )}
            {collegeData?.name && (
              <div className="text-lg font-bold">
                {collegeData.name.includes(' ') ? (
                  <>
                    <div>
                      {collegeData.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div>{collegeData.name.split(' ').slice(2).join(' ')}</div>
                  </>
                ) : (
                  <div>{collegeData.name}</div>
                )}
              </div>
            )}
          </Link>
        )}

        <div className="w-full md:w-1/2 lg:w-2/5 relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="O que você procura?"
              className="w-full py-2 px-4 pr-10 rounded-full border-accent focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full text-gray-400 hover:text-primary"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {(collegeData?.instagram || collegeData?.youtube) && (
          <div className="flex space-x-4 mt-4 md:mt-0">
            {collegeData?.instagram && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-blue-200 hover:bg-blue-900/20 transition-colors"
                onClick={() => window.open(collegeData.instagram!, '_blank')}
              >
                <Instagram className="h-5 w-5" />
              </Button>
            )}
            {collegeData?.youtube && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(collegeData.youtube!, '_blank')}
                className="text-white hover:text-blue-200 hover:bg-blue-900/20 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
        <ThemeToggle className="" buttonProps={{ variant: 'ghost' }} />
      </div>
    </header>
  )
}
