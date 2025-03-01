"use client";

import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css';

interface Post {
    _id: string;
    title: string;
    content: string;
    tags: string[];
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/entries', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            console.log("LA RESPONSE ES: ", response);

            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error('Error fetching posts');
            }
            setLoading(false);
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>Publicaciones</h1>
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <div key={post._id} className={styles.post}>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                            <p className={styles.postContent}>{post.content.slice(0, 300) + "..."}</p>
                            <div>
                                {post.tags.map((tag) => (
                                    <a key={tag} href={`/entries/tag/${tag}`} className={styles.tag}>
                                        {tag}
                                    </a>
                                ))}
                            </div>
                            <a href={`/entries/${post._id}`}>Leer más</a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}