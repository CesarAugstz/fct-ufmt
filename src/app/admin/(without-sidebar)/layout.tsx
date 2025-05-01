import Header from '@/components/admin/header/header'
import { redirect, RedirectType } from 'next/navigation'
import { getServerAuthSession } from '@/server/auth'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerAuthSession()

  if (!session?.user?.id) redirect('/login', RedirectType.replace)

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900">
          {children}
        </main>
      </div>
    </div>
  )
}
