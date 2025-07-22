import { unstable_cache } from 'next/cache'
import { db } from '@/server/db'

export const getManagementData = unstable_cache(
  async () => {
    return await db.management.findFirst({
      include: {
        contentBlocks: {
          include: { file: true },
          orderBy: { order: 'asc' },
        },
      },
    })
  },
  ['management'],
  {
    tags: ['management'],
    revalidate: 60 * 60,
  },
)
