"use client"

import React, { useEffect, useState } from 'react';
import { Footer } from "@/app/components/Footer"
import { Header } from "@/app/components/Header"
// import Comments from "./comments/page"


interface Post {
  title: string;
  post: string;
}

const PostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  
  const { id } = React.use(params);

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
        {/*<Comments postId={id}></Comments>*/}
        <Footer></Footer>
    </div>
  );
};

export default PostPage;
