"use client"

import Link from 'next/link';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import styles from '@/styles/Header.module.css';
import LogoutButton from './Logout';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('token');
            if (!token) {
                setIsLoggedIn(false);
                setUserRole(null);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/auth/verify", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserRole(data.role);
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    setUserRole(null);
                }
            } catch (error) {
                console.error("Error al verificar autenticación:", error);
                setIsLoggedIn(false);
                setUserRole(null);
            }

            setLoading(false);
        };

        checkAuth();

        const handleAuthChange = () => checkAuth();
        window.addEventListener("authChange", handleAuthChange);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        setIsLoggedIn(false);
        setUserRole(null);
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