'use client'

import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { dayJs } from '@/utils/dayjs'
import GenericCards from '@/components/admin/common/generic-cards'
import { Project } from '@prisma/client'

interface ProjectCardsProps {
  projects: Project[]
  loading?: boolean
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
  onView?: (project: Project) => void
}

export default function ProjectCards({
  projects,
  loading,
  onDelete,
  onEdit,
  onView,
}: ProjectCardsProps) {
  const getTypeBadge = (type: Project['type']) => {
    const variants = {
      EXTENSION: 'default',
      RESEARCH: 'secondary',
    } as const

    const labels = {
      EXTENSION: 'Extensão',
      RESEARCH: 'Pesquisa',
    }

    return <Badge variant={variants[type]}>{labels[type]}</Badge>
  }

  return (
    <GenericCards
      items={projects}
      loading={loading}
      onDelete={onDelete}
      onEdit={onEdit}
      onView={onView}
      showDefaultViewAction={true}
      emptyMessage="Nenhum projeto encontrado. Clique em 'Adicionar' para começar."
      renderHeaderRightSection={_ => (
        <Calendar className="h-4 w-4 text-muted-foreground" />
      )}
      renderSubtitle={project => (
        <>
          <span>{project.title}</span>
        </>
      )}
      renderContent={project => (
        <>
          {project.description && (
            <p className="text-xs text-muted-foreground line-clamp-3">
              {project.description}
            </p>
          )}
        </>
      )}
      renderBadges={project => (
        <>
          <div className="flex items-center gap-2">
            {getTypeBadge(project.type)}
          </div>
          <span className="text-xs text-muted-foreground">
            {dayJs(project.createdAt).format('DD/MM/YYYY')}
          </span>
        </>
      )}
    />
  )
}
