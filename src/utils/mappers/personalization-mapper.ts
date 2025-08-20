import type { Personalization } from '@zenstackhq/runtime/models'
import type { PersonalizationColors } from '@/store/personalization-store'

export function mapPersonalizationToColors(
  personalization: Personalization,
): PersonalizationColors {
  return {
    ...personalization,
  }
}

export interface ColorFieldDefinition {
  key: keyof PersonalizationColors
  label: string
  category: 'light' | 'dark' | 'sidebar-light' | 'sidebar-dark' | 'chart'
}

export const PERSONALIZATION_FIELD_DEFINITIONS: ColorFieldDefinition[] = [
  // Light Theme Colors
  { key: 'lightPrimary', label: 'Primária', category: 'light' },
  {
    key: 'lightPrimaryForeground',
    label: 'Texto Primário',
    category: 'light',
  },
  { key: 'lightPrimaryLight', label: 'Primária Clara', category: 'light' },
  { key: 'lightSecondary', label: 'Secundária', category: 'light' },
  {
    key: 'lightSecondaryForeground',
    label: 'Texto Secundário',
    category: 'light',
  },
  { key: 'lightBackground', label: 'Fundo', category: 'light' },
  { key: 'lightBackgroundHover', label: 'Fundo Hover', category: 'light' },
  { key: 'lightForeground', label: 'Texto', category: 'light' },
  { key: 'lightCard', label: 'Card', category: 'light' },
  { key: 'lightCardForeground', label: 'Texto do Card', category: 'light' },
  { key: 'lightPopover', label: 'Popover', category: 'light' },
  {
    key: 'lightPopoverForeground',
    label: 'Texto do Popover',
    category: 'light',
  },
  { key: 'lightMuted', label: 'Muted', category: 'light' },
  { key: 'lightMutedForeground', label: 'Texto Muted', category: 'light' },
  { key: 'lightAccent', label: 'Destaque', category: 'light' },
  {
    key: 'lightAccentForeground',
    label: 'Texto de Destaque',
    category: 'light',
  },
  { key: 'lightDestructive', label: 'Destrutiva', category: 'light' },
  {
    key: 'lightDestructiveForeground',
    label: 'Texto Destrutivo',
    category: 'light',
  },
  { key: 'lightWarning', label: 'Aviso', category: 'light' },
  {
    key: 'lightWarningForeground',
    label: 'Texto de Aviso',
    category: 'light',
  },
  { key: 'lightBorder', label: 'Borda', category: 'light' },
  { key: 'lightInput', label: 'Input', category: 'light' },
  { key: 'lightRing', label: 'Foco', category: 'light' },

  // Dark Theme Colors
  { key: 'darkPrimary', label: 'Primária', category: 'dark' },
  { key: 'darkPrimaryForeground', label: 'Texto Primário', category: 'dark' },
  { key: 'darkPrimaryLight', label: 'Primária Clara', category: 'dark' },
  { key: 'darkSecondary', label: 'Secundária', category: 'dark' },
  {
    key: 'darkSecondaryForeground',
    label: 'Texto Secundário',
    category: 'dark',
  },
  { key: 'darkBackground', label: 'Fundo', category: 'dark' },
  { key: 'darkBackgroundHover', label: 'Fundo Hover', category: 'dark' },
  { key: 'darkForeground', label: 'Texto', category: 'dark' },
  { key: 'darkCard', label: 'Card', category: 'dark' },
  { key: 'darkCardForeground', label: 'Texto do Card', category: 'dark' },
  { key: 'darkPopover', label: 'Popover', category: 'dark' },
  {
    key: 'darkPopoverForeground',
    label: 'Texto do Popover',
    category: 'dark',
  },
  { key: 'darkMuted', label: 'Muted', category: 'dark' },
  { key: 'darkMutedForeground', label: 'Texto Muted', category: 'dark' },
  { key: 'darkAccent', label: 'Destaque', category: 'dark' },
  {
    key: 'darkAccentForeground',
    label: 'Texto de Destaque',
    category: 'dark',
  },
  { key: 'darkDestructive', label: 'Destrutiva', category: 'dark' },
  {
    key: 'darkDestructiveForeground',
    label: 'Texto Destrutivo',
    category: 'dark',
  },
  { key: 'darkWarning', label: 'Aviso', category: 'dark' },
  {
    key: 'darkWarningForeground',
    label: 'Texto de Aviso',
    category: 'dark',
  },
  { key: 'darkBorder', label: 'Borda', category: 'dark' },
  { key: 'darkInput', label: 'Input', category: 'dark' },
  { key: 'darkRing', label: 'Foco', category: 'dark' },

  // Sidebar Light Colors
  {
    key: 'lightSidebarBackground',
    label: 'Fundo',
    category: 'sidebar-light',
  },
  {
    key: 'lightSidebarForeground',
    label: 'Texto',
    category: 'sidebar-light',
  },
  {
    key: 'lightSidebarPrimary',
    label: 'Primária',
    category: 'sidebar-light',
  },
  {
    key: 'lightSidebarPrimaryForeground',
    label: 'Texto Primário',
    category: 'sidebar-light',
  },
  {
    key: 'lightSidebarAccent',
    label: 'Destaque',
    category: 'sidebar-light',
  },
  {
    key: 'lightSidebarAccentForeground',
    label: 'Texto de Destaque',
    category: 'sidebar-light',
  },
  {
    key: 'lightSidebarBorder',
    label: 'Borda',
    category: 'sidebar-light',
  },
  {
    key: 'lightSidebarRing',
    label: 'Foco',
    category: 'sidebar-light',
  },

  // Sidebar Dark Colors
  {
    key: 'darkSidebarBackground',
    label: 'Fundo',
    category: 'sidebar-dark',
  },
  {
    key: 'darkSidebarForeground',
    label: 'Texto',
    category: 'sidebar-dark',
  },
  {
    key: 'darkSidebarPrimary',
    label: 'Primária',
    category: 'sidebar-dark',
  },
  {
    key: 'darkSidebarPrimaryForeground',
    label: 'Texto Primário',
    category: 'sidebar-dark',
  },
  {
    key: 'darkSidebarAccent',
    label: 'Destaque',
    category: 'sidebar-dark',
  },
  {
    key: 'darkSidebarAccentForeground',
    label: 'Texto de Destaque',
    category: 'sidebar-dark',
  },
  {
    key: 'darkSidebarBorder',
    label: 'Borda',
    category: 'sidebar-dark',
  },
  {
    key: 'darkSidebarRing',
    label: 'Foco',
    category: 'sidebar-dark',
  },

  // Chart Colors
  { key: 'chartColor1', label: 'Cor 1', category: 'chart' },
  { key: 'chartColor2', label: 'Cor 2', category: 'chart' },
  { key: 'chartColor3', label: 'Cor 3', category: 'chart' },
  { key: 'chartColor4', label: 'Cor 4', category: 'chart' },
  { key: 'chartColor5', label: 'Cor 5', category: 'chart' },
]

export function getFieldsByCategory(
  category: ColorFieldDefinition['category'],
) {
  return PERSONALIZATION_FIELD_DEFINITIONS.filter(
    field => field.category === category,
  )
}

export function getCategoryTitle(category: ColorFieldDefinition['category']) {
  const titles = {
    light: 'Cores do Tema Claro',
    dark: 'Cores do Tema Escuro',
    'sidebar-light': 'Sidebar - Tema Claro',
    'sidebar-dark': 'Sidebar - Tema Escuro',
    chart: 'Cores dos Gráficos',
  }
  return titles[category]
}
