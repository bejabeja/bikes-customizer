import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href='/'><h1 className={styles.logo}>Markus Bikes</h1></Link>
        <div className={styles.lema}>
          <h2>Envision it, </h2>
          <h2>Create it,</h2>
          <h2>Assemble it.</h2>
        </div>
        <p>Customize your dream bike in a few steps</p>

        <div className={styles.ctas}>
          <Link href='/customizer' className={styles.primary}>Start now!</Link>
        </div>
      </main>

    </div>
  );
}
