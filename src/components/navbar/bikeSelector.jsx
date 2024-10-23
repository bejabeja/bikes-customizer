'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './navbar.module.css';

export const BikeSelector = ({ bike }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const bikeParam = searchParams.get('bike');

    const updateBikeParam = (bikeId) => {
        const currentParams = new URLSearchParams();
        if (bikeId) {
            currentParams.set('bike', bikeId);
        }

        replace(`${pathname}?${currentParams.toString()}`);
    };

    return (
        <a
            onClick={() => updateBikeParam(bike.id)}
            className={bikeParam === bike.id.toString() ? styles.active : ''}
        >
            {bike.type}
        </a>
    );
};