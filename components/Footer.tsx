import styles from '@/styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.</p>
        </footer>
    );
}
