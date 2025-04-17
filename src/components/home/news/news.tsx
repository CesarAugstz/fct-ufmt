'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  ChevronRight,
  Filter,
  Newspaper,
  Pin,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const newsItems = [
  {
    id: 1,
    title: 'Course Registration for Fall Semester Now Open',
    excerpt:
      'Registration for the upcoming fall semester courses is now open. Students are encouraged to register early to secure their preferred class schedules.',
    date: '2025-04-10',
    category: 'Announcements',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: true,
  },
  {
    id: 2,
    title: 'Guest Lecture: Advances in Machine Learning',
    excerpt:
      'Join us for an insightful guest lecture by Dr. Sarah Chen on recent advances in machine learning and their applications in various industries.',
    date: '2025-04-15',
    category: 'Events',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 3,
    title: 'Research Symposium Submissions Due Next Week',
    excerpt:
      'The deadline for submitting research papers for the annual symposium is approaching. Make sure to finalize your submissions by April 25.',
    date: '2025-04-12',
    category: 'Research',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 4,
    title: 'New Course Materials Available Online',
    excerpt:
      'Updated course materials for CS401 have been uploaded to the learning management system. Students can access them immediately.',
    date: '2025-04-08',
    category: 'Resources',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 5,
    title: 'Faculty Office Hours Update',
    excerpt:
      'Professor Johnson has updated his office hours for the remainder of the semester. Please check the schedule for availability.',
    date: '2025-04-05',
    category: 'Announcements',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
  {
    id: 6,
    title: 'Student Project Showcase Next Month',
    excerpt:
      'The annual student project showcase will be held next month. Registration for presenting your projects is now open.',
    date: '2025-04-03',
    category: 'Events',
    image: '/placeholder.svg?height=200&width=400',
    isPinned: false,
  },
]

const categories = ['All', ...new Set(newsItems.map(item => item.category))]

export default function News() {
  const [activeTab, setActiveTab] = useState('All')

  const filteredNews =
    activeTab === 'All'
      ? newsItems
      : newsItems.filter(item => item.category === activeTab)

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold tracking-tight">Course News</h2>
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <p className="text-muted-foreground">
          Stay updated with the latest announcements, events, and resources for
          your courses
        </p>
      </div>

      <Tabs defaultValue="All" className="mb-8" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            {categories.slice(0, 4).map(category => (
              <TabsTrigger key={category} value={category} className="px-4">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button variant="link" size="sm" className="text-primary">
            View all categories
          </Button>
        </div>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedNews.map(item => (
                <Card
                  key={item.id}
                  className="overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                    {item.isPinned && (
                      <div className="absolute right-2 top-2">
                        <Badge
                          variant="secondary"
                          className="bg-primary text-primary-foreground"
                        >
                          <Pin className="mr-1 h-3 w-3" /> Pinned
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-secondary/10 text-secondary-foreground"
                      >
                        {item.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarDays className="mr-1 h-3 w-3" />
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 mt-2 text-xl">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="line-clamp-3">
                      {item.excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="link"
                      className="ml-auto p-0 text-primary"
                      asChild
                    >
                      <Link href={`/news/${item.id}`}>
                        Read more <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {sortedNews.length > 6 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-2">
                  Load more news
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-8" />

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Subscribe to Updates</h3>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Subscribe
        </Button>
      </div>
    </div>
  )
}
