'use server'
import { revalidateTag } from 'next/cache'

export async function invalidatePagesCache() {
  revalidateTag('pages')
  revalidateTag('sections')
}
