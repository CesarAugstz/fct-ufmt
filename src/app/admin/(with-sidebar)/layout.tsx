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
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  )
}
