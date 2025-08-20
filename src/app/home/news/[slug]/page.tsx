import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NewsDetail from '@/components/home/news/news-detail'
import { getNewsWithRelated } from '@/lib/server-cached/news-data'
import { getCollegeData } from '@/lib/server-cached/college-data'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const [newsData, collegeData] = await Promise.all([
    getNewsWithRelated(slug),
    getCollegeData(),
  ])

  if (!newsData?.news) {
    return {
      title: 'Notícia não encontrada',
      description: 'A notícia solicitada não foi encontrada.',
    }
  }

  const { news } = newsData
  const baseUrl = process.env.BASE_URL || 'https://fct.ufmt.br'
  const collegeName = collegeData?.name || 'Faculdade de Computação UFMT'
  const collegeAcronym = collegeData?.acronym || 'FCT-UFMT'

  const imageUrl = news.featuredImage?.dataUrl || '/ufmt-logo.png'
  const fullImageUrl = imageUrl.startsWith('http')
    ? imageUrl
    : `${baseUrl}${imageUrl}`

  const newsUrl = `${baseUrl}/home/news/${slug}`

  return {
    title: `${news.title} - ${collegeName}`,
    description: news.excerpt || `Leia sobre ${news.title} na ${collegeName}`,
    keywords: [
      news.title,
      news.category?.name || '',
      `notícias ${collegeAcronym}`,
      collegeName,
      'universidade federal mato grosso',
      'tecnologia',
      'ciência da computação',
    ].filter(Boolean),
    authors: [{ name: news.author || collegeName }],
    creator: news.author || collegeName,
    publisher: 'Universidade Federal de Mato Grosso',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: newsUrl,
      title: news.title,
      description: news.excerpt || `Leia sobre ${news.title} na ${collegeName}`,
      siteName: collegeName,
      publishedTime: news.publishedAt?.toISOString(),
      modifiedTime: news.updatedAt.toISOString(),
      section: news.category?.name,
      tags: [news.category?.name || '', collegeAcronym, 'Computação'].filter(
        Boolean,
      ),
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: news.featuredImage?.name || `Imagem da notícia: ${news.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.excerpt || `Leia sobre ${news.title} na ${collegeName}`,
      images: [fullImageUrl],
      creator: collegeData?.instagram
        ? `@${collegeData.instagram.replace('@', '')}`
        : '@ufmt_oficial',
    },
    alternates: {
      canonical: newsUrl,
    },
    category: 'education',
    other: {
      'article:author': news.author || collegeName,
      'article:section': news.category?.name || '',
      'article:published_time': news.publishedAt?.toISOString() || '',
      'article:modified_time': news.updatedAt.toISOString(),
    },
  }
}

export default async function NewsPage({ params }: Props) {
  const slug = (await params).slug
  const newsData = await getNewsWithRelated(slug)

  if (!newsData) {
    notFound()
  }

  return <NewsDetail data={newsData} />
}
