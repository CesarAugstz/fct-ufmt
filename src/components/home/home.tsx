import { HeroBanner } from './components/hero-banner'
import QuickLinksSection from './components/content-tabs/components/quick-links-section'
import CardHeroMadrid from '../common/card-hero-madrid'
import { getFeaturedNews, getLatestNews } from '@/lib/server-cached/news-data'
import { getCollegeData } from '@/lib/server-cached/college-data'
import { BannerNumber, QuickLink } from '@zenstackhq/runtime/models'
import NewsPreview from './components/news-preview/news-preview'
import { StatsSection } from './components/content-tabs/components/stats-section'

export default async function Home() {
  const [latestNews, featuredNews, collegeData] = await Promise.all([
    getLatestNews(),
    getFeaturedNews(),
    getCollegeData(),
  ])

  console.log({
    latestNews,
    featuredNews,
    collegeData,
  })

  return (
    <div className="min-h-screen flex flex-col">
      <HeroBanner
        title={collegeData?.bannerTitle || undefined}
        subtitle={collegeData?.bannerSubtitle || undefined}
        buttonLabel={collegeData?.bannerButtonLabel || undefined}
        bannerImage={collegeData?.bannerImage?.dataUrl}
      />
      <CardHeroMadrid
        title={collegeData?.secondBannerTitle || undefined}
        description={collegeData?.secondBannerSubtitle || undefined}
        buttonLabel={collegeData?.secondBannerButtonLabel || undefined}
        images={collegeData?.secondBannerImages}
      />
      <QuickLinksSection quickLinks={collegeData?.quickLinks as QuickLink[]} />
      <NewsPreview latestNews={latestNews} featuredNews={featuredNews} />
      <StatsSection
        bannerNumbersTitle={collegeData?.bannerNumbersTitle || undefined}
        bannerNumbersSubtitle={collegeData?.bannerNumbersSubtitle || undefined}
        bannerNumbersItems={collegeData?.bannerNumbersItems as BannerNumber[]}
      />
      {/*
       */}
    </div>
  )
}
