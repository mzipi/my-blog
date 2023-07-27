import { getPost } from "@/app/api/db-connection"
import SendComment from "./SendComment"

export default async function Comments(props) {

    const paragraph = await getPost(props.postId)

    return(
        <div>
            {paragraph.comments.map((element) => {
                return (
                    <small key={element.id}>{element.comment}</small>
                )
            })}
            <SendComment></SendComment>
        </div>
    )
}