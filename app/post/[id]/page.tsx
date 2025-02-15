"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Comments from "app/components/Comments";
import styles from './page.module.css';

interface Post {
    title: string;
    content: string;
}

export default function PostPage() {
    const [post, setPost] = useState<Post | null>(null);
    const { id: postId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/entries/${postId}`);
            const data = await response.json();
            setPost(data);
        };

        if (postId) fetchPost();
    }, [postId]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.content}>{post.content}</p>
            <Comments postId={postId as string} />
        </div>
    );
}
