import { unstable_cache } from 'next/cache'
import { db } from '@/server/db'

export const getLatestNews = unstable_cache(
  async (limit: number = 5) => {
    const news = await db.news.findMany({
      where: {
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        featuredImage: true,
      },
      orderBy: [{ isPinned: 'desc' }, { publishedAt: 'desc' }],
      take: limit,
    })

    return news
  },
  ['latest-news'],
  {
    tags: ['news'],
    revalidate: 60 * 5, // 5 minutes
  },
)

export const getFeaturedNews = unstable_cache(
  async (limit: number = 2) => {
    const news = await db.news.findMany({
      where: {
        status: 'PUBLISHED',
        isPinned: true,
      },
      include: {
        category: true,
        featuredImage: true,
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    })

    return news
  },
  ['featured-news'],
  {
    tags: ['news'],
    revalidate: 60 * 5, // 5 minutes
  },
)
