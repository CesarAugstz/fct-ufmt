import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/providers'
import { Toaster } from '@/components/ui/sonner'

const inter = Montserrat({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FCT - UFMT',
  description: 'FCT - UFMT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers themeProps={{ enableSystem: true, defaultTheme: 'system' }}>
          {children}
        </Providers>
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  )
}
