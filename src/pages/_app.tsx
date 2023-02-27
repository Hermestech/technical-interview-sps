import type { AppProps } from 'next/app'
import MainLayout from '@/components/templates/MainLayout'
import { ThemeProvider } from '@mui/material/styles'
import { myTheme } from '@/theme/theme'
import { FilteredProductsProvider } from '@/context/AppContext'
import { CartProvider } from '@/context/CartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={myTheme}>
      <FilteredProductsProvider>
        <CartProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </CartProvider>
      </FilteredProductsProvider>
    </ThemeProvider>
  )
}
