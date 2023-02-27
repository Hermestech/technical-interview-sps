/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useMemo } from 'react';

type CartContextType = {
    cart: Product[];
    setCart: React.Dispatch<React.SetStateAction<Product[]>>;
    addToCart: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    removeOneItemFromCart: (product: Product) => void;
}

const cartContextDefaultValues: CartContextType = {
    cart: [],
    setCart: () => { },
    addToCart: () => { },
    removeFromCart: () => { },
    removeOneItemFromCart: () => { },
}

const CartContext = createContext<CartContextType>(cartContextDefaultValues);

export function useCart() {
    return React.useContext(CartContext);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => { 
        setCart([...cart, product]);
    }

    const removeFromCart = (product:Product) => { 
        setCart(cart.filter((item) => item.id !== product.id));
    }

    const removeOneItemFromCart = (product: Product) => { 
        if (cart.length === 1) {
            setCart(cart.filter((item) => item.id !== product.id))
        }
        else {
            const repeatedItems = cart.filter((item) => item.id === product.id)
            const repeatedItemsIndex = cart.indexOf(repeatedItems[0])
            const cartCopy = [...cart]
            cartCopy.splice(repeatedItemsIndex, 1)
            setCart(cartCopy)
        }
    }


    const values = useMemo(() => ({
        cart,
        setCart,
        addToCart,
        removeFromCart,
        removeOneItemFromCart
    }), [cart]);

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
}