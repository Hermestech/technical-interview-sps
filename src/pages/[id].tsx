import { useRouter } from 'next/router'
import { getProductById, getAllProducts } from '@/data/api'

import {
    Box,
    Typography,
    Button
} from '@mui/material'

import { HandleItemButton } from '@/components/atoms/HandleItemButton'

import { GetStaticPaths, GetStaticProps } from 'next'
import { AddShoppingCart, Star, ArrowBack } from '@mui/icons-material'
import { useCart } from '@/context/CartContext'

import { Player } from '@lottiefiles/react-lottie-player'
import Link from 'next/link'

interface IdPageProps {
    product?: Product
}

export default function IdPage({ product }: IdPageProps) {
    const { addToCart } = useCart()
    const router = useRouter()

    if (!product || !product.id) {
        return (
            <>
            <Player
              autoplay
              loop
              src="https://assets2.lottiefiles.com/packages/lf20_kcsr6fcp.json"
              style={{ height: "300px", width: "300px" }}
          /> 
            <Link href="/">
              Go back home
            </Link>
            </>
        )
    }

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                minHeight: '100vh',
                gap: '.5rem',
                marginTop: '1rem',
                textAlign: 'left',
                marginBottom: '5rem',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                }}  
            >
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => router.back()}
                    startIcon={<ArrowBack />}
                >
                    Back
                </Button>

            </Box>
            <Box
                component={'img'}
                src={product.image}
                alt={product.title}
                sx={{
                    width: '100vw',
                    height: '100%',
                    maxWidth: '500px',
                    maxHeight: '500px',
                    objectFit: 'cover',
                }}
            />
            <Typography
                variant='h6'
                color={'secondary'}
                textAlign={'left'}
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}
            >
                {product?.category?.toUpperCase() || 'No category'}
            </Typography>
            <Typography
                variant='h4'
                color='text.primary'
                textAlign={'left'}
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}
            >
                {product.title}
            </Typography>
            <Typography
                variant='body1'
                color='text.secondary'
                textAlign={'left'}
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                }}
            >
                {product.description}
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                maxWidth: '500px',
                gap: '.5rem',
            }}>
                <Typography
                    variant='h4'
                    color='text.primary'
                    fontWeight={'bold'}
                    sx={{
                        letterSpacing: '2px',
                    }}
                >
                    ${product.price}
                </Typography>
                <Box
                    component={'span'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '5rem',
                        height: '2rem',
                        borderRadius: '10%',
                        backgroundColor: '#FFEEE2',
                    }}
                >
                    <Typography
                        variant='body1'
                        color='secondary'
                        fontWeight={'bold'}
                        sx={{
                            letterSpacing: '2px',
                        }}
                    >
                        {/* {product?.rating?.rate || 0} */}
                    </Typography>
                    <Star
                        sx={{
                            color: '#FF7E1B',
                        }}
                    />
                </Box>

            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '500px',
                    gap: '1rem',
                    height: '200px'
                }}
            >
                <HandleItemButton
                    product={product}
                />
                <Button
                    variant='contained'
                    color='secondary'
                    sx={{
                        width: '100%',
                        height: '56px',
                        borderRadius: '10px',
                        padding: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 20px 50px -20px #FF7E1B',
                        color: '#fff',
                    }}
                    startIcon={<AddShoppingCart />}
                    onClick={() => addToCart(product)}
                >
                    Add to cart
                </Button>

            </Box>

        </Box>
    )
}

export const getStaticPaths: GetStaticPaths = async () => { 
    const products: Product[] = await getAllProducts();
    const paths = products.map((product) => ({
        params: { id: product.id.toString() },
    }))
    return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<IdPageProps> = async ({ params }) => { 
    const productId = parseInt(params?.id as string)
    const product = await getProductById(productId)

    if (!product) {
        return {
            notFound: true,
        }
    }

    return { props: { product } }
}