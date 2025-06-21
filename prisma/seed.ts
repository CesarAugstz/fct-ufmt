import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { CourseNature, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const shouldClean = process.argv.includes('--clean')

async function cleanDatabase() {
  console.log('🧹 Cleaning database...')
  await prisma.user.deleteMany()
  await prisma.course.deleteMany()
  console.log('✅ Database cleaned')
}

async function main() {
  if (shouldClean) await cleanDatabase()

  const courses = [
    {
      name: 'Ciência e Tecnologia',
      nature: CourseNature.GRADUATION,
      slug: formatToSlug('Ciência e Tecnologia'),
      description:
        'O curso de Ciência e Tecnologia visa formar profissionais capacitados para atuar em diversas áreas da ciência e tecnologia, com foco em resolução de problemas e inovação.',
    },
    {
      name: 'Engenharia de Software',
      nature: CourseNature.GRADUATION,
      slug: formatToSlug('Engenharia de Software'),
      description:
        'O curso de Engenharia de Software visa formar profissionais capacitados para atuar na área de desenvolvimento de software, com foco em metodologias ágeis e qualidade de software.',
    },
    {
      name: 'Licenciatura em Ciências Naturais e Matemática',
      nature: CourseNature.GRADUATION,
      slug: formatToSlug('Licenciatura em Ciências Naturais e Matemática'),
      description:
        'O curso de Licenciatura em Ciências Naturais e Matemática visa formar professores capacitados para atuar na área de ensino de ciências naturais e matemática, com foco em metodologias de ensino e aprendizagem.',
    },
  ]

  for (const course of courses) {
    await prisma.course.upsert({
      where: {
        name: course.name,
      },
      update: {},
      create: {
        ...course,
      },
    })
  }

  await prisma.user.upsert({
    where: {
      email: 'cgl@email.com',
    },
    create: {
      name: 'CGL - test user',
      email: 'cgl@email.com',
      password: bcrypt.hashSync('password123'),
      role: 'ADMIN',
    },
    update: {},
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
