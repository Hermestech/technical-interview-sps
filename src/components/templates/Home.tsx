import * as React from 'react'

import {
  Box,
  CircularProgress
} from '@mui/material'
import { ProductCard } from '@/components/molecules/PruductCard'
import { ProductNotFound } from '../molecules/ProductNofFound'

import { useFilteredProducts } from '@/context/AppContext'

type Props = {
  products: Product[]
}

const ProductList = ({ products }: Props) => (
  <>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </>
)



export const ProductCatalog = ({ products }: Props) => {
  const { filteredProducts, loading, searchProduct } = useFilteredProducts()

  const productsBySearch = products.filter((product) =>
    product.title.toLowerCase().includes(searchProduct.toLowerCase())
  )
  const productsByCategory = filteredProducts.length > 0 ? filteredProducts : products

  const shouldRenderFilteredProductsBySearch = searchProduct.length > 0
  const shouldRenderFilteredProductsByCategory = filteredProducts.length > 0
  const shoulRenderDefaultProducts = !shouldRenderFilteredProductsBySearch && !shouldRenderFilteredProductsByCategory
    
const shouldRenderNotFound = !loading && productsBySearch.length === 0 && !shouldRenderFilteredProductsByCategory && !shoulRenderDefaultProducts


 console.log('shouldRenderNotFound', shouldRenderNotFound)
   

  return (
    <Box
      sx={{
        display: {
          xs: 'flex',
          md: 'grid',
        },
        gridTemplateColumns: 'repeat(3, 1fr)',
        placeItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        marginTop: '1rem',
        marginBottom: '1rem',
      }}
    >
      {loading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '80px',
            gridColumn: '1 / 4',
          }}
        >
          <CircularProgress color='secondary' />
        </Box>
      )}

      {shouldRenderNotFound && <ProductNotFound />}

      {shouldRenderFilteredProductsBySearch && <ProductList products={productsBySearch} />}

      {shouldRenderFilteredProductsByCategory && <ProductList products={productsByCategory} />}
          
      {shoulRenderDefaultProducts && <ProductList products={products} />}
    </Box>
  )
}