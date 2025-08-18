import { unstable_cache } from 'next/cache'
import { db } from '@/server/db'

export const getProjectData = unstable_cache(
  async (slug: string) => {
    return await db.project.findUnique({
      where: { slug },
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
