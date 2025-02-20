import Link from "next/link";

interface Post {
    title: string;
    content: string;
    tags: string[];
}

export default function PostComponent ({ post }: { post: Post }) {
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div>
                {post.tags.map(tag => (
                    <Link key={tag} href={`/entries/${tag}`}>
                        <span>{tag}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};