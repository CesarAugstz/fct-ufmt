'use client'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Provider as JotaiProvider } from 'jotai'

interface ProvidersProps {
  children: ReactNode
  themeProps?: {
    enableSystem?: boolean
    defaultTheme?: string
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={themeProps?.defaultTheme || 'system'}
      enableSystem={themeProps?.enableSystem}
      disableTransitionOnChange
    >
      <JotaiProvider>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </JotaiProvider>
    </ThemeProvider>
  )
}
