import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>MZIPI</h1>
            <nav className={styles.nav}>
                <Link href="/">Inicio</Link>
                <Link href="/dashboard">Dashboard</Link>
            </nav>
            <Link href="/signup">Signup</Link>
            <Link href="/login">Login</Link>
        </header>
    );
}