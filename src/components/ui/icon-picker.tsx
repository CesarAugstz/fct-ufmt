'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Icon } from '@/components/ui/icon'
import { ChevronDown, Search } from 'lucide-react'
import { icons } from 'lucide-react'

// Dynamically import the grid, which is the "heavy" part.
// The `ssr: false` is important because a virtualized list relies on window size.
const IconPickerGrid = dynamic(() => import('./icon-picker-grid'), {
  ssr: false,
  loading: () => (
    <div className="p-4 text-center text-muted-foreground">
      Carregando ícones...
    </div>
  ),
})

interface IconPickerProps {
  value?: string
  onChange: (iconName: string) => void
  placeholder?: string
}

export const IconPicker = ({
  value,
  onChange,
  placeholder = 'Selecionar ícone',
}: IconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const isValidIcon = value && value in icons

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
          role="combobox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2">
            {isValidIcon ? (
              <>
                <Icon name={value as keyof typeof icons} className="h-4 w-4" />
                <span>{value}</span>
              </>
            ) : value ? (
              <>
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{value}</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{placeholder}</span>
              </>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        {/* The grid is only rendered (and its code loaded) when the popover is open */}
        {isOpen && (
          <IconPickerGrid
            onSelect={iconName => {
              onChange(iconName)
              setIsOpen(false)
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
