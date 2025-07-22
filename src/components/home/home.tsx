import { StatsSection } from './components/content-tabs/components/stats-section'
import { HeroBanner } from './components/hero-banner'
import QuickLinksSection from './components/content-tabs/components/quick-links-section'
import CardHeroMadrid from '../common/card-hero-madrid'
import NewsPreview from './components/news-preview/news-preview'
import { getFeaturedNews, getLatestNews } from '@/lib/server-cached/news-data'

export default async function Home() {
  const latestNews = await getLatestNews()
  const featuredNews = await getFeaturedNews()
  return (
    <div className="min-h-screen flex flex-col">
      <HeroBanner />
      <CardHeroMadrid />
      <QuickLinksSection />
      <NewsPreview latestNews={latestNews} featuredNews={featuredNews} />
      <StatsSection />
    </div>
  )
}
