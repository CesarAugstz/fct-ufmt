import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
})

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
