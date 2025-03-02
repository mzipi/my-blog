"use client";

import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css';
import PostComponent from '@/components/PostComponent';

interface PostData {
    _id: string;
    title: string;
    content: string;
    tags: string[];
}

export default function Home() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/entries', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

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
        <div className={styles.container}>
            <h1 className={styles.heading}>Publicaciones</h1>
            <div className={styles.posts}>
                {posts.map((post) => (
                    <PostComponent key={post._id} {...post} />
                ))}
            </div>
        </div>
    );
}