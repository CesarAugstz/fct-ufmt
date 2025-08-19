'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateCourses() {
  revalidateTag('courses')
  revalidateTag('navigation')
}

export async function revalidateNews() {
  revalidateTag('news')
  revalidateTag('latest-news')
  revalidateTag('featured-news')
}

export async function revalidateProjects() {
  revalidateTag('navigation')
  revalidateTag('projects')
}

export async function revalidateManagement() {
  revalidateTag('management')
}

export async function revalidateGenericPages() {
  revalidateTag('generic-pages')
  revalidateTag('navigation')
}

export async function revalidateSections() {
  revalidateTag('sections')
  revalidateTag('navigation')
  revalidateTag('generic-pages')
}
