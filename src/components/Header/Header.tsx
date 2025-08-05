import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
    return (
        <>
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.headerContent}>
                    <div className={styles.navLogo}>
                        <Link href="/" className={styles.logo}>Pokedex</Link>

                    </div>
                    <nav className={styles.bigNav}>
                        <Link href="/login" className={styles.navButton}>Login</Link>
                        <Link href="/register" className={styles.navButton}>Register</Link>

                    </nav>
                </div>
            </div>
        </header>
        </>
    );
}