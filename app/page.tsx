"use client";

import { useEffect, useState } from "react";
import styles from './Home.module.css';

interface Post {
    _id: string;
    title: string;
    content: string;
    tags: string[];
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/entries');

            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error('Error fetching posts');
            }
            setLoading(false);
        };

        const fetchUserRole = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) return;
            
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
                console.error('Error fetching user role');
            }
        };

        fetchPosts();
        fetchUserRole();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>Publicaciones</h1>
                {userRole === 'admin' && (
                    <a href="/dashboard" className={styles.dashboardLink}>Ir al Dashboard</a>
                )}
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <div key={post._id} className={styles.post}>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                            <p className={styles.postContent}>{post.content.slice(0, 300)}</p>
                            <div>
                                {post.tags.map((tag) => (
                                    <a key={tag} href={`/tag/${tag}`} className={styles.tag}>
                                        {tag}
                                    </a>
                                ))}
                            </div>
                            <a href={`/post/${post._id}`}>Leer más</a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}