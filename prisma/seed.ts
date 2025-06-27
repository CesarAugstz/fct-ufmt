import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { CourseNature, Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateProfessorData } from './professor-generator'
import { getRandomProfessorImage } from './mock-images'

const prisma = new PrismaClient()

const shouldClean = process.argv.includes('--clean')

async function cleanDatabase() {
  console.log('🧹 Cleaning database...')
  await prisma.professor.deleteMany()
  await prisma.user.deleteMany()
  await prisma.course.deleteMany()
  console.log('✅ Database cleaned')
}

async function main() {
  if (shouldClean) await cleanDatabase()

  const courses: Prisma.CourseCreateInput[] = [
    {
      name: 'Ciência e Tecnologia',
      nature: CourseNature.GRADUATION,
      slug: formatToSlug('Ciência e Tecnologia'),
      description:
        'O curso de Ciência e Tecnologia visa formar profissionais capacitados para atuar em diversas áreas da ciência e tecnologia, com foco em resolução de problemas e inovação.',
      aboutContentBlocks: {
        createMany: {
          data: [
            {
              nature: 'TEXT',
              content:
                'O curso de Ciência e Tecnologia visa formar profissionais capacitados para atuar em diversas áreas da ciência e tecnologia, com foco em resolução de problemas e inovação.',
            },
            {
              nature: 'TEXT',
              content:
                'O curso de Ciência e Tecnologia visa formar profissionais capacitados para atuar em diversas áreas da ciência e tecnologia, com foco em resolução de problemas e inovação.',
            },
          ],
        },
      },
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

  await prisma.$transaction(
    courses.map(course =>
      prisma.course.upsert({
        where: {
          name: course.name,
        },
        update: {},
        create: {
          ...course,
        },
      }),
    ),
  )

  console.log('🧑‍🏫 Creating professors...')

  const professorsPromises: Promise<void>[] = []

  for (const course of courses) {
    const createdCourse = await prisma.course.findUnique({
      where: { name: course.name },
    })

    if (!createdCourse) return undefined

    for (let i = 0; i < 40; i++) {
      const professorData = generateProfessorData(course.name)
      const image = getRandomProfessorImage() as string

      professorsPromises.push(
        (async () => {
          try {
            await prisma.user.create({
              data: {
                ...professorData.user,
                password: bcrypt.hashSync(professorData.user.password),
                professor: {
                  create: {
                    ...professorData.professor,
                    image: {
                      create: {
                        dataUrl: image,
                        name: 'profile.jpg',
                        mimeType: 'image/jpeg',
                        size: 1000,
                      },
                    },
                    courses: {
                      connect: { id: createdCourse.id },
                    },
                  },
                },
              },
            })
          } catch {
            console.log(
              `⚠️ Professor already exists: ${professorData.user.email}`,
            )
          }
        })(),
      )
    }
  }

  await Promise.all(professorsPromises)

  console.log('✅ Professors created')

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
