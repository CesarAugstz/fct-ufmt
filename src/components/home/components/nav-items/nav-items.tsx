import { getNavigationSections } from '@/lib/navigation'
import NavItemsClient from './nav-items-client'

export default async function NavItems() {
  const sections = await getNavigationSections()

  return <NavItemsClient sections={sections} />
}
