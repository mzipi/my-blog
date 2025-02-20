"use client"

import Link from 'next/link';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import styles from '@/styles/Header.module.css';
import LogoutButton from './Logout';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('token');

            if (token) {
                setIsLoggedIn(true);
                const role = Cookies.get('userRole') || null;
                setUserRole(role);
            } else {
                setIsLoggedIn(false);
            }
            setLoading(false);
        };

        checkAuth();

        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener("storage", handleStorageChange);


        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole(null);
        Cookies.remove('token');
        Cookies.remove('userRole');
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>MZIPI</h1>
            <nav className={styles.nav}>
                <Link href="/">Inicio</Link>
                {userRole === 'admin' && <Link href="/dashboard" className={styles.dashboardLink}>Dashboard</Link>}
                {!isLoggedIn ? (
                    <>
                        <Link href="/auth/signup">Signup</Link>
                        <Link href="/auth/login">Login</Link>
                    </>
                ) : (
                    <>
                        <Link href="/profile">Perfil</Link>
                        <LogoutButton onLogout={handleLogout} />
                    </>
                )}
            </nav>
        </header>
    );
}