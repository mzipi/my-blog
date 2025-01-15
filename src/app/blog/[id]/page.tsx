import { Footer } from "@/app/components/Footer"
import { Header } from "@/app/components/Header"
import Comments from "./comments/page"

interface PostProps {
  params: {
    id: string;
  };
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const res = await fetch(`/api/posts/${params.id}`, { cache: "no-store" });
  const post = await res.json();

  if (!post) {
    return <p>Post not found</p>;
  }

  return(
      <div>
          <Header></Header>
          <h1 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">{post.title}</h1>
          <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">{post.post}</p>
          <Comments postId={post.id}></Comments>
          <Footer></Footer>
      </div>
  )
}
