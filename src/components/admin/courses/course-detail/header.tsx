import { useAtomValue } from 'jotai'
import { courseSlugAtom } from '../store/course.store'
import { Button } from '@/components/ui/button'
import { useCallback } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useFindUniqueCourse } from '@/lib/zenstack-hooks'
import LoadingSpinner from '@/components/common/loading-spinner'
import { useRouter } from 'next/navigation'

export default function Header() {
  const slug = useAtomValue(courseSlugAtom)
  const router = useRouter()

  const { data: course, isLoading } = useFindUniqueCourse(
    {
      where: { slug: slug! },
      select: {
        name: true,
        nature: true,
        description: true,
      },
    },
    { enabled: !!slug },
  )

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  if (!slug) {
    return null
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!course) {
    throw new Error('Curso não encontrado')
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={goBack}
        className="flex justify-start w-fit items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>
      <div>
        <h1 className="text-2xl font-bold">{course.name}</h1>
        <p className="text-muted-foreground">
          {course?.nature === 'GRADUATION' ? 'Graduação' : 'Pós-Graduação'}
        </p>
      </div>
    </>
  )
}
