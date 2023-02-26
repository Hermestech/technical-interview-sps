import type { AppProps } from 'next/app'
import MainLayout from '@/components/templates/MainLayout'
import { ThemeProvider } from '@mui/material/styles'
import { myTheme } from '@/theme/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={myTheme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  )
}
