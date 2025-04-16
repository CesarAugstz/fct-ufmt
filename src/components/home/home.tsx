import { ContentTabs } from './components/content-tabs/content-tabs'
import { StatsSection } from './components/content-tabs/components/stats-section'
import { HeroBanner } from './components/hero-banner'
import QuickLinksSection from './components/content-tabs/components/quick-links-section'
import CardHeroMadrid from '../common/card-hero-madrid'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroBanner />
      <ContentTabs />
      <QuickLinksSection/>
      <CardHeroMadrid />
      <StatsSection />
    </div>
  )
}
