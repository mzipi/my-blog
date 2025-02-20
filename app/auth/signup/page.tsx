"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
        } else {
            setSuccess("Registro exitoso. ¡Bienvenido!");
        }

        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Registro</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="username">Nombre de usuario</label>
                    <input className={styles.input} type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="email">Correo electrónico</label>
                    <input className={styles.input} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="password">Contraseña</label>
                    <input className={styles.input} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className={styles.button} type="submit">Registrarse</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
        </div>
    );
}
