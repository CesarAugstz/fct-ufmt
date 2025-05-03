import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PencilLine, Trash2 } from 'lucide-react'
import { dayJs } from '@/utils/dayjs'

export interface ResearchProject {
  title: string
  startDate: Date
  endDate?: Date
  status: 'ongoing' | 'finished'
  description: string
}

interface ResearchProjectCardProps {
  project: ResearchProject
  onDelete: () => void
  onEdit: (project: ResearchProject) => void
}

export default function ResearchProjectCard({
  project,
  onDelete,
  onEdit,
}: ResearchProjectCardProps) {
  const formatDateRange = (startDate: Date, endDate?: Date) => {
    const start = dayJs(startDate).format('MMM YYYY')
    const end = endDate ? dayJs(endDate).format('MMM YYYY') : 'Presente'
    return `${start} - ${end}`
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{project.title}</h4>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{formatDateRange(project.startDate, project.endDate)}</span>
            <Badge
              className={`ml-2 ${
                project.status === 'ongoing'
                  ? 'bg-accent-foreground text-accent'
                  : 'bg-primary-foreground text-primary'
              } border-0`}
            >
              {project.status === 'ongoing' ? 'Em andamento' : 'Finalizado'}
            </Badge>
          </div>
          {project.description && (
            <p className="text-sm mt-2">{project.description}</p>
          )}
        </div>
        <div className="">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(project)}
          >
            <PencilLine className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-destructive-foreground hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
