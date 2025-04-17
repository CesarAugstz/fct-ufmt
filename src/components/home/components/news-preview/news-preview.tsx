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
    title: 'Course Registration for Fall Semester Now Open',
    excerpt:
      'Registration for the upcoming fall semester courses is now open. Students are encouraged to register early.',
    date: '2025-04-10',
    category: 'Announcements',
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 2,
    title: 'Guest Lecture: Advances in Machine Learning',
    excerpt:
      'Join us for an insightful guest lecture by Dr. Sarah Chen on recent advances in machine learning.',
    date: '2025-04-15',
    category: 'Events',
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 3,
    title: 'Research Symposium Submissions Due Next Week',
    excerpt:
      'The deadline for submitting research papers for the annual symposium is approaching.',
    date: '2025-04-12',
    category: 'Research',
    image: '/placeholder.svg?height=120&width=200',
  },
  {
    id: 4,
    title: 'New Course Materials Available Online',
    excerpt:
      'Updated course materials for CS401 have been uploaded to the learning management system.',
    date: '2025-04-08',
    category: 'Resources',
    image: '/placeholder.svg?height=120&width=200',
  },
  {
    id: 5,
    title: 'Faculty Office Hours Update',
    excerpt:
      'Professor Johnson has updated his office hours for the remainder of the semester.',
    date: '2025-04-05',
    category: 'Announcements',
    image: '/placeholder.svg?height=120&width=200',
  },
]

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
