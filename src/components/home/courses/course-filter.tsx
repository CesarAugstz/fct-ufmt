import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CourseNature } from '@prisma/client'

interface CourseFilterProps {
  selectedFilter: CourseNature | 'ALL'
  onFilterChange: (filter: CourseNature | 'ALL') => void
  graduationCount: number
  postGraduationCount: number
  totalCount: number
}

export function CourseFilter({
  selectedFilter,
  onFilterChange,
  graduationCount,
  postGraduationCount,
  totalCount,
}: CourseFilterProps) {
  const filters = [
    {
      value: 'ALL' as const,
      label: 'Todos os Cursos',
      count: totalCount,
    },
    {
      value: CourseNature.GRADUATION,
      label: 'Graduação',
      count: graduationCount,
    },
    {
      value: CourseNature.POST_GRADUATION,
      label: 'Pós-Graduação',
      count: postGraduationCount,
    },
  ]

  return (
    <div className="flex justify-center mb-8">
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <Button
            key={filter.value}
            variant={selectedFilter === filter.value ? 'default' : 'outline'}
            onClick={() => onFilterChange(filter.value)}
            className="flex items-center gap-2"
          >
            {filter.label}
            <Badge variant="secondary" className="ml-1">
              {filter.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  )
}
