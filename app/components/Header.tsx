"use client";

import Link from 'next/link';
import styles from './Header.module.css';
import { useEffect, useState } from "react";
import { verifyToken } from "@/app/lib/auth";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            if (token) {
                setIsLoggedIn(true);
                const decodedToken = verifyToken(token);
                if (decodedToken && typeof decodedToken !== "string") {
                    setUsername(decodedToken.username);
                    if (decodedToken.role === "admin") {
                        setIsAdmin(true);
                    }
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    if (isLoggedIn === null) return null;

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>MZIPI</h1>
            <nav className={styles.nav}>
                <Link href="/">Inicio</Link>
                {isAdmin && <Link href="/dashboard">Dashboard</Link>} {/* Mostrar solo si es admin */}
                {!isLoggedIn ? (
                    <>
                        <Link href="/signup">Signup</Link>
                        <Link href="/login">Login</Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </nav>
        </header>
    );
}