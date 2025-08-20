'use client'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { PersonalizationProvider } from '@/components/providers/personalization-provider'
import { Provider as JotaiProvider } from 'jotai'
import { MuiThemeProvider } from './mui-theme-provider'
import { PersonalizationColors } from '@/store/personalization-store'

interface ProvidersProps {
  children: ReactNode
  initialColors?: PersonalizationColors
  themeProps?: {
    enableSystem?: boolean
    defaultTheme?: string
  }
}

export function Providers({
  children,
  initialColors,
  themeProps,
}: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={themeProps?.defaultTheme || 'system'}
      enableSystem={themeProps?.enableSystem}
      disableTransitionOnChange
    >
      <JotaiProvider>
        <MuiThemeProvider>
          <QueryProvider>
            <PersonalizationProvider initialColors={initialColors}>
              <AuthProvider>{children}</AuthProvider>
            </PersonalizationProvider>
          </QueryProvider>
        </MuiThemeProvider>
      </JotaiProvider>
    </ThemeProvider>
  )
}
