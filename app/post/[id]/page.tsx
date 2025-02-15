"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from './page.module.css';

interface Post {
    title: string;
    content: string;
}

interface Comment {
    _id: string;
    username: string;
    content: string;
}

export default function PostPage() {
    const [post, setPost] = useState<Post | null>(null);
    const { id: postId } = useParams();
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/entries/${postId}`);
            if (response.ok) {
                const data = await response.json();
                setPost(data);
            } else {
                console.error('Error fetching post:', response.statusText);
            }
        };

        const fetchComments = async () => {
            if (!postId) return;
            const response = await fetch(`/api/comments?postId=${postId}`);
            const data = await response.json();
            setComments(data);
        };

        if (postId) {
            fetchPost();
            fetchComments();
        }

        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
        }
    }, [postId]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn) return alert("Debes iniciar sesión para comentar");

        const response = await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ postId, content: comment }),
        });

        if (response.ok) {
            setComment("");
        } else {
            alert("Error al comentar");
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.content}>{post.content}</p>
            <ul className={styles.commentsList}>
                {comments.map((c) => (
                    <li key={c._id} className={styles.commentItem}>
                        <strong>{c.username}</strong>:
                        <p>{c.content}</p>
                    </li>
                ))}
            </ul>
            {isLoggedIn ? (
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <button type="submit">Comentar</button>
                </form>
            ) : (
                <p>Inicia sesión para comentar</p>
            )}
        </div>
    );
}