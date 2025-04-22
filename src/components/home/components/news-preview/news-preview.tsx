import Link from 'next/link'
import { ArrowRight, CalendarDays, ExternalLink } from 'lucide-react'

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
import Image from 'next/image'

const latestNews = [
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


export default function NewsPreview() {
  const featuredNews = latestNews.slice(0, 2)
  const smallerNews = latestNews.slice(2, 5)

  return (
    <section className="w-full m-0 bg-background py-8">
      <div className="px-10 mx-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Últimas Notícias</h2>
          <Button variant="link" className="text-primary" asChild>
            <Link href="/news">
             Ver todas <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredNews.map(item => (
            <Card
              key={item.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="line-clamp-2 text-xl">
                  <Link
                    href={`/news/${item.id}`}
                    className="hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {item.excerpt}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  {new Date(item.date).toLocaleDateString('pt-BR', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary"
                  asChild
                >
                  <Link href={`/news/${item.id}`}>
                    Read more <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Smaller news items */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {smallerNews.map(item => (
            <Card
              key={item.id}
              className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md"
            >
              <div className="flex gap-3 p-3">
                <div className="hidden sm:block">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Badge
                    variant="outline"
                    className="mb-1 bg-secondary/10 text-xs text-secondary-foreground"
                  >
                    {item.category}
                  </Badge>
                  <h4 className="line-clamp-2 text-sm font-medium">
                    <Link
                      href={`/news/${item.id}`}
                      className="hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {new Date(item.date).toLocaleDateString('pt-BR', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
