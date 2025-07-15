'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateNavigation() {
  revalidateTag('navigation')
  revalidateTag('courses')
}

export async function revalidateCourses() {
  revalidateTag('courses')
  revalidateTag('navigation')
}

export async function revalidateNews() {
  revalidateTag('news')
  revalidateTag('navigation')
}
