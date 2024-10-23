'use client'

import { useCart } from '@/hooks/useCart.js';
import { useEffect } from 'react';
import styles from './shoppingCart.module.css';

export default function ShoppingCart({ searchParams }) {
    const { cart, total, removeFromCart, clearCart } = useCart();
    const bikeId = searchParams?.bike;
    useEffect(() => {
        clearCart();
    }, [bikeId]);

    const productsOrder = ['frames', 'wheels', 'handlebars', 'batteries', 'motors', 'paints'];

    const sortedCart = cart.sort((a, b) => {
        return productsOrder.indexOf(a.componentType) - productsOrder.indexOf(b.componentType);
    });

    return (
        <div className={styles.shoppingCart}>
            <h2>Shopping Cart</h2>
            {sortedCart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {sortedCart.map((item, index) => (
                            <li key={index}>
                                <div>
                                    <h4>{item.componentType}:</h4>
                                    <p>{item.type}</p>
                                    <p>${item.price}</p>
                                </div>

                                <button onClick={() => removeFromCart(item.componentType)} className={styles.removeButton}>
                                    &#10005;
                                </button>

                            </li>))}
                    </ul>
                    <div className={styles.total}>
                        <strong>Total:</strong> ${total}
                    </div>
                </>
            )}
        </div>)

}