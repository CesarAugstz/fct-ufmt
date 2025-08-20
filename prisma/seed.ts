import { formatToSlug } from '@/lib/formatters/slug.formatter'
import { CourseNature, Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
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
  'admin123'

// Function to convert image to base64
function getImageAsBase64(imagePath: string): string {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    const imageBuffer = fs.readFileSync(fullPath)
    const base64 = imageBuffer.toString('base64')
    const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg'
    return `data:${mimeType};base64,${base64}`
  } catch (error) {
    console.warn(`Could not read image ${imagePath}:`, error)
    return ''
  }
}

async function cleanDatabase() {
  console.log('🧹 Cleaning database...')
  await prisma.professor.deleteMany()
  await prisma.user.deleteMany()
  await prisma.course.deleteMany()
  await prisma.management.deleteMany()
  await prisma.collegeData.deleteMany()
  await prisma.personalization.deleteMany()
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

  console.log('🏛️ Creating college data...')

  const bannerImageBase64 = getImageAsBase64('bg.png')
  const bannerImage = await prisma.attachment.upsert({
    where: { id: 'banner-bg' },
    update: {},
    create: {
      id: 'banner-bg',
      name: 'bg.png',
      dataUrl: bannerImageBase64,
      mimeType: 'image/png',
      size: bannerImageBase64.length,
    },
  })

  await prisma.collegeData.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      name: 'Faculdade de Ciência e Tecnologia',
      acronym: 'FCT',
      description:
        'A FCT da UFMT é referência em ensino, pesquisa e extensão na área de Tecnologia da Informação.',

      // Banner data
      bannerTitle: 'Educação que conecta ciência, tecnologia e sociedade',
      bannerButtonLabel: 'Conheça nossos cursos',

      // Second banner data
      secondBannerTitle: 'A Faculdade de Ciência e Tecnologia',
      secondBannerSubtitle:
        'Localizado no Campus Universitário da UFMT em Cuiabá, o Instituto de Ciência e Tecnologia é referência na formação de profissionais da área de tecnologia no estado de Mato Grosso.',
      secondBannerButtonLabel: 'Saiba mais sobre a História da FCT',

      // Connect banner image
      bannerImage: {
        connect: { id: bannerImage.id },
      },

      // Quick links data
      quickLinks: [
        {
          title: 'Portal Acadêmico',
          subtitle: 'Acesse o portal acadêmico da UFMT',
          icon: 'MonitorCog',
          url: 'https://portal.setec.ufmt.br/ufmt-setec-portal-academico/',
          color: 'blue',
        },
        {
          title: 'Acessos SEI',
          subtitle: 'Sistema Eletrônico de Informações',
          icon: 'SeiLogo',
          url: 'https://sei.ufmt.br/sei/controlador_externo.php?acao=usuario_externo_logar&acao_origem=usuario_externo_enviar_cadastro&id_orgao_acesso_externo=0',
          color: 'green',
        },
        {
          title: 'Reserva de Salas',
          subtitle: 'Agende salas e recursos',
          icon: 'Calendar',
          url: 'https://academico-siga.ufmt.br/ufmt.sirefi',
          color: 'orange',
        },
        {
          title: 'Suporte',
          subtitle: 'Entre em contato com o suporte',
          icon: 'Settings',
          url: 'https://wa.me/556536158078',
          color: 'red',
        },
        {
          title: 'Painel de Indicadores',
          subtitle: 'Visualize estatísticas e dados',
          icon: 'FileUser',
          url: '#',
          color: 'purple',
        },
        {
          title: 'Localização',
          subtitle: 'Veja como chegar à FCT-UFMT',
          icon: 'Map',
          url: 'https://maps.app.goo.gl/Rvrw2gXvc3E65edu9',
          color: 'yellow',
        },
      ],

      // Stats section data
      bannerNumbersTitle: 'FCT em Números',
      bannerNumbersSubtitle:
        'Conheça alguns números que representam nossa excelência em ensino, pesquisa e extensão.',
      bannerNumbersItems: [
        {
          title: 'Cursos de Graduação',
          value: 2,
          suffix: '',
        },
        {
          title: 'Programa de Mestrado',
          value: 1,
          suffix: '',
        },
        {
          title: 'Docentes',
          value: 30,
          suffix: '+',
        },
        {
          title: 'Estudantes',
          value: 500,
          suffix: '+',
        },
      ],

      // Contact and location data
      locationItems: [
        'Av. Fernando Corrêa da Costa, nº 2367',
        'Bairro Boa Esperança',
        'Cuiabá - MT, CEP: 78060-900',
      ],
      contactItems: [
        '(65) 3615-8078',
        'diretoria.fct@ufmt.br',
        'Segunda a Sexta, 8h às 18h',
      ],

      // Useful links
      usefulLinksItems: [
        {
          title: 'Portal da UFMT',
          url: 'https://sistemas.ufmt.br/ufmt.portalsistemas',
        },
        {
          title: 'Biblioteca Central',
          url: '#',
        },
        {
          title: 'Ouvidoria',
          url: '#',
        },
        {
          title: 'Mapa do Site',
          url: '#',
        },
        {
          title: 'Calendário Acadêmico',
          url: '#',
        },
        {
          title: 'Editais',
          url: '#',
        },
        {
          title: 'Eventos',
          url: '#',
        },
        {
          title: 'Notícias',
          url: '#',
        },
      ],

      // Social media
      instagram: 'https://www.instagram.com/fct.ufmt/',
      youtube: 'https://www.youtube.com/@DiretoriadaFCT',
    },
  })
  console.log('✅ College data created')

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
