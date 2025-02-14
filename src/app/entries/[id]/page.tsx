"use client"

import { useEffect, useState } from 'react';
import { Footer } from "@/app/components/Footer"
import { Header } from "@/app/components/Header"
import { useParams } from "next/navigation";


interface Post {
	title: string;
	post: string;
}

export default function PostPage () {
	const [post, setPost] = useState<Post | null>(null);

	const params = useParams();

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(`/api/entries/${params.id}`);
			const data = await response.json();
			setPost(data);
		};

		if (params.id) fetchPost();
	}, [params.id]);

	if (!post) return <p>Loading...</p>;

	return (
		<div>
			<Header></Header>
			<h1 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">{post.title}</h1>
			<p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">{post.post}</p>
			<Footer></Footer>
		</div>
	);
};