import { getPost } from "@/app/lib/mongo";
import SendComment from "./SendComment";

export default async function Comments(props: any): Promise<JSX.Element> {
  const paragraph = await getPost(props.postId);

  return (
    <div className="w-1/3 rounded-lg bg-gray-700 border-gray-600 px-4 py-2 mt-6">
      {
        paragraph.comments
        ?
        paragraph.comments.map((element: { id: string; comment: string }) => <small key={element.id}>{element.comment}</small>)
        :
        null
      }
      <SendComment></SendComment>
    </div>
  )
}