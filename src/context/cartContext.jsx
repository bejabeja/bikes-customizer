'use client';

import { useCartFromQueryParams } from '@/hooks/useCartFromQueryParams.js';
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const { removeFromQueryParams } = useCartFromQueryParams(setCart);

    const addToCart = (product) => {
        const findProductIndex = (cartItems, product) => {
            return cartItems.findIndex(item => item.componentType === product.componentType);
        };

        setCart((prevCart) => {
            const existingProductType = findProductIndex(prevCart, product);
            if (existingProductType >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductType] = product;
                return updatedCart;
            }
            return [...prevCart, product];
        });
    };

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const removeFromCart = (productType) => {
        removeFromQueryParams(productType);

        setCart((prevCart) => {
            return prevCart.filter(item => item.componentType !== productType);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        total,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
