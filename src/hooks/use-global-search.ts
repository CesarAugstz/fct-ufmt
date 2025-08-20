import { useMemo } from 'react'
import {
  useFindManyNews,
  useFindManyProfessor,
  useFindManyCourse,
  useFindManyProject,
} from '@/lib/zenstack-hooks'

export interface SearchResult {
  id: string
  type: 'news' | 'professor' | 'course' | 'project'
  title: string
  description?: string
  slug: string
  image?: string
  category?: string
  href: string
}

export function useGlobalSearch(searchTerm: string, limit: number = 5) {
  const { data: news = [] } = useFindManyNews({
    where: {
      status: 'PUBLISHED',
      ...(searchTerm
        ? {
            OR: [
              { title: { contains: searchTerm, mode: 'insensitive' } },
              { excerpt: { contains: searchTerm, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    include: {
      category: true,
      featuredImage: true,
    },
    orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }],
    take: searchTerm ? limit : 0,
  })

  const { data: professors = [] } = useFindManyProfessor({
    where: searchTerm
      ? {
          OR: [
            { user: { name: { contains: searchTerm, mode: 'insensitive' } } },
            { specialties: { hasSome: [searchTerm] } },
            { researchAreas: { hasSome: [searchTerm] } },
          ],
        }
      : {},
    include: {
      user: true,
      image: true,
      courses: true,
    },
    take: searchTerm ? limit : 0,
  })

  const { data: courses = [] } = useFindManyCourse({
    where: searchTerm
      ? {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
        }
      : {},
    take: searchTerm ? limit : 0,
  })

  const { data: projects = [] } = useFindManyProject({
    where: searchTerm
      ? {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
          ],
        }
      : {},
    take: searchTerm ? limit : 0,
  })

  const results = useMemo((): SearchResult[] => {
    if (!searchTerm) return []

    const newsResults: SearchResult[] = news.map(item => ({
      id: item.id,
      type: 'news',
      title: item.title,
      description: item.excerpt || undefined,
      slug: item.slug,
      image: item.featuredImage?.dataUrl,
      category: item.category.name,
      href: `/home/news/${item.slug}`,
    }))

    const professorResults: SearchResult[] = professors.map(prof => ({
      id: prof.id,
      type: 'professor',
      title: prof.user?.name || 'Professor',
      description: prof.summary || prof.specialties.join(', '),
      slug: prof.id,
      image: prof.image?.dataUrl,
      category: prof.courses.map(c => c.name).join(', '),
      href: `/home/professors#${prof.id}`,
    }))

    const courseResults: SearchResult[] = courses.map(course => ({
      id: course.id,
      type: 'course',
      title: course.name,
      description: course.description || undefined,
      slug: course.slug,
      category: course.nature === 'GRADUATION' ? 'Graduação' : 'Pós-graduação',
      href: `/home/courses/${course.slug}`,
    }))

    const projectResults: SearchResult[] = projects.map(project => ({
      id: project.id,
      type: 'project',
      title: project.title,
      description: project.description || undefined,
      slug: project.slug,
      category: project.type === 'RESEARCH' ? 'Pesquisa' : 'Extensão',
      href: `/home/projects/${project.slug}`,
    }))

    return [
      ...newsResults,
      ...professorResults,
      ...courseResults,
      ...projectResults,
    ].slice(0, limit)
  }, [news, professors, courses, projects, searchTerm, limit])

  const resultsByType = useMemo(
    () => ({
      news: results.filter(r => r.type === 'news'),
      professors: results.filter(r => r.type === 'professor'),
      courses: results.filter(r => r.type === 'course'),
      projects: results.filter(r => r.type === 'project'),
    }),
    [results],
  )

  return {
    results,
    resultsByType,
    totalResults: results.length,
    hasResults: results.length > 0,
  }
}
