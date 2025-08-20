'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, User, GraduationCap, Briefcase, Newspaper } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGlobalSearch, type SearchResult } from '@/hooks/use-global-search'
import { useDebounce } from '@/hooks/use-debounce'
import LoadingSpinner from '@/components/common/loading-spinner'
import { motion } from 'framer-motion'
import { getAnimationOnViewUp } from '@/utils/animations/on-view-up'

interface SearchResultsPageProps {
  initialQuery: string
}

function SearchResultCard({
  result,
  index,
}: {
  result: SearchResult
  index: number
}) {
  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'news':
        return <Newspaper className="h-5 w-5" />
      case 'professor':
        return <User className="h-5 w-5" />
      case 'course':
        return <GraduationCap className="h-5 w-5" />
      case 'project':
        return <Briefcase className="h-5 w-5" />
      default:
        return <Search className="h-5 w-5" />
    }
  }

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
        return 'bg-primary/10 text-primary border-primary/20'
      case 'professor':
        return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'course':
        return 'bg-accent/10 text-accent border-accent/20'
      case 'project':
        return 'bg-warning/10 text-warning border-warning/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  return (
    <motion.div {...getAnimationOnViewUp(index, 'y', false)}>
      <Card className="group hover:shadow-lg transition-all duration-300 h-full">
        <Link href={result.href} className="block h-full">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              {result.image && (
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={result.image}
                    alt={result.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={getTypeColor(result.type)}
                  >
                    {getIcon(result.type)}
                    <span className="ml-1">{getTypeLabel(result.type)}</span>
                  </Badge>
                </div>
                <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                  {result.title}
                </CardTitle>
                {result.category && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.category}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          {result.description && (
            <CardContent className="pt-0">
              <CardDescription className="line-clamp-3">
                {result.description}
              </CardDescription>
            </CardContent>
          )}
        </Link>
      </Card>
    </motion.div>
  )
}

export default function SearchResultsPage({
  initialQuery,
}: SearchResultsPageProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState('all')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { results, resultsByType, totalResults } = useGlobalSearch(
    debouncedSearchTerm,
    50,
  )

  const filteredResults = useMemo(() => {
    if (activeTab === 'all') return results
    return resultsByType[activeTab as keyof typeof resultsByType] || []
  }, [activeTab, results, resultsByType])

  const tabCounts = useMemo(
    () => ({
      all: totalResults,
      news: resultsByType.news.length,
      professors: resultsByType.professors.length,
      courses: resultsByType.courses.length,
      projects: resultsByType.projects.length,
    }),
    [totalResults, resultsByType],
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const url = new URL(window.location.href)
      url.searchParams.set('q', searchTerm.trim())
      window.history.pushState({}, '', url.toString())
    }
  }

  const isLoading = searchTerm !== debouncedSearchTerm

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Search className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Resultados da Busca
          </h1>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar por notícias, professores, cursos e projetos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full py-3 px-4 pr-12 text-lg rounded-lg border-2 focus:ring-2 focus:ring-primary/20"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>

        {debouncedSearchTerm && (
          <p className="text-muted-foreground mt-4">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner className="h-4 w-4" />
                Buscando...
              </span>
            ) : (
              <>
                {totalResults} resultado{totalResults !== 1 ? 's' : ''}{' '}
                encontrado{totalResults !== 1 ? 's' : ''} para "
                {debouncedSearchTerm}"
              </>
            )}
          </p>
        )}
      </div>

      {debouncedSearchTerm && !isLoading && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid  w-full grid-cols-1 h-full lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Todos ({tabCounts.all})
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              Notícias ({tabCounts.news})
            </TabsTrigger>
            <TabsTrigger value="professors" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Professores ({tabCounts.professors})
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Cursos ({tabCounts.courses})
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Projetos ({tabCounts.projects})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Nenhum resultado encontrado
                  </h3>
                  <p className="text-muted-foreground">
                    Tente usar palavras-chave diferentes ou verifique a
                    ortografia.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredResults.map((result, index) => (
                  <SearchResultCard
                    key={result.id}
                    result={result}
                    index={index}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {!debouncedSearchTerm && !isLoading && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Comece sua busca</h3>
            <p className="text-muted-foreground">
              Digite no campo acima para buscar por notícias, professores,
              cursos e projetos.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
