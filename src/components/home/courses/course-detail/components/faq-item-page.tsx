'use client'

import { useFindFirstFaqItem } from '@/lib/zenstack-hooks'
import { BlockContentRenderer } from '@/components/common/block-content-renderer'
import LoadingSpinner from '@/components/common/loading-spinner'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'

interface FaqItemPageProps {
  courseSlug: string
  faqSlug: string
}

export default function FaqItemPage({ courseSlug, faqSlug }: FaqItemPageProps) {
  const { data: faqItem, isLoading } = useFindFirstFaqItem({
    where: {
      slug: faqSlug,
      published: true,
      category: {
        course: {
          slug: courseSlug,
        },
      },
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          course: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      contentBlocks: {
        include: { file: true },
        orderBy: { order: 'asc' },
      },
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!faqItem) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link
            href={`/home/courses/${courseSlug}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="font-medium">
              Voltar para {faqItem.category.course.name}
            </span>
          </Link>
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {faqItem.category.name}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(faqItem.createdAt).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Badge>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-6 leading-tight">
            {faqItem.title}
          </h1>

          <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary rounded-full"></div>
        </header>

        <main className="prose prose-lg dark:prose-invert max-w-none">
          {faqItem.contentBlocks?.length ? (
            <BlockContentRenderer
              blocks={faqItem.contentBlocks}
              className="space-y-8"
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Conteúdo em construção...
              </p>
            </div>
          )}
        </main>

        <footer className="mt-16 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Button asChild variant="outline">
              <Link href={`/home/courses/${courseSlug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Curso
              </Link>
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Categoria: <strong>{faqItem.category.name}</strong>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
