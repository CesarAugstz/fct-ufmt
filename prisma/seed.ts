import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const courses = [
    {
      name: 'Ciência e Tecnologia',
    },
    {
      name: 'Engenharia de Software',
    },
    {
      name: 'Licenciatura em Ciências Naturais e Matemática',
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
