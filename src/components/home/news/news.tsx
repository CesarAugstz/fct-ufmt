'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  ChevronRight,
  Filter,
  Newspaper,
  Pin,
} from 'lucide-react'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const newsItems = [
  {
    id: 1,
    title: 'Inscrições para o Semestre de Outono Abertas',
    excerpt:
      'As inscrições para as disciplinas do próximo semestre estão abertas. Recomendamos que os estudantes se inscrevam com antecedência para garantir seus horários preferidos.',
    date: '2025-04-10',
    category: 'Avisos',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: true,
  },
  {
    id: 2,
    title: 'Palestra: Avanços em Inteligência Artificial',
    excerpt:
      'Participe de uma palestra instigante com a Dra. Camila Santos sobre os recentes avanços em inteligência artificial e suas aplicações em diversos setores.',
    date: '2025-04-15',
    category: 'Eventos',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 3,
    title: 'Prazo para Submissões do Simpósio de Pesquisa Termina na Próxima Semana',
    excerpt:
      'O prazo para a submissão de artigos científicos para o simpósio anual está se aproximando. Certifique-se de finalizar suas submissões até 25 de abril.',
    date: '2025-04-12',
    category: 'Pesquisa',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 4,
    title: 'Novos Materiais Didáticos Disponíveis Online',
    excerpt:
      'Materiais atualizados para a disciplina ENG305 foram disponibilizados no sistema de gestão de aprendizagem. Os alunos já podem acessá-los.',
    date: '2025-04-08',
    category: 'Recursos',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 5,
    title: 'Atualização dos Horários de Atendimento dos Professores',
    excerpt:
      'O Professor Silva atualizou seus horários de atendimento para o restante do semestre. Confira a agenda para verificar a disponibilidade.',
    date: '2025-04-05',
    category: 'Avisos',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 6,
    title: 'Mostra de Projetos Estudantis no Próximo Mês',
    excerpt:
      'A mostra anual de projetos estudantis será realizada no próximo mês. As inscrições para apresentação de projetos já estão abertas.',
    date: '2025-04-03',
    category: 'Eventos',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 7,
    title: 'Programa de Iniciação Científica: Inscrições Abertas',
    excerpt:
      'A FCT está com inscrições abertas para o programa de iniciação científica 2025. Estudantes interessados devem enviar seus projetos até dia 30 de abril.',
    date: '2025-04-02',
    category: 'Pesquisa',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 8,
    title: 'Semana de Tecnologia FCT 2025',
    excerpt:
      'A Semana de Tecnologia da FCT acontecerá entre os dias 10 e 14 de maio, com palestras, workshops e exposições. Confira a programação completa no site.',
    date: '2025-04-01',
    category: 'Eventos',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: true,
  },
  {
    id: 9,
    title: 'Novo Laboratório de Robótica Inaugurado',
    excerpt:
      'A FCT inaugurou seu novo laboratório de robótica com equipamentos de última geração. Agende uma visita com seu professor para conhecer o espaço.',
    date: '2025-03-30',
    category: 'Infraestrutura',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 10,
    title: 'Processo Seletivo para Monitoria',
    excerpt:
      'Estão abertas as inscrições para o processo seletivo de monitores nas disciplinas de Cálculo, Física e Programação. Confira os requisitos no edital.',
    date: '2025-03-28',
    category: 'Avisos',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
];


const categories = ['All', ...new Set(newsItems.map(item => item.category))]

export default function News() {
  const [activeTab, setActiveTab] = useState('All')

  const filteredNews =
    activeTab === 'All'
      ? newsItems
      : newsItems.filter(item => item.category === activeTab)

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Course News</h2>
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <p className="text-muted-foreground">
          Stay updated with the latest announcements, events, and resources for
          your courses
        </p>
      </div>

      <Tabs defaultValue="All" className="mb-8" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            {categories.slice(0, 4).map(category => (
              <TabsTrigger key={category} value={category} className="px-4">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant="link" size="sm" className="text-primary">
            View all categories
          </Button>
        </div>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedNews.map(item => (
                <Card
                  key={item.id}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                    {item.isPinned && (
                      <div className="absolute right-2 top-2">
                        <Badge
                          variant="secondary"
                          className="bg-primary text-primary-foreground"
                        >
                          <Pin className="mr-1 h-3 w-3" /> Pinned
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-secondary/10 text-secondary-foreground"
                      >
                        {item.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 mt-2 text-xl">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="line-clamp-3">
                      {item.excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="link"
                      className="ml-auto p-0 text-primary"
                      asChild
                    >
                      <Link href={`/news/${item.id}`}>
                        Read more <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {sortedNews.length > 6 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-2">
                  Load more news
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-8" />

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Subscribe to Updates</h3>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Subscribe
        </Button>
      </div>
    </div>
  )
}
