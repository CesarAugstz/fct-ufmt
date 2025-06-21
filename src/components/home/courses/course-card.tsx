import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Course, Professor, User as UserType } from '@zenstackhq/runtime/models'

type CourseWithProfessors = Course & {
  professors: (Professor & { user: UserType })[]
}

interface CourseCardProps {
  course: CourseWithProfessors
}

export function CourseCard({ course }: CourseCardProps) {
  const natureLabel =
    course.nature === 'GRADUATION' ? 'Graduação' : 'Pós-Graduação'

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant={course.nature === 'GRADUATION' ? 'default' : 'secondary'}
            className="mb-2"
          >
            {natureLabel}
          </Badge>
        </div>
        <CardTitle className="text-xl leading-tight">{course.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {course.description}
          </p>
        </div>
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link href={`/home/courses/${course.slug}`}>
              Ver curso
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
