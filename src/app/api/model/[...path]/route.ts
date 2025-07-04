import { getCurrentUser } from '@/server/auth'
import { db } from '@/server/db'
import { Prisma } from '@prisma/client'
import { enhance } from '@zenstackhq/runtime'
import { NextRequestHandler } from '@zenstackhq/server/next'
import { NextRequest, NextResponse } from 'next/server'

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

const getResponseBodySafe = async (response: NextResponse) => {
  try {
    const clone = response.clone()
    const responseBody = await clone.text()
    return responseBody.length > 1000
      ? responseBody.slice(0, 1000) + '...'
      : responseBody
  } catch (error) {
    console.error('Error getting response body:', error)
    return undefined
  }
}

const getHeadersSafe = (headers: Headers) => {
  try {
    return Object.fromEntries(headers.entries())
  } catch (error) {
    console.error('Error getting headers:', error)
    return undefined
  }
}

const handlerWithLogging = async (req: NextRequest, ctx: Context) => {
  console.log('Request:', req.method, req.url)
  const user = await getCurrentUser()
  let error: any
  let result: NextResponse | undefined

  try {
    result = await handler(req, ctx)
    return result
  } catch (err) {
    console.log('Error on api:', err)
    error = err
    throw err
  } finally {
    const ip =
      req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for')
    const userAgent = req.headers.get('user-agent')

    const response = {
      response_headers: JSON.stringify(
        getHeadersSafe(result?.headers ?? new Headers()),
      ),
      response_body: await getResponseBodySafe(result!),
      response_status: result?.status,
    }

    const log: Prisma.LogEntryCreateInput = {
      ...(user ? { user: { connect: { id: user.id } } } : {}),
      endpoint: req.url,
      method: req.method,
      body: req.body ? JSON.stringify(req.body) : undefined,
      params: JSON.stringify(await ctx.params),
      ...response,
      ip,
      userAgent,
      isError: error !== undefined || result?.ok === false,
      error: error ? JSON.stringify(error) : undefined,
    }

    await saveLogSafe(log)
  }
}

export {
  handlerWithLogging as DELETE,
  handlerWithLogging as GET,
  handlerWithLogging as PATCH,
  handlerWithLogging as POST,
  handlerWithLogging as PUT,
}
