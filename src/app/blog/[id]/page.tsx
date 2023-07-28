import { Footer } from "@/app/components/Footer"
import { Header } from "@/app/components/Header"
import { getPost } from "@/app/api/db-connection"
import Comments from "./comments/page"

export default async function Post({params}: {params: {id: string}}) {

    const { id } = params
    const paragraph = await getPost(id)

    return(
        <div>
            <Header></Header>
            <h1>{paragraph.title}</h1>
            <p>{paragraph.post}</p>
            <Comments postId={id}></Comments>
            <Footer></Footer>
        </div>
    )
}