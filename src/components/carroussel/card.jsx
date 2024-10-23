'use client'

import { useCart } from '@/hooks/useCart.js';
import { useQueries } from '@/hooks/useQueries';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from './card.module.css';

export default function Card({ data }) {
    const { addToCart } = useCart();
    const searchParams = useSearchParams();
    const { updateParams } = useQueries();

    const selectedProductId = searchParams.get(data.componentType);
    const isSelected = selectedProductId === data.id.toString();


    const handleAddToCart = () => {
        addToCart(data);
        updateParams(data);
    };

    return (
        <div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
            <div className={styles.wrapper}>
                {data.image ? (
                    <Image
                        src={data.image}
                        width={200}
                        height={200}
                        alt={`Image of ${data.name}`}
                        className={styles.cardImage}
                    />
                ) : (
                    <Image
                        src='/bike-neon.jpg'
                        width={200}
                        height={200}
                        alt={`Image of ${data.name}`}
                        className={styles.cardImage}
                    />
                )}
                <h3 className={styles.cardTitle}>{data.type}</h3>
                <p className={styles.cardDescription}>{data.material}</p>
                <p className={styles.cardDescription}>${data.price}</p>
            </div>
            <div className={styles.buttonsWrapper}>
                <button
                    className={`${styles.button} ${styles.fill}`}
                    onClick={() => handleAddToCart()}
                >
                    BUY
                </button>
            </div>
        </div>
    );
}

