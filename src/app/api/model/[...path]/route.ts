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

const removeBigKeysFromObject = (obj: unknown): unknown => {
  if (typeof obj === 'string') {
    return obj.length > 1000 ? obj.slice(0, 1000) + '...' : obj
  }

  if (!obj || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Buffer) {
    return 'Buffer'
  }

  if (Array.isArray(obj)) {
    return obj.map(removeBigKeysFromObject)
  }

  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    result[key] = removeBigKeysFromObject(value)
  }
  return result
}

const getBody = async (req: Request): Promise<unknown> => {
  try {
    const reqClone = req.clone()
    const body = await reqClone.json()
    return removeBigKeysFromObject(body)
  } catch (error) {
    console.error('Error parsing request body:', error)
    return null
  }
}

const saveLogSafe = async (logEntry: Prisma.LogEntryCreateInput) => {
  try {
    await db.logEntry.create({ data: logEntry })
  } catch (error) {
    console.error('Error saving log entry:', error)
  }
}

const getResponseBodySafe = async (
  response: NextResponse,
): Promise<string | null> => {
  try {
    const clone = response.clone()
    const responseBody = await clone.text()
    return responseBody.length > 1000
      ? responseBody.slice(0, 1000) + '...'
      : responseBody
  } catch (error) {
    console.error('Error getting response body:', error)
    return null
  }
}

const serializeError = (error: unknown): string | null => {
  if (!error) return null

  try {
    if (error instanceof Error) {
      return JSON.stringify({
        name: error.name,
        message: error.message,
        stack: error.stack,
      })
    }
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

const safeStringify = (obj: unknown): string => {
  try {
    return JSON.stringify(obj)
  } catch {
    return String(obj)
  }
}

const getHeadersSafe = (headers: Headers): Record<string, string> | null => {
  try {
    return Object.fromEntries(headers.entries())
  } catch (error) {
    console.error('Error getting headers:', error)
    return null
  }
}

const handlerWithLogging = async (req: NextRequest, ctx: Context) => {
  console.log('Request:', req.method, req.url)
  const user = await getCurrentUser()
  const reqClone = req.clone()
  let error: Error | unknown
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
      response_headers: safeStringify(
        getHeadersSafe(result?.headers ?? new Headers()),
      ),
      response_body: await getResponseBodySafe(result!),
      response_status: result?.status,
    }

    const log: Prisma.LogEntryCreateInput = {
      ...(user ? { user: { connect: { id: user.id } } } : {}),
      endpoint: req.url,
      method: req.method,
      body: safeStringify(await getBody(reqClone)),
      params: safeStringify(await ctx.params),
      ...response,
      ip,
      userAgent,
      isError: error !== undefined || result?.ok === false,
      error: serializeError(error),
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
