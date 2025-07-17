'use client'

import Link from 'next/link'
import { ArrowRight, CalendarDays, ExternalLink, Newspaper } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getAnimationOnViewUp } from '@/utils/animations/on-view-up'
import { motion } from 'framer-motion'
import { News } from '@prisma/client'
import ImageMadrid from '@/components/common/image-madrid'

interface NewsPreviewProps {
  latestNews: (News & { category: { name: string } })[]
  featuredNews: (News & { category: { name: string } })[]
}

export default function NewsPreview({
  latestNews,
  featuredNews,
}: NewsPreviewProps) {
  return (
    <section className="w-full  py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Newspaper className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              Últimas Notícias
            </h2>
          </div>
          <Button variant="link" className="text-primary group" asChild>
            <Link href="/home/news">
              Ver todas
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {featuredNews.map((item, index) => (
            <motion.div key={item.id} {...getAnimationOnViewUp(index)}>
              <Card
                key={item.id}
                className="group overflow-hidden border-0 transition-all hover:shadow-lg"
              >
                <div className="relative sm:h-56 w-full overflow-hidden bg-muted">
                  <ImageMadrid
                    imageId={item.featuredImageId}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {item.category.name}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="line-clamp-2 text-xl">
                    <Link
                      href={`/home/news/${item.slug}`}
                      className="hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {item.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-5 pt-0">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {new Date(item.createdAt).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-primary group/link"
                    asChild
                  >
                    <Link href={`/home/news/${item.id}`}>
                      Ler mais
                      <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {latestNews.map((item, index) => (
            <motion.div key={item.id} {...getAnimationOnViewUp(index, 'x')}>
              <Card
                key={item.id}
                className="group flex h-full flex-col overflow-hidden border-0 transition-all hover:shadow-lg"
              >
                <div className="flex gap-4 p-4">
                  <div className="hidden sm:block">
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-muted">
                      <ImageMadrid
                        imageId={item.featuredImageId}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Badge
                      variant="outline"
                      className="mb-2 bg-secondary/10 text-xs text-secondary-foreground"
                    >
                      {item.category?.name}
                    </Badge>
                    <h4 className="line-clamp-2 text-sm font-medium">
                      <Link
                        href={`/home/news/${item.slug}`}
                        className="hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </h4>
                    <div className="mt-2 flex items-center text-xs text-muted-foreground">
                      <CalendarDays className="mr-1 h-3 w-3" />
                      {new Date(item.createdAt).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
