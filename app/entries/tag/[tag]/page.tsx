"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/TagPage.module.css";
import PostComponent from "@/components/PostComponent";

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
                        <PostComponent
                            key={post._id}
                            _id={post._id}
                            title={post.title}
                            content={post.content}
                            tags={post.tags}
                        />
                    ))
                ) : (
                    <p>No hay publicaciones para esta etiqueta.</p>
                )}
            </div>
        </div>
    );
}