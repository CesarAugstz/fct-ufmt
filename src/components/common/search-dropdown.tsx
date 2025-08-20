'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGlobalSearch, type SearchResult } from '@/hooks/use-global-search'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface SearchDropdownProps {
  className?: string
  placeholder?: string
  onSearchSubmit?: (searchTerm: string) => void
}

function SearchResultItem({
  result,
  onClick,
}: {
  result: SearchResult
  onClick: () => void
}) {
  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'news':
        return 'Notícia'
      case 'professor':
        return 'Professor'
      case 'course':
        return 'Curso'
      case 'project':
        return 'Projeto'
      default:
        return ''
    }
  }

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'news':
        return 'bg-primary/10 text-primary'
      case 'professor':
        return 'bg-secondary/10 text-secondary'
      case 'course':
        return 'bg-accent/10 text-accent'
      case 'project':
        return 'bg-warning/10 text-warning'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Link href={result.href} onClick={onClick}>
      <div className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors">
        {result.image && (
          <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={result.image}
              alt={result.title}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <h4 className="font-medium text-sm line-clamp-1 text-foreground">
              {result.title}
            </h4>
            <Badge
              variant="secondary"
              className={cn('text-xs flex-shrink-0', getTypeColor(result.type))}
            >
              {getTypeLabel(result.type)}
            </Badge>
          </div>
          {result.description && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {result.description}
            </p>
          )}
          {result.category && (
            <p className="text-xs text-muted-foreground mt-1">
              {result.category}
            </p>
          )}
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      </div>
    </Link>
  )
}

export function SearchDropdown({
  className,
  placeholder = 'O que você procura?',
  onSearchSubmit,
}: SearchDropdownProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { results, hasResults } = useGlobalSearch(debouncedSearchTerm, 8)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    setIsOpen(debouncedSearchTerm.length > 0 && hasResults)
    setSelectedIndex(-1)
  }, [debouncedSearchTerm, hasResults])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(results[selectedIndex].href)
          setIsOpen(false)
          setSearchTerm('')
        } else if (searchTerm.trim()) {
          handleSearchSubmit()
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(searchTerm.trim())
      } else {
        router.push(`/home/search?q=${encodeURIComponent(searchTerm.trim())}`)
      }
      setIsOpen(false)
      setSearchTerm('')
    }
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() =>
            debouncedSearchTerm.length > 0 && hasResults && setIsOpen(true)
          }
          className="w-full py-2 px-4 pr-10 rounded-full border-accent focus:ring-2 focus:ring-primary/30 transition-all"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSearchSubmit}
          className="absolute right-0 top-0 h-full text-gray-400 hover:text-primary"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isOpen && hasResults && (
        <Card
          ref={dropdownRef}
          className="absolute  top-full left-0 right-0 mt-2 z-100 max-h-[400px] overflow-y-auto shadow-lg"
        >
          <CardContent className="p-0">
            <div className="divide-y">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className={cn(selectedIndex === index && 'bg-muted/50')}
                >
                  <SearchResultItem
                    result={result}
                    onClick={handleResultClick}
                  />
                </div>
              ))}
            </div>

            {searchTerm.trim() && (
              <div className="border-t">
                <Button
                  variant="ghost"
                  onClick={handleSearchSubmit}
                  className="w-full justify-between p-3 h-auto rounded-none"
                >
                  <span className="text-sm">
                    Ver todos os resultados para "{searchTerm}"
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
