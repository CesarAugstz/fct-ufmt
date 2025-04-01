import { ContentTabs } from "./components/content-tabs/content-tabs";
import { StatsSection } from "./components/content-tabs/components/stats-section";
import { Header } from "./components/header";
import { HeroBanner } from "./components/hero-banner";
import { NavItems } from "./components/nav-items";
import { Navbar } from "./components/navbar";
import { QuickLinks } from "./components/quick-links";
import { SiteFooter } from "./components/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroBanner />
      <QuickLinks />
      <ContentTabs />
      <StatsSection />
    </div>
  )
}
