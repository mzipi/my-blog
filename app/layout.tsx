import './globals.css';
import Header from "app/components/Header";
import Footer from "app/components/Footer";

export const metadata = {
    title: 'MZIPI | blog',
    description: 'Bienvenido a mi blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}