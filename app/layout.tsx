import '../styles/globals.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from '@/styles/Layout.module.css';

export const metadata = {
    title: 'MZIPI | blog',
    description: 'Bienvenido a mi blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>
                <Header />
                <div className={styles.main}>
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}