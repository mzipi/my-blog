"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from './page.module.css';
import { verifyToken } from "@/app/lib/auth";

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
    const [username, setUsername] = useState<string | null>(null);

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
    
        const fetchUsername = async (token: string) => {
            const response = await fetch("/api/auth/verify-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
            }
        };
    
        if (postId) {
            fetchPost();
            
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
            const updatedComments = await fetch(`/api/comments?postId=${postId}`);
            const commentsData = await updatedComments.json();
            setComments(commentsData);
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