import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PersonalizationColors {
  lightPrimary: string
  lightPrimaryForeground: string
  lightPrimaryLight: string
  lightSecondary: string
  lightSecondaryForeground: string
  lightBackground: string
  lightBackgroundHover: string
  lightForeground: string
  lightCard: string
  lightCardForeground: string
  lightPopover: string
  lightPopoverForeground: string
  lightMuted: string
  lightMutedForeground: string
  lightAccent: string
  lightAccentForeground: string
  lightDestructive: string
  lightDestructiveForeground: string
  lightWarning: string
  lightWarningForeground: string
  lightBorder: string
  lightInput: string
  lightRing: string

  darkPrimary: string
  darkPrimaryForeground: string
  darkPrimaryLight: string
  darkSecondary: string
  darkSecondaryForeground: string
  darkBackground: string
  darkBackgroundHover: string
  darkForeground: string
  darkCard: string
  darkCardForeground: string
  darkPopover: string
  darkPopoverForeground: string
  darkMuted: string
  darkMutedForeground: string
  darkAccent: string
  darkAccentForeground: string
  darkDestructive: string
  darkDestructiveForeground: string
  darkWarning: string
  darkWarningForeground: string
  darkBorder: string
  darkInput: string
  darkRing: string

  lightSidebarBackground: string
  lightSidebarForeground: string
  lightSidebarPrimary: string
  lightSidebarPrimaryForeground: string
  lightSidebarAccent: string
  lightSidebarAccentForeground: string
  lightSidebarBorder: string
  lightSidebarRing: string

  darkSidebarBackground: string
  darkSidebarForeground: string
  darkSidebarPrimary: string
  darkSidebarPrimaryForeground: string
  darkSidebarAccent: string
  darkSidebarAccentForeground: string
  darkSidebarBorder: string
  darkSidebarRing: string

  chartColor1: string
  chartColor2: string
  chartColor3: string
  chartColor4: string
  chartColor5: string
}

