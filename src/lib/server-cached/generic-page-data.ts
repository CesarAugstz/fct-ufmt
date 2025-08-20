import { unstable_cache } from 'next/cache'
import { db } from '@/server/db'

export const getGenericPageData = unstable_cache(
  async (slugs: string[]) => {
    console.log('getGenericPageData', slugs)

    if (slugs.length === 1) {
      const slug = slugs[0]
      return await db.genericPage.findFirst({
        where: {
          slug,
          sectionId: null,
        },
        include: {
          contentBlocks: {
            include: { file: true },
            orderBy: { order: 'asc' },
          },
        },
      })
    }

    if (slugs.length < 2) return null

    console.log('where', {
      slug: slugs.at(-1),
      section: {
        slug: slugs.at(-2),
        ...(slugs.at(-3) ? { parent: { slug: slugs.at(-3) } } : {}),
      },
    })

    const section = slugs.at(-2)
    const slug = slugs.at(-1)
    const subSection = slugs.at(-3)

    if (!section && !slug) return null

    return await db.genericPage.findUnique({
      where: {
        slug,
        section: {
          slug: section,
          ...(subSection ? { parent: { slug: subSection } } : {}),
        },
      },
      include: {
        contentBlocks: {
          include: { file: true },
          orderBy: { order: 'asc' },
        },
      },
    })
  },
  ['project'],
  {
    tags: ['project'],
    revalidate: 60 * 60,
  },
)
