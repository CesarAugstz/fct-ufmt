import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { CourseNature, Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateProfessorData } from './professor-generator'
import { getRandomProfessorImage } from './mock-images'
import {
  generateRandomContentBlocks,
  ContentBlockData,
} from './content-blocks-generator'

const prisma = new PrismaClient()

const shouldClean = process.argv.includes('--clean')
const seedAll = process.argv.includes('--all')
const adminPassword =
  process.argv.find(arg => arg.startsWith('--password='))?.split('=')[1] ||
  'admin'

async function cleanDatabase() {
  console.log('🧹 Cleaning database...')
  await prisma.professor.deleteMany()
  await prisma.user.deleteMany()
  await prisma.course.deleteMany()
  console.log('✅ Database cleaned')
}

async function main() {
  if (shouldClean) await cleanDatabase()

  if (adminPassword) {
    await prisma.user.upsert({
      where: {
        email: 'dev.caugustoaf@gmail.com',
      },
      create: {
        name: 'Cesar Filho',
        email: 'dev.caugustoaf@gmail.com',
        password: bcrypt.hashSync(adminPassword),
        role: 'ADMIN',
      },
      update: {},
    })
  }

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

  const existingManagement = await prisma.management.findFirst()
  if (!existingManagement) {
    await prisma.management.create({
      data: {},
    })
  }

  if (!seedAll) return

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
                password: professorData.user.password
                  ? bcrypt.hashSync(professorData.user.password)
                  : null,
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

  console.log('📚 Creating FAQ categories and items...')

  async function createContentBlocks(
    faqItemId: string,
    contentBlocks: ContentBlockData[],
  ) {
    for (const blockData of contentBlocks) {
      let fileId: string | undefined

      if (blockData.nature === 'IMAGE' && blockData.imageData) {
        const attachment = await prisma.attachment.create({
          data: {
            name: blockData.imageData.name,
            dataUrl: blockData.imageData.dataUrl,
            mimeType: blockData.imageData.mimeType,
            size: blockData.imageData.size,
          },
        })
        fileId = attachment.id
      }

      await prisma.contentBlock.create({
        data: {
          nature: blockData.nature,
          content: blockData.content,
          size: blockData.size,
          gridSize: blockData.gridSize,
          alignment: blockData.alignment,
          withBorder: blockData.withBorder || false,
          order: blockData.order || 0,
          caption: blockData.caption,
          accordionItems: blockData.accordionItems || [],
          fileId,
          faqItemId,
        },
      })
    }
  }

  for (const course of courses) {
    const createdCourse = await prisma.course.findUnique({
      where: { name: course.name },
    })

    if (!createdCourse) continue

    const faqCategory = await prisma.faqCategory.create({
      data: {
        name: 'Informações Gerais',
        description: 'Perguntas frequentes sobre o curso',
        order: 0,
        courseId: createdCourse.id,
      },
    })

    const faqItems = [
      {
        title: 'Como me inscrever no curso?',
        slug: formatToSlug('Como me inscrever no curso'),
        order: 0,
        published: true,
        categoryId: faqCategory.id,
      },
      {
        title: 'Quais são os requisitos para ingressar?',
        slug: formatToSlug('Quais são os requisitos para ingressar'),
        order: 1,
        published: true,
        categoryId: faqCategory.id,
      },
      {
        title: 'Qual a duração do curso?',
        slug: formatToSlug('Qual a duração do curso'),
        order: 2,
        published: true,
        categoryId: faqCategory.id,
      },
    ]

    for (const faqItemData of faqItems) {
      const faqItem = await prisma.faqItem.create({
        data: faqItemData,
      })

      if (faqItemData.title === 'Como me inscrever no curso?') {
        const contentBlocks = generateRandomContentBlocks('faq')
        await createContentBlocks(faqItem.id, contentBlocks)
      }
    }
  }

  console.log('✅ FAQ categories and items created')
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
