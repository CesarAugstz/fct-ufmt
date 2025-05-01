import { Button } from '@/components/ui/button'
import { PencilLine, Trash2 } from 'lucide-react'
import { dayJs } from '@/utils/dayjs'

export interface Publication {
  title: string
  authors?: string[]
  date: Date
  link?: string
}

interface PublicationCardProps {
  publication: Publication
  onDelete: () => void
  onEdit: (publication: Publication) => void
}

export default function PublicationCard({
  publication,
  onDelete,
  onEdit,
}: PublicationCardProps) {
  const formatDate = (date: Date) => {
    return dayJs(date).format('YYYY')
  }

  const formatAuthors = (authors?: string[]) => {
    return authors ? authors.join(', ') : ''
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{publication.title}</h4>
          <p className="text-sm text-muted-foreground">
            {formatAuthors(publication.authors)} •{' '}
            {formatDate(publication.date)}
          </p>
          {publication.link && (
            <p className="text-sm text-teal-600 hover:underline cursor-pointer mt-1">
              {publication.link}
            </p>
          )}
        </div>
        <div className="">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onEdit(publication)}
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
