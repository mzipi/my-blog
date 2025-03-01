"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch("/api/auth/profile", {
                method: "GET",
                credentials: "include" 
            });
            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setEmail(data.email);
            }
        };
        fetchUserData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/auth/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            router.push("/");
        } else {
            console.error("Error al actualizar el perfil");
        }
    };

    return (
        <div>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre de usuario:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Nueva contraseña (opcional):</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
}