'use client'

import {
  ArrowLeft,
  Book,
  Calendar,
  Mail,
  Share2,
  Clock,
  Beaker,
  User,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { professorsMock } from './professors-data-mock'
import { useToast } from '@/lib/hooks/toast'
import { useIsMobile } from '@/lib/hooks/is-mobile'
import { CourseMapper } from '@/utils/mappers/course.mapper'
import { formatDate } from '@/lib/utils'

export default function ProfessorDetail({ id }: { id: string }) {
  const professor = professorsMock.find(p => p.id === id)
  const toast = useToast()
  const { isMobileUserAgent: isMobile } = useIsMobile()

  const handleShare = async () => {
    const platform = isMobile ? 'native' : 'copy'
    console.log('Sharing platform:', platform)

    const shareUrl = window.location.href

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: professor?.name || 'Professor FCT',
          text: professor?.summary || '',
          url: shareUrl,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Link copiado para a área de transferência!')
      } catch (error) {
        console.log('Error copying:', error)
      }
    }
  }

  if (!professor) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Professor não encontrado</h1>
          <p className="mt-2 text-muted-foreground">
            O professor que você está procurando não existe ou foi removido.
          </p>
          <Button asChild className="mt-4">
            <Link href="/home/professors">Voltar para professores</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/home/professors">
              <ArrowLeft className="h-4 w-4" />
              Voltar para professores
            </Link>
          </Button>

          <Button onClick={handleShare} variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <div className="flex ">
              <div className="relative mr-4 self-center size-[100px] sm:h-28 sm:w-28 overflow-hidden rounded-full">
                {professor.image ? (
                  <Image
                    src={professor.image}
                    alt={professor.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <User className="h-full w-full text-gray-400 opacity-50 rounded-full" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {professor.courses.map(course => (
                    <Badge key={course} variant="secondary">
                      {CourseMapper.getCourseLabel(course)}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-primary">
                  {professor.name}
                </h1>
                <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {professor.email}
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="lead">{professor.summary}</p>

              <h2>Áreas de Pesquisa</h2>
              <ul>
                {professor.researchAreas.map(area => (
                  <li key={area}>{area}</li>
                ))}
              </ul>

              <h2>Especialidades</h2>
              <div className="flex flex-wrap gap-2 not-prose">
                {professor.specialties.map(specialty => (
                  <Badge key={specialty} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>

              {professor.publications?.length && (
                <>
                  <h2>Publicações Recentes</h2>
                  <div className="space-y-4 not-prose">
                    {professor.publications.map((pub, index) => (
                      <Card key={index} className="p-4">
                        <h3 className="font-semibold">{pub.title}</h3>
                        {pub.authors && (
                          <p className="text-sm text-muted-foreground">
                            {pub.authors.join(', ')}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            {formatDate(pub.date)}
                          </span>
                          {pub.link && (
                            <a
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline ml-auto"
                            >
                              Ver publicação
                            </a>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {professor.researchProjects &&
                professor.researchProjects.length > 0 && (
                  <>
                    <h2>Projetos de Pesquisa</h2>
                    <div className="space-y-4 not-prose">
                      {professor.researchProjects.map((project, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center gap-2">
                            <Beaker className="h-4 w-4" />
                            <h3 className="font-semibold">{project.title}</h3>
                            <Badge
                              variant={
                                project.status === 'ongoing'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {project.status === 'ongoing'
                                ? 'Em andamento'
                                : 'Concluído'}
                            </Badge>
                          </div>
                          {project.description && (
                            <p className="mt-2 text-muted-foreground">
                              {project.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">
                              {formatDate(project.startDate)}
                              {project.endDate
                                ? ` - ${formatDate(project.endDate)}`
                                : ' - Atual'}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}

              {professor.extensionProjects &&
                professor.extensionProjects.length > 0 && (
                  <>
                    <h2>Projetos de Extensão</h2>
                    <div className="space-y-4 not-prose">
                      {professor.extensionProjects.map((project, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center gap-2">
                            <Book className="h-4 w-4" />
                            <h3 className="font-semibold">{project.title}</h3>
                            <Badge
                              variant={
                                project.status === 'ongoing'
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {project.status === 'ongoing'
                                ? 'Em andamento'
                                : 'Concluído'}
                            </Badge>
                          </div>
                          {project.description && (
                            <p className="mt-2 text-muted-foreground">
                              {project.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">
                              {formatDate(project.startDate)}
                              {project.endDate &&
                                ` - ${formatDate(project.endDate)}`}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Horário de Atendimento:</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  {professor.officeHours}
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Métricas Acadêmicas
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Book className="h-4 w-4 text-muted-foreground" />
                    <span>Publicações:</span>
                  </div>
                  <span className="font-semibold">
                    {professor.publications?.length || 0}
                  </span>
                </div>
              </div>
            </Card>

            <Button className="w-full" asChild>
              <a
                href={professor.lattes}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Currículo Lattes
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
