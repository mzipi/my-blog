import React from 'react';
import styles from '@/styles/TagComponent.module.css';

interface TagProps {
  tag: string;
}

export default function Tag({ tag }: TagProps) {
  return (
    <a href={`/entries/tag/${tag}`} className={styles.tag}>
      {tag}
    </a>
  );
}