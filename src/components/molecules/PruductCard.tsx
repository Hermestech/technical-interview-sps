import React from 'react'

type ProductCardProps = {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => { 
    return (
        <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        </div>
    )
}