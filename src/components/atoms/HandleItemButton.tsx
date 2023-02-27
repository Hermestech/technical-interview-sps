import React from 'react'

import {
    Box,
    Button,
    Typography,
} from '@mui/material'


import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useCart } from '@/context/CartContext'

type HandleItemButtonProps = {
    product: Product    
}

export const HandleItemButton = ( {product}: HandleItemButtonProps  ) => {
    const { cart, removeOneItemFromCart, addToCart } = useCart()

    const countRepeatedItems = (id: number) => { 
        const repeatedItems = cart.filter((item) => item.id === id)
        return repeatedItems.length
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '327px',
                height: '56px',
                gap: '1rem',
                backgroundColor: '#F6F8FD',
            }}
        >
            <Button
                variant='outlined'
                color='secondary'
                sx={{
                    height:'100%'
                }}
                onClick={() => removeOneItemFromCart(product)}
            >
                <RemoveIcon />
            </Button>

            <Typography
                variant='h6'
                fontWeight={'bold'}
                sx={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    padding: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {countRepeatedItems(product.id)}
            </Typography>
            
            <Button
                variant='outlined'
                color='secondary'
                sx={{
                    height:'100%'
                }}
                onClick={() => addToCart(product)}
            >
                <AddIcon />
            </Button>

        </Box>
            
    )
}