import { fetchBikes } from '@/lib/bikeService';
import { BikeSelector } from './bikeSelector';
import styles from './navbar.module.css';

export default async function NavBar() {
    const bikes = await fetchBikes();

    return (
        <nav className={`${styles.menu} ${styles.bikeTypesMenu}`}>
            <ul>
                {bikes.map((bike) => (
                    <li key={bike.id}>
                        <BikeSelector bike={bike}></BikeSelector>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
