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
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import Image from 'next/image'
import { newsItems } from './news-data-mock'
import TabsHeader from '@/components/common/tabs-header'
import { motion } from 'framer-motion'
import { getAnimationOnViewUp } from '@/utils/animations/on-view-up'
import { searchContains } from '@/lib/utils'

const categories = ['Todos', ...new Set(newsItems.map(item => item.category))]

export default function News() {
  const [activeTab, setActiveTab] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredNews = useMemo(() => {
    let filtered = newsItems

    if (searchTerm) {
      filtered = filtered.filter(
        item =>
          searchContains(searchTerm, item.title) ||
          searchContains(searchTerm, item.excerpt),
      )
    }

    if (activeTab !== 'Todos') {
      filtered = filtered.filter(item => item.category === activeTab)
    }

    filtered = filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    return filtered
  }, [activeTab, searchTerm])

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
          tabs={categories.slice(0, 5)}
          inputPlaceholder="Buscar notícias"
        />

        {categories.map(category => (
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
                        src={
                          item?.image ||
                          `https://picsum.photos/seed/${Math.random() * 1000}/600/400`
                        }
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
                          {item.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays className="mr-1 h-3 w-3" />
                          {new Date(item.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 mt-3 text-xl hover:text-primary">
                        <Link href={`/home/news/${item.id}`}>{item.title}</Link>
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
                          href={`/home/news/${item.id}`}
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

      <Separator className="my-8" />

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          Assine nossa newsletter para receber as últimas notícias e
          atualizações da FCT.
        </h3>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Assinar
        </Button>
      </div>
    </div>
  )
}
