import Head from 'next/head'
import { getAllProducts } from '@/data/api'
import { ProductCatalog } from '@/components/templates/Home'
import { WithAuth } from '@/components/atoms/WithAuth'

interface HomeProps { 
  products: Product[]
}

const Home: React.FC<HomeProps> = ({ products }) => { 
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <ProductCatalog products={products} />
    </>
  )
}

export async function getStaticProps() { 
  let products = []
  try {
    products = await getAllProducts()
  } catch (error) {
    /* handle error */
    return {
      notFound: true,
    }
  }

  if (!products) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      products,
    },
  }
}

export default WithAuth<HomeProps>({ component: Home })