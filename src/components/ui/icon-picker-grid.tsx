'use client'

import { useState, useMemo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { icons } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/ui/icon'

// Get the list of all icon names just once
const allIconNames = Object.keys(icons)

interface IconPickerGridProps {
  onSelect: (iconName: string) => void
}

export default function IconPickerGrid({ onSelect }: IconPickerGridProps) {
  const [search, setSearch] = useState('')
  const parentRef = useRef<HTMLDivElement>(null)

  const filteredIcons = useMemo(
    () =>
      allIconNames.filter(name =>
        name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  )

  // The virtualizer hook
  const rowVirtualizer = useVirtualizer({
    count: filteredIcons.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // The height of each row in px
    overscan: 5, // Render 5 extra items above and below the visible area
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="p-2">
        <Input
          placeholder="Buscar ícone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* The scrollable container */}
      <div ref={parentRef} className="h-[250px] overflow-y-auto">
        {/* A single large div to create the scrollbar, with height based on all items */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only render the virtual items */}
          {rowVirtualizer.getVirtualItems().map(virtualItem => {
            const iconName = filteredIcons[virtualItem.index]
            return (
              <button
                key={virtualItem.key}
                onClick={() => onSelect(iconName)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`, // Position the item correctly
                }}
                className="flex items-center gap-3 w-full p-3 hover:bg-accent rounded-md transition-colors text-left"
              >
                <Icon
                  name={iconName as keyof typeof icons}
                  className="h-5 w-5 shrink-0"
                />
                <span className="text-sm">{iconName}</span>
              </button>
            )
          })}
        </div>
      </div>

      {filteredIcons.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          Nenhum ícone encontrado para "{search}"
        </div>
      )}
    </div>
  )
}
