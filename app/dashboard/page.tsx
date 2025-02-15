"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Dashboard() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;
    
        const response = await fetch("/api/entries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, tags }),
        });
    
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error:", errorText); // Muestra el error en la consola
            return;
        }
    
        setTitle("");
        setContent("");
        setTags([]);
    };

    const toggleTag = (tag: string) => {
        setTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Crear un nuevo post</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className={styles.textarea}
                    placeholder="Contenido"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className={styles.tagsContainer}>
                    {["noticias", "tecnología", "juegos", "opinión"].map((tag) => (
                        <label key={tag} className={styles.tag}>
                            <input
                                type="checkbox"
                                checked={tags.includes(tag)}
                                onChange={() => toggleTag(tag)}
                            />
                            {tag}
                        </label>
                    ))}
                </div>
                <button className={styles.button} type="submit">Publicar</button>
            </form>
        </div>
    );
}
