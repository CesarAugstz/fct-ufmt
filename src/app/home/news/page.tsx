import type { Metadata } from 'next'
import News from '@/components/home/news/news'
import { getCollegeData } from '@/lib/server-cached/college-data'

export async function generateMetadata(): Promise<Metadata> {
  const collegeData = await getCollegeData()
  const baseUrl = process.env.BASE_URL || 'https://fct.ufmt.br'
  const collegeName = collegeData?.name || 'Faculdade de Computação UFMT'
  const collegeAcronym = collegeData?.acronym || 'FCT-UFMT'

  return {
    title: `Notícias - ${collegeName}`,
    description: `Acompanhe as últimas notícias, eventos e acontecimentos da ${collegeName}.`,
    keywords: [
      `notícias ${collegeAcronym}`,
      collegeName,
      'eventos acadêmicos',
      'universidade federal mato grosso',
      'tecnologia',
      'ciência da computação',
      'pesquisa científica',
    ],
    authors: [{ name: collegeName }],
    creator: collegeName,
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
      type: 'website',
      locale: 'pt_BR',
      url: `${baseUrl}/home/news`,
      title: `Notícias - ${collegeName}`,
      description: `Acompanhe as últimas notícias, eventos e acontecimentos da ${collegeName}.`,
      siteName: collegeName,
      images: [
        {
          url: collegeData?.logo?.dataUrl || '/ufmt-logo.png',
          width: 1200,
          height: 630,
          alt: `Logo da ${collegeName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Notícias - ${collegeName}`,
      description: `Acompanhe as últimas notícias, eventos e acontecimentos da ${collegeName}.`,
      images: [collegeData?.logo?.dataUrl || '/ufmt-logo.png'],
      creator: collegeData?.instagram
        ? `@${collegeData.instagram.replace('@', '')}`
        : '@ufmt_oficial',
    },
    alternates: {
      canonical: `${baseUrl}/home/news`,
    },
    category: 'education',
  }
}

export default function Page() {
  return <News />
}
