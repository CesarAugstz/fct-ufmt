import Markdown from '@/components/common/blocks/markdown'
import Title from '@/components/common/blocks/title'
import { db } from '@/server/db'
import { BlockContentType } from '@/types/admin/block-components.types'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

const getPageData = unstable_cache(
  async (slug: string[]) => {
  const page = await db.page.findUnique({
    where: {
      slug: slug.join('/'),
    },
    include: {
      blockComponents: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  })
  return page
}, ['pages'])

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
    {page.blockComponents.map((block) => {
      switch (block.blockType) {
        case 'TITLE':
          const props = block.content as BlockContentType<'TITLE'>
          return <Title key={block.id} 
          title={props.title}
          subtitle={props.subtitle}
          backgroundImage={props.backgroundImage}
          height={props.height}
          />
        case 'MARKDOWN':
          const markdownProps = block.content as BlockContentType<'MARKDOWN'>
          return <Markdown key={block.id} content={markdownProps.content} />
        default:
          throw new Error(`Unknown block type: ${block.blockType}`)
      }
    })
    }
    </>
  )
}
