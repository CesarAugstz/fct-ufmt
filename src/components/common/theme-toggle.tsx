'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useColorScheme } from '@mui/material'

interface ThemeToggleProps {
  className?: string
  buttonProps?: Parameters<typeof Button>['0']
}

export function ThemeToggle({ className, buttonProps }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { setMode } = useColorScheme()

  React.useEffect(() => {
    document.documentElement.setAttribute(
      'data-color-mode',
      resolvedTheme || 'light',
    )
  }, [resolvedTheme, theme])

  const onClick = React.useCallback(() => {
    const updatedTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(updatedTheme)
    setMode(updatedTheme)
  }, [setMode, setTheme, theme])

  return (
    <Button
      variant="outline"
      size="icon"
      className={className}
      onClick={onClick}
      {...buttonProps}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
