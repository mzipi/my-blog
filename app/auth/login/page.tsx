"use client";

import styles from "./page.module.css";
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
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            window.dispatchEvent(new Event("storage"));

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
        <div className={styles.container}>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}