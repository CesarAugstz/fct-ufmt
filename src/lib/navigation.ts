import { db } from '@/server/db'
import { CourseNature, ProjectType } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export type Section = {
  name: string
  children?: Section[]
  href?: string
}

async function getNavigationSectionsUncached(): Promise<Section[]> {
  const courses = await db.course.findMany({
    select: {
      name: true,
      slug: true,
      nature: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  const projects = await db.project.findMany({
    select: {
      title: true,
      type: true,
      slug: true,
    },
    orderBy: { title: 'asc' },
  })

  const extensionProjects = projects
    ?.filter(p => p.type === ProjectType.EXTENSION)
    ?.map(p => ({ name: p.title, href: `/home/projects/${p.slug}` }))

  const researchProjects = projects
    ?.filter(p => p.type === ProjectType.RESEARCH)
    ?.map(p => ({ name: p.title, href: `/home/projects/${p.slug}` }))

  const graduationCourses = courses
    ?.filter(c => c.nature === CourseNature.GRADUATION)
    ?.map(c => ({ name: c.name, href: `/home/courses/${c.slug}` }))

  const postGraduationCourses = courses
    ?.filter(c => c.nature === CourseNature.POST_GRADUATION)
    ?.map(c => ({ name: c.name, href: `/home/courses/${c.slug}` }))

  const sections: Section[] = [
    {
      name: 'A Faculdade',
      href: '/home',
      children: [
        { name: 'História' },
        { name: 'Gestão', href: '/home/management' },
        { name: 'Docentes', href: '/home/professors' },
        { name: 'Técnicos' },
        { name: 'Contatos' },
        { name: 'Tour 360º' },
      ],
    },
    {
      name: 'Inovatec',
    },
    {
      name: 'Notícias',
      href: '/home/news',
    },
    {
      name: 'Estágios',
    },
    ...(postGraduationCourses?.length
      ? [
          {
            name: 'Pós-Graduação',
            children: postGraduationCourses,
          },
        ]
      : []),
    ...(graduationCourses?.length
      ? [
          {
            name: 'Graduação',
            children: graduationCourses,
          },
        ]
      : []),
    ...(extensionProjects?.length
      ? [
          {
            name: 'Extensão',
            children: extensionProjects,
          },
        ]
      : []),
    ...(researchProjects?.length
      ? [
          {
            name: 'Pesquisa',
            children: researchProjects,
          },
        ]
      : []),
    {
      name: 'Agendas',
    },
  ]

  return sections
}

export const getNavigationSections = unstable_cache(
  async () => getNavigationSectionsUncached(),
  ['navigation'],
  {
    tags: ['navigation'],
    revalidate: 60 * 60,
  },
)
