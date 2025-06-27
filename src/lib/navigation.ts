import { db } from '@/server/db'
import { CourseNature } from '@prisma/client'
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

  const graduationCourses = courses
    ?.filter(c => c.nature === CourseNature.GRADUATION)
    ?.map(c => ({ name: c.name, href: `/home/courses/${c.slug}` }))

  const postGraduationCourses = courses
    ?.filter(c => c.nature === CourseNature.POST_GRADUATION)
    ?.map(c => ({ name: c.name, href: `/home/courses/${c.slug}` }))

  const sections: Section[] = [
    {
      name: 'O Instituto',
      href: '/home',
      children: [
        { name: 'História' },
        { name: 'Gestão' },
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
    {
      name: 'Pós-Graduação',
      children: postGraduationCourses,
    },
    {
      name: 'Graduação',
      href: '/home/courses',
      children: graduationCourses,
    },
    {
      name: 'Espaço Do Aluno',
      children: [
        { name: 'Perguntas Frequentes' },
        { name: 'Acesso ao AVA e PA' },
        { name: 'Polos' },
      ],
    },
    {
      name: 'Extensão',
    },
    {
      name: 'Pesquisa',
    },
    {
      name: 'Agendas',
    },
  ]

  return sections
}

export const getNavigationSections = unstable_cache(
  getNavigationSectionsUncached,
  ['navigation-sections'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['navigation', 'courses'],
  },
)
