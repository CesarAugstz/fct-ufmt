'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CalendarDays, ChevronRight, Newspaper, Pin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import Image from 'next/image'
import TabsHeader from '@/components/common/tabs-header'
import { motion } from 'framer-motion'
import { getAnimationOnViewUp } from '@/utils/animations/on-view-up'
import { searchContains } from '@/lib/utils'
import { useFindManyNews, useFindManyNewsCategory } from '@/lib/zenstack-hooks'
import LoadingSpinner from '@/components/common/loading-spinner'
import { dayJs } from '@/utils/dayjs'

export default function News() {
  const [activeTab, setActiveTab] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  const { data: categories = [], isLoading: categoriesLoading } =
    useFindManyNewsCategory({
      orderBy: { order: 'asc' },
    })

  const { data: newsItems = [], isLoading: newsLoading } = useFindManyNews({
    where: {
      status: 'PUBLISHED',
    },
    include: {
      category: true,
      featuredImage: true,
    },
    orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }],
  })

  const isLoading = categoriesLoading || newsLoading

  const allCategories = ['Todos', ...categories.map(cat => cat.name)]

  const filteredNews = useMemo(() => {
    let filtered = newsItems

    if (searchTerm) {
      filtered = filtered.filter(
        item =>
          searchContains(searchTerm, item.title) ||
          (item.excerpt && searchContains(searchTerm, item.excerpt)),
      )
    }

    if (activeTab !== 'Todos') {
      filtered = filtered.filter(item => item.category.name === activeTab)
    }

    return filtered
  }, [activeTab, searchTerm, newsItems])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Newspaper className="h-7 w-7 text-primary" />
            <h2 className="text-4xl font-bold tracking-tight text-primary">
              Notícias
            </h2>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">
          Fique por dentro das últimas notícias, eventos e recursos da FCT
        </p>
      </div>

      <Tabs defaultValue="Todos" className="mb-8" onValueChange={setActiveTab}>
        <TabsHeader
          onSearchTermChange={setSearchTerm}
          tabs={allCategories.slice(0, 5)}
          inputPlaceholder="Buscar notícias"
        />

        {allCategories.map(category => (
          <TabsContent key={category} value={category} className="mt-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.length === 0 && (
                <p className="text-center col-span-full text-lg text-muted-foreground">
                  Nenhuma notícia encontrada
                </p>
              )}
              {filteredNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  {...getAnimationOnViewUp(index, 'y', false)}
                >
                  <Card
                    key={item.id}
                    className="group overflow-hidden border-0 hover:shadow-lg h-full"
                  >
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={item.featuredImage?.dataUrl ?? ''}
                        width={600}
                        height={400}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {item.isPinned && (
                        <div className="absolute right-3 top-3">
                          <Badge
                            variant="secondary"
                            className="bg-primary/90 text-primary-foreground backdrop-blur-sm"
                          >
                            <Pin className="mr-1 h-3 w-3" /> Fixado
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-5 pb-3">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="bg-secondary/10 text-secondary-foreground"
                        >
                          {item.category.name}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays className="mr-1 h-3 w-3" />
                          {dayJs(item.publishedAt || item.createdAt).format(
                            'DD/MM/YYYY',
                          )}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 mt-3 text-xl hover:text-primary">
                        <Link href={`/home/news/${item.slug}`}>
                          {item.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <CardDescription className="line-clamp-3">
                        {item.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-5 pt-0">
                      <Button
                        variant="link"
                        className="ml-auto p-0 text-primary"
                        asChild
                      >
                        <Link
                          href={`/home/news/${item.slug}`}
                          className="group/link"
                        >
                          Ler mais
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredNews.length > 6 && (
              <div className="mt-10 flex justify-center">
                <Button variant="outline" className="gap-2">
                  Carregar mais notícias
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
