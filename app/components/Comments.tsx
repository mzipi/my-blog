"use client";

import { useEffect, useState } from "react";
import styles from './Comments.module.css';

interface Comment {
    _id: string;
    postId: string;
    createdAt: string;
    author: string;
    comment: string;
}

interface CommentsProps {
    postId: string;
}

export default function Comments({ postId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState<string>("");

    const fetchComments = async () => {
        if (!postId) return;
        const response = await fetch(`/api/comments?postId=${postId}`);
        const data = await response.json();
        setComments(data);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comment) {
            await fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId, comment }),
            });
            setComment("");
            fetchComments();
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Comentarios</h3>
            <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe tu comentario..."
                    required
                    className={styles.textarea}
                />
                <button type="submit" className={styles.submitButton}>
                    Enviar
                </button>
            </form>
            <ul className={styles.commentsList}>
                {comments.map((c) => (
                    <li key={c._id} className={styles.commentItem}>
                        <strong>{c.author}</strong>:
                        <p>{c.comment}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
