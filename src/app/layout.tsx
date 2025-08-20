import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Providers } from '@/components/providers/providers'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { db } from '@/server/db'
import { generateCSSVariables } from '@/lib/css-generator'
import { mapPersonalizationToColors } from '@/utils/mappers/personalization-mapper'
import { defaultColors } from '@/store/personalization-store'

const inter = Montserrat({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'FCT - UFMT',
  description: 'FCT - UFMT',
}

async function getPersonalizationColors() {
  try {
    const personalization = await db.personalization.findFirst()
    return personalization
      ? mapPersonalizationToColors(personalization)
      : defaultColors
  } catch {
    return defaultColors
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const colors = await getPersonalizationColors()
  console.log('colors', {
    colors,
    css: generateCSSVariables(colors),
  })

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: generateCSSVariables(colors),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers
          themeProps={{ enableSystem: true, defaultTheme: 'system' }}
          initialColors={colors}
        >
          {children}
        </Providers>
        <Toaster richColors position="bottom-center" />

        <Analytics />
        <SpeedInsights />

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sczi3ogvvn");
          `}
        </Script>
      </body>
    </html>
  )
}
