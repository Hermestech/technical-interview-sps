import type { AppProps } from 'next/app'
import MainLayout from '@/components/templates/MainLayout'
import { ThemeProvider } from '@mui/material/styles'
import { myTheme } from '@/theme/theme'
import { FilteredProductsProvider } from '@/context/AppContext'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={myTheme}>
      <AuthProvider>
        <CartProvider>
          <FilteredProductsProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </FilteredProductsProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
