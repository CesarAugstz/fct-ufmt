import { PersonalizationColors } from '@/store/personalization-store'

export function generateCSSVariables(colors: PersonalizationColors): string {
  return `
    html:root {
      --primary: ${colors.lightPrimary};
      --primary-foreground: ${colors.lightPrimaryForeground};
      --primary-light: ${colors.lightPrimaryLight};
      --secondary: ${colors.lightSecondary};
      --secondary-foreground: ${colors.lightSecondaryForeground};
      --background: ${colors.lightBackground};
      --background-hover: ${colors.lightBackgroundHover};
      --foreground: ${colors.lightForeground};
      --card: ${colors.lightCard};
      --card-foreground: ${colors.lightCardForeground};
      --popover: ${colors.lightPopover};
      --popover-foreground: ${colors.lightPopoverForeground};
      --muted: ${colors.lightMuted};
      --muted-foreground: ${colors.lightMutedForeground};
      --accent: ${colors.lightAccent};
      --accent-foreground: ${colors.lightAccentForeground};
      --destructive: ${colors.lightDestructive};
      --destructive-foreground: ${colors.lightDestructiveForeground};
      --warning: ${colors.lightWarning};
      --warning-foreground: ${colors.lightWarningForeground};
      --border: ${colors.lightBorder};
      --input: ${colors.lightInput};
      --ring: ${colors.lightRing};
      --sidebar: ${colors.lightSidebarBackground};
      --sidebar-foreground: ${colors.lightSidebarForeground};
      --sidebar-primary: ${colors.lightSidebarPrimary};
      --sidebar-primary-foreground: ${colors.lightSidebarPrimaryForeground};
      --sidebar-accent: ${colors.lightSidebarAccent};
      --sidebar-accent-foreground: ${colors.lightSidebarAccentForeground};
      --sidebar-border: ${colors.lightSidebarBorder};
      --sidebar-ring: ${colors.lightSidebarRing};
      --chart-1: ${colors.chartColor1};
      --chart-2: ${colors.chartColor2};
      --chart-3: ${colors.chartColor3};
      --chart-4: ${colors.chartColor4};
      --chart-5: ${colors.chartColor5};
    }
    
    html.dark {
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
}
