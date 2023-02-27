import React from 'react'

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid
} from '@mui/material'

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => { 
    const maxDescriptionLength = 213
    const maxTitleLength = 20

    const truncateDescription = (description: string) => { 
        if (description.length > maxDescriptionLength) {
            return description.slice(0, maxDescriptionLength) + '...'
        }
        return description
    }

    const truncateTitle = (title: string) => { 
        if (title.length > maxTitleLength) {
            return title.slice(0, maxTitleLength) + '...'
        }
        return title
    }

    return (

        <Card sx={{
            maxWidth: 345,
            minHeight: 400,
            maxHeight: 400
        }}>
                <CardMedia
                    component="img"
                    height="150"
                    image={product.image}
                alt={product.title}
                sx={{
                    width: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    backgroundColor: 'white',
                }}

                />  
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {truncateTitle(product.title)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {truncateDescription(product.description)}
                    </Typography>
                </CardContent>
            <CardActions>
                    <Button size="small" color='secondary'>Add to cart</Button>
                    <Button size="small" color='secondary'>View Details</Button>
                </CardActions>
            </Card>

    )
}