export const defaultColors: PersonalizationColors = {
  lightPrimary: '#0a1f40',
  lightPrimaryForeground: 'oklch(0.97 0.014 254.604)',
  lightPrimaryLight: '#33658aff',
  lightSecondary: '#86bbd8ff',
  lightSecondaryForeground: 'oklch(0.21 0.006 285.885)',
  lightBackground: 'oklch(1 0 0)',
  lightBackgroundHover: 'oklch(0.89 0.05 261.52 / 0.34)',
  lightForeground: 'oklch(0.141 0.005 285.823)',
  lightCard: 'oklch(1 0 0)',
  lightCardForeground: 'oklch(0.141 0.005 285.823)',
  lightPopover: 'oklch(1 0 0)',
  lightPopoverForeground: 'oklch(0.141 0.005 285.823)',
  lightMuted: 'oklch(0.967 0.001 286.375)',
  lightMutedForeground: 'oklch(0.552 0.016 285.938)',
  lightAccent: 'oklch(0.23 0.1575 264.59)',
  lightAccentForeground: 'oklch(0.78 0.0197 285.94)',
  lightDestructive: 'oklch(0.577 0.245 27.325)',
  lightDestructiveForeground: 'oklch(0.97 0.014 254.604)',
  lightWarning: 'oklch(0.89 0.1497 93.45)',
  lightWarningForeground: 'oklch(0.21 0.006 285.885)',
  lightBorder: 'oklch(0.92 0.004 286.32)',
  lightInput: 'oklch(0.92 0.004 286.32)',
  lightRing: 'oklch(0.623 0.214 259.815)',

  darkPrimary: 'oklch(37.763% 0.13704 262.925)',
  darkPrimaryForeground: 'oklch(0.78 0.0767 267.22)',
  darkPrimaryLight: '#33658aff',
  darkSecondary: 'oklch(0.274 0.006 286.033)',
  darkSecondaryForeground: 'oklch(0.985 0 0)',
  darkBackground: 'oklch(0.141 0.005 285.823)',
  darkBackgroundHover: 'oklch(0.25 0.0207 284.83)',
  darkForeground: 'oklch(0.985 0 0)',
  darkCard: 'oklch(0.21 0.006 285.885)',
  darkCardForeground: 'oklch(0.985 0 0)',
  darkPopover: 'oklch(0.21 0.006 285.885)',
  darkPopoverForeground: 'oklch(0.985 0 0)',
  darkMuted: 'oklch(0.274 0.006 286.033)',
  darkMutedForeground: 'oklch(0.705 0.015 286.067)',
  darkAccent: 'oklch(0.274 0.006 286.033)',
  darkAccentForeground: 'oklch(0.985 0 0)',
  darkDestructive: 'oklch(0.704 0.191 22.216)',
  darkDestructiveForeground: 'oklch(0.985 0 0)',
  darkWarning: 'oklch(0.89 0.1497 93.45)',
  darkWarningForeground: 'oklch(0.21 0.006 285.885)',
  darkBorder: 'oklch(1 0 0 / 10%)',
  darkInput: 'oklch(1 0 0 / 15%)',
  darkRing: 'oklch(0.488 0.243 264.376)',

  lightSidebarBackground: 'oklch(0.985 0 0)',
  lightSidebarForeground: 'oklch(0.141 0.005 285.823)',
  lightSidebarPrimary: 'oklch(0.623 0.214 259.815)',
  lightSidebarPrimaryForeground: 'oklch(0.97 0.014 254.604)',
  lightSidebarAccent: 'oklch(0.967 0.001 286.375)',
  lightSidebarAccentForeground: 'oklch(0.21 0.006 285.885)',
  lightSidebarBorder: 'oklch(0.92 0.004 286.32)',
  lightSidebarRing: 'oklch(0.623 0.214 259.815)',

  darkSidebarBackground: 'oklch(0.21 0.006 285.885)',
  darkSidebarForeground: 'oklch(0.985 0 0)',
  darkSidebarPrimary: 'oklch(0.546 0.245 262.881)',
  darkSidebarPrimaryForeground: 'oklch(0.379 0.146 265.522)',
  darkSidebarAccent: 'oklch(0.274 0.006 286.033)',
  darkSidebarAccentForeground: 'oklch(0.985 0 0)',
  darkSidebarBorder: 'oklch(1 0 0 / 10%)',
  darkSidebarRing: 'oklch(0.488 0.243 264.376)',

  chartColor1: 'oklch(0.646 0.222 41.116)',
  chartColor2: 'oklch(0.6 0.118 184.704)',
  chartColor3: 'oklch(0.398 0.07 227.392)',
  chartColor4: 'oklch(0.828 0.189 84.429)',
  chartColor5: 'oklch(0.769 0.188 70.08)',
}

interface PersonalizationStore {
  colors: PersonalizationColors
  isLoaded: boolean
  setColors: (colors: Partial<PersonalizationColors>) => void
  resetToDefaults: () => void
  setIsLoaded: (loaded: boolean) => void
  applyColors: () => void
}

