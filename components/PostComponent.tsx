import React from 'react';
import styles from '@/styles/PostComponent.module.css';
import Tag from "@/components/Tag";

interface PostProps {
    _id: string;
    title: string;
    content: string;
    tags: string[];
}

export default function PostComponent({ _id, title, content, tags }: PostProps) {
    return (
        <div key={_id} className={styles.post}>
            <div>
                {tags.map((tag) => (
                    <Tag key={tag} tag={tag} />
                ))}
            </div>
            <div className={styles.postContentContainer}>
                <h2 className={styles.postTitle}>{title}</h2>
                <p className={styles.postContent}>{content.slice(0, 300) + '...'}</p>
            </div>
            <div className={styles.readMoreContainer}>
                <a href={`/entries/${_id}`} className="readMore">
                    Leer más
                </a>
            </div>
        </div>
    );
};