import { PrismaClient } from '@prisma/client'

const createPrismaClient = () => {
  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
  })
  prisma.$on('query' as never, (e: any) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
  })
  return prisma
}

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
