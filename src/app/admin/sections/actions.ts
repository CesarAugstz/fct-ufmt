'use server'
import { revalidateTag } from 'next/cache'

export async function invalidateSectionsCache() {
  revalidateTag('sections')
}
