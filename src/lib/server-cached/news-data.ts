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
    revalidate: 60 * 5,
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
    revalidate: 60 * 5,
  },
)

export const getNewsBySlug = unstable_cache(
  async (slug: string) => {
    const news = await db.news.findUnique({
      where: {
        slug,
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        featuredImage: true,
        contentBlocks: {
          include: {
            file: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    return news
  },
  ['news-by-slug'],
  {
    tags: ['news'],
    revalidate: 60 * 5,
  },
)

export const getNewsWithRelated = unstable_cache(
  async (slug: string) => {
    const news = await db.news.findUnique({
      where: {
        slug,
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        featuredImage: true,
        contentBlocks: {
          include: {
            file: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!news) return null

    const [relatedNews, allNews] = await Promise.all([
      db.news.findMany({
        where: {
          status: 'PUBLISHED',
          categoryId: news.categoryId,
          NOT: { slug },
        },
        include: {
          featuredImage: true,
        },
        take: 3,
        orderBy: { publishedAt: 'desc' },
      }),
      db.news.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      }),
    ])

    const categories = Array.from(
      new Set(allNews.map(item => item.category.name)),
    )

    return {
      news,
      relatedNews,
      categories,
    }
  },
  ['news-with-related'],
  {
    tags: ['news'],
    revalidate: 60 * 5,
  },
)
