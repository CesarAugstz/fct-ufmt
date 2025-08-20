import { NavbarGov } from '@/components/home/components/navbar-gov'
import { Header } from '@/components/home/components/header'
import NavItems from '@/components/home/components/nav-items/nav-items'
import { SiteFooter } from '@/components/home/components/site-footer'
import { getCollegeData } from '@/lib/server-cached/college-data'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const collegeData = await getCollegeData()

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarGov />
      <Header collegeData={collegeData} />
      <NavItems />
      <div className="min-h-[80vh] flex flex-col">{children}</div>
      <SiteFooter collegeData={collegeData} />
    </div>
  )
}
