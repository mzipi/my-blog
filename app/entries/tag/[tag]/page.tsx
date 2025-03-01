"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/Tag.module.css";

interface Post {
    _id: string;
    title: string;
    content: string;
    tags: string[];
}

export default function TagPage() {
    const { tag } = useParams();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostsByTag = async () => {
            const response = await fetch(`/api/entries/tag/${tag}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error('Error fetching posts by tag');
            }
            setLoading(false);
        };

        fetchPostsByTag();
    }, [tag]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Posts con la etiqueta: {tag}</h1>
            <div className={styles.posts}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className={styles.post}>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                            <p className={styles.postContent}>{post.content.slice(0, 300) + "..."}</p>
                            <a href={`/entries/${post._id}`}>Leer más</a>
                        </div>
                    ))
                ) : (
                    <p>No hay publicaciones para esta etiqueta.</p>
                )}
            </div>
        </div>
    );
}