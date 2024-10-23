import NavBar from "@/components/navbar/navbar";
import Link from 'next/link';
import styles from './customizer.module.css';

export default function Layout({ children }) {
    return (
        <div >
            <header className={styles.customizerHeader}>
                <Link href='/'><h1 className={styles.logo}>Markus Bikes</h1></Link>
            </header>
            <NavBar></NavBar>
            <section>{children}</section>
        </div>
    );
}