export const usePersonalizationStore = create<PersonalizationStore>()(
  persist(
    (set, get) => ({
      colors: defaultColors,
      isLoaded: false,
      setColors: newColors => {
        const updatedColors = { ...get().colors, ...newColors }
        set({ colors: updatedColors })
        get().applyColors()
      },
      resetToDefaults: () => {
        set({ colors: { ...defaultColors } })
        get().applyColors()
      },
      setIsLoaded: loaded => set({ isLoaded: loaded }),
      applyColors: () => {
        if (typeof document === 'undefined') return

        const { colors } = get()
        const root = document.documentElement

        root.style.setProperty('--primary', colors.lightPrimary)
        root.style.setProperty(
          '--primary-foreground',
          colors.lightPrimaryForeground,
        )
        root.style.setProperty('--primary-light', colors.lightPrimaryLight)
        root.style.setProperty('--secondary', colors.lightSecondary)
        root.style.setProperty(
          '--secondary-foreground',
          colors.lightSecondaryForeground,
        )
        root.style.setProperty('--background', colors.lightBackground)
        root.style.setProperty(
          '--background-hover',
          colors.lightBackgroundHover,
        )
        root.style.setProperty('--foreground', colors.lightForeground)
        root.style.setProperty('--card', colors.lightCard)
        root.style.setProperty('--card-foreground', colors.lightCardForeground)
        root.style.setProperty('--popover', colors.lightPopover)
        root.style.setProperty(
          '--popover-foreground',
          colors.lightPopoverForeground,
        )
        root.style.setProperty('--muted', colors.lightMuted)
        root.style.setProperty(
          '--muted-foreground',
          colors.lightMutedForeground,
        )
        root.style.setProperty('--accent', colors.lightAccent)
        root.style.setProperty(
          '--accent-foreground',
          colors.lightAccentForeground,
        )
        root.style.setProperty('--destructive', colors.lightDestructive)
        root.style.setProperty(
          '--destructive-foreground',
          colors.lightDestructiveForeground,
        )
        root.style.setProperty('--warning', colors.lightWarning)
        root.style.setProperty(
          '--warning-foreground',
          colors.lightWarningForeground,
        )
        root.style.setProperty('--border', colors.lightBorder)
        root.style.setProperty('--input', colors.lightInput)
        root.style.setProperty('--ring', colors.lightRing)

        root.style.setProperty('--sidebar', colors.lightSidebarBackground)
        root.style.setProperty(
          '--sidebar-foreground',
          colors.lightSidebarForeground,
        )
        root.style.setProperty('--sidebar-primary', colors.lightSidebarPrimary)
        root.style.setProperty(
          '--sidebar-primary-foreground',
          colors.lightSidebarPrimaryForeground,
        )
        root.style.setProperty('--sidebar-accent', colors.lightSidebarAccent)
        root.style.setProperty(
          '--sidebar-accent-foreground',
          colors.lightSidebarAccentForeground,
        )
        root.style.setProperty('--sidebar-border', colors.lightSidebarBorder)
        root.style.setProperty('--sidebar-ring', colors.lightSidebarRing)

        root.style.setProperty('--chart-1', colors.chartColor1)
        root.style.setProperty('--chart-2', colors.chartColor2)
        root.style.setProperty('--chart-3', colors.chartColor3)
        root.style.setProperty('--chart-4', colors.chartColor4)
        root.style.setProperty('--chart-5', colors.chartColor5)

        let darkStyleElement = document.getElementById(
          'dark-theme-personalization',
        )
        if (!darkStyleElement) {
          darkStyleElement = document.createElement('style')
          darkStyleElement.id = 'dark-theme-personalization'
          document.head.appendChild(darkStyleElement)
        }

        darkStyleElement.textContent = `
          .dark {
            --primary: ${colors.darkPrimary};
            --primary-foreground: ${colors.darkPrimaryForeground};
            --primary-light: ${colors.darkPrimaryLight};
            --secondary: ${colors.darkSecondary};
            --secondary-foreground: ${colors.darkSecondaryForeground};
            --background: ${colors.darkBackground};
            --background-hover: ${colors.darkBackgroundHover};
            --foreground: ${colors.darkForeground};
            --card: ${colors.darkCard};
            --card-foreground: ${colors.darkCardForeground};
            --popover: ${colors.darkPopover};
            --popover-foreground: ${colors.darkPopoverForeground};
            --muted: ${colors.darkMuted};
            --muted-foreground: ${colors.darkMutedForeground};
            --accent: ${colors.darkAccent};
            --accent-foreground: ${colors.darkAccentForeground};
            --destructive: ${colors.darkDestructive};
            --destructive-foreground: ${colors.darkDestructiveForeground};
            --warning: ${colors.darkWarning};
            --warning-foreground: ${colors.darkWarningForeground};
            --border: ${colors.darkBorder};
            --input: ${colors.darkInput};
            --ring: ${colors.darkRing};
            --sidebar: ${colors.darkSidebarBackground};
            --sidebar-foreground: ${colors.darkSidebarForeground};
            --sidebar-primary: ${colors.darkSidebarPrimary};
            --sidebar-primary-foreground: ${colors.darkSidebarPrimaryForeground};
            --sidebar-accent: ${colors.darkSidebarAccent};
            --sidebar-accent-foreground: ${colors.darkSidebarAccentForeground};
            --sidebar-border: ${colors.darkSidebarBorder};
            --sidebar-ring: ${colors.darkSidebarRing};
          }
        `
      },
    }),
    {
      name: 'personalization-storage',
    },
  ),
)
