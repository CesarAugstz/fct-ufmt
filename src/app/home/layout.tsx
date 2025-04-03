import { Navbar } from '@/components/home/components/navbar'
import { Header } from '@/components/home/components/header'
import  NavItems  from '@/components/home/components/nav-items/nav-items'
import { SiteFooter } from '@/components/home/components/site-footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Header />
      <NavItems />
      <div className="min-h-[80vh] flex flex-col">{children}</div>
      <SiteFooter />
    </div>
  )
}
