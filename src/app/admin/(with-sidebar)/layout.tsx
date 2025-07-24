import Sidebar from '@/components/admin/sidebar'
import Header from '@/components/admin/header/header'
import { redirect, RedirectType } from 'next/navigation'
import { getCurrentUser } from '@/server/auth'
import { Role } from '@prisma/client'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) redirect('/login', RedirectType.replace)

  if (user.role === Role.PROFESSOR) redirect('/admin/professors-configure')

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className=" pt-20 pb-4 px-4 md:pl-72">
        <div className="fixed top-22 right-4 left-4 md:left-72 bottom-4 overflow-y-scroll bg-muted/30 rounded-xl p-1">
          {children}
        </div>
      </main>
    </div>
  )
}
