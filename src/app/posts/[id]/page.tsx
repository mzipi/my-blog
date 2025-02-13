"use client"

import React, { useEffect, useState } from 'react';
import { Footer } from "@/app/components/Footer"
import { Header } from "@/app/components/Header"


interface Post {
  title: string;
  post: string;
}

interface Params {
  id: string;
}

const PostPage = ({ params }: { params: Params }) => {
  const [post, setPost] = useState<Post | null>(null);
  
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };

    if (id) fetchPost();
  }, [id]);

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

export default PostPage;
