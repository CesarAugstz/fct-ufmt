import { Prisma, PrismaClient, Section } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
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

  type SectionsToCreate = {
    name: string
    children?: SectionsToCreate
  }[]

  const sections: SectionsToCreate = [
    {
      name: 'Pós-Graduação',
      children: [{ name: 'Especialização em Agrocomputação' }],
    },
    {
      name: 'Graduação',
      children: [{ name: 'Bacharelado em Ciência e Tecnologia' }],
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
      name: 'Docentes',
    },
    {
      name: 'Agendas',
    },
  ]

  async function createSections(
    sections: SectionsToCreate,
    parentId: string | null = null,
  ) {
    for (const [i, section] of sections.entries()) {
      const existingSection = await prisma.section.findFirst({
        where: { name: section.name },
      })

      if (existingSection) break

      const createdSection = await prisma.section.create({
        data: {
          name: section.name,
          parentId,
          order: i,
        },
      })

      if (section.children && section.children.length > 0) {
        await createSections(section.children, createdSection.id)
      }
    }
  }

  await createSections(sections)
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
