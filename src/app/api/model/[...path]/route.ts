import { getCurrentUser } from '@/server/auth'
import { db } from '@/server/db'
import { Prisma } from '@prisma/client'
import { enhance } from '@zenstackhq/runtime'
import { NextRequestHandler } from '@zenstackhq/server/next'
import { NextRequest } from 'next/server'

type Context = {
  params: Promise<{
    path: string[]
  }>
}

async function getPrisma() {
  const user = await getCurrentUser()
  return enhance(db, { user: user ?? undefined }, { logPrismaQuery: true })
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true })

const saveLogSafe = async (logEntry: Prisma.LogEntryCreateInput) => {
  try {
    await db.logEntry.create({ data: logEntry })
  } catch (error) {
    console.error('Error saving log entry:', error)
  }
}

const handlerWithLogging = async (req: NextRequest, ctx: Context) => {
  console.log('Request:', req.method, req.url)
  const user = await getCurrentUser()
  let error: any

  try {
    const result = await handler(req, ctx)
    return result
  } catch (err) {
    error = err
    throw err
  } finally {
    const ip =
      req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')
    const userAgent = req.headers.get('user-agent')

    await saveLogSafe({
      ...(user ? { user: { connect: { id: user.id } } } : {}),
      endpoint: req.url,
      method: req.method,
      body: req.body ? JSON.stringify(req.body) : undefined,
      params: JSON.stringify(ctx.params),
      ip,
      userAgent,
      isError: error !== undefined,
      error: error ? JSON.stringify(error) : undefined,
    })
  }
}

export {
  handlerWithLogging as DELETE,
  handlerWithLogging as GET,
  handlerWithLogging as PATCH,
  handlerWithLogging as POST,
  handlerWithLogging as PUT,
}
