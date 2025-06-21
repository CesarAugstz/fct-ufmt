import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useCourseSeminars } from '../hooks/use-course-data'

interface CourseSeminarsSectionProps {
  courseSlug: string
}

export default function CourseSeminarsSection({
  courseSlug,
}: CourseSeminarsSectionProps) {
  const { seminars } = useCourseSeminars(courseSlug)

  if (!seminars.length) {
    return null
  }

  return (
    <section>
      {seminars.map((seminar, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl">{seminar.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: seminar.description }}
                  className="prose prose-sm max-w-none text-muted-foreground"
                />
              </div>

              {seminar.images.length > 0 && (
                <div className="space-y-4">
                  {seminar.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${seminar.title} - Imagem ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
