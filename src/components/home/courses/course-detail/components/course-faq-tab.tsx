'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { useFindUniqueCourse } from '@/lib/zenstack-hooks'
import LoadingSpinner from '@/components/common/loading-spinner'
import { motion } from 'framer-motion'

interface CourseFAQTabProps {
  courseSlug: string
}

export default function CourseFAQTab({ courseSlug }: CourseFAQTabProps) {
  const { data: course, isLoading } = useFindUniqueCourse(
    {
      where: { slug: courseSlug },
      select: {
        id: true,
        name: true,
        slug: true,
        faqCategories: {
          where: { faqItems: { some: { published: true } } },
          orderBy: { order: 'asc' },
          include: {
            faqItems: {
              where: { published: true },
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                slug: true,
                order: true,
                createdAt: true,
                _count: {
                  select: { contentBlocks: true },
                },
              },
            },
          },
        },
      },
    },
    { enabled: !!courseSlug },
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!course?.faqCategories?.length) {
    return (
      <div className="text-center py-12">
        <HelpCircle className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          FAQ em construção
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          As perguntas frequentes para este curso estão sendo preparadas. Volte
          em breve para encontrar respostas às suas dúvidas.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <motion.div
          className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            type: 'spring',
            stiffness: 200,
          }}
        >
          <HelpCircle className="w-6 h-6 text-primary" />
        </motion.div>
        <motion.h2
          className="text-2xl font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Perguntas Frequentes
        </motion.h2>
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Encontre respostas para as principais dúvidas sobre o curso
        </motion.p>
      </motion.div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {course.faqCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              delay: 0.6 + categoryIndex * 0.1,
            }}
          >
            <AccordionItem
              value={category.id}
              className="border-0 bg-card rounded-2xl shadow-lg"
            >
              <AccordionTrigger className="px-8 py-6 text-left font-semibold text-lg text-card-foreground">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md ${
                      categoryIndex === 0
                        ? 'bg-gradient-to-br from-primary to-primary/80'
                        : categoryIndex === 1
                          ? 'bg-gradient-to-br from-secondary to-secondary/80'
                          : categoryIndex === 2
                            ? 'bg-gradient-to-br from-accent to-accent/80'
                            : 'bg-gradient-to-br from-muted-foreground to-muted-foreground/80'
                    }`}
                  >
                    {categoryIndex + 1}
                  </div>
                  <div className="flex-1">
                    <span>{category.name}</span>
                    {category.description && (
                      <p className="text-sm text-muted-foreground font-normal mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-8 pt-2">
                <motion.div
                  className="grid gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {category.faqItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 rounded-xl border border-border/50"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                        <span className="text-primary text-sm font-semibold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/home/courses/${courseSlug}/faq/${item.slug}`}
                        >
                          <h4 className="font-medium leading-relaxed">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                {new Date(item.createdAt).toLocaleDateString(
                                  'pt-BR',
                                )}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="flex-shrink-0">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>

      <motion.div
        className="text-center py-8 border-t"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.p
          className="text-muted-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Não encontrou o que procurava?
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild variant="outline">
            <Link href="/home/faq">
              Ver FAQ Geral
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
