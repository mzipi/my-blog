"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import { useEffect, useState } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                setIsLoggedIn(true);
                
                const response = await fetch('/api/auth', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserRole(data.role);
                } else {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
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

    if (isLoggedIn === null) return null;

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>MZIPI</h1>
            <nav className={styles.nav}>
                <Link href="/">Inicio</Link>
                {userRole === 'admin' && (
                    <Link href="/dashboard" className={styles.dashboardLink}>Dashboard</Link>
                )}
                {!isLoggedIn ? (
                    <>
                        <Link href="/signup">Signup</Link>
                        <Link href="/login">Login</Link>
                    </>
                ) : (
                    <Link href="/logout">Logout</Link>
                )}
            </nav>
        </header>
    );
}