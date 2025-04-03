import Markdown from '@/components/common/blocks/markdown'
import Title from '@/components/common/blocks/title'
import { db } from '@/server/db'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

const getPageData = unstable_cache(
  async (slug: string[]) => {
  const page = await db.page.findUnique({
    where: {
      slug: slug.join('/'),
    },
  })
  return page
}, ['page'])

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  const page = await getPageData(slug)

  if (!page) return notFound()

  return (
    <>
      <Title title={slug.join(' ') ?? ''} subtitle="Subtítulo do título" />
      page name: {page.name}
    </>
  )
}
