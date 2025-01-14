import { Footer } from "@/app/components/Footer"
import { Header } from "@/app/components/Header"
import { getPost } from "@/app/lib/db-connection"
import Comments from "./comments/page"

export default async function Post(params: { id: any }) {

    const { id } = params
    const paragraph = await getPost(id)

    return(
        <div>
            <Header></Header>
            <h1 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">{paragraph.title}</h1>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">{paragraph.post}</p>
            <Comments postId={id}></Comments>
            <Footer></Footer>
        </div>
    )
}