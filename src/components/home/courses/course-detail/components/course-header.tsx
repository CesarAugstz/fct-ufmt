import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useShare } from '@/lib/hooks/share'
import { ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'

interface CourseHeaderProps {
  course:
    | {
        name?: string | null
        description?: string | null
        nature?: 'GRADUATION' | 'POST_GRADUATION'
        professors?: unknown[]
        poles?: unknown[]
        admissionInfo?: {
          vacancies?: number
        }
      }
    | null
    | undefined
}

export default function CourseHeader({ course }: CourseHeaderProps) {
  const { share } = useShare()
  if (!course) {
    return null
  }

  const natureLabel =
    course.nature === 'GRADUATION' ? 'Graduação' : 'Pós-Graduação'

  return (
    <div className="relative">
      <div className="relative bg-gradient-to-r from-primary-light via-primary-light/90 to-primary-light/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/home/courses">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para cursos
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() =>
                share({
                  title: course.name || 'Curso FCT',
                  text: course.description || '',
                  url: window.location.href,
                })
              }
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant={
                  course.nature === 'GRADUATION' ? 'default' : 'secondary'
                }
                className="mb-2"
              >
                {natureLabel}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {course.name || 'Curso'}
            </h1>

            <p className="text-xl text-primary-foreground/80 mb-6 leading-relaxed">
              {course.description || 'Descrição em breve...'}
            </p>

            <div className="flex flex-wrap gap-4">
              {course.admissionInfo && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span>
                    {course.admissionInfo.vacancies} vagas disponíveis
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span>{course.professors?.length || 0} professores</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span>{course.poles?.length || 0} polos disponíveis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
