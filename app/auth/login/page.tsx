"use client";

import styles from "@/styles/Login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });

        if (response.ok) {
            const data = await response.json();
            window.dispatchEvent(new Event("authChange"));

            if (data.role === "admin") {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
        } else {
            const data = await response.json();
            setError(data.error || "Error al iniciar sesión");
        }
    };

    return (
        <>
            <h1 className={styles.heading}>Iniciar Sesión</h1>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="manolito2004@gmail.com"
                            value={email}
                            className={styles.input}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="•••••••••••"
                            value={password}
                            className={styles.input}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.button} type="submit">Iniciar Sesión</button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </>
    );
}
