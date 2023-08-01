import { getPost } from "@/app/lib/db-connection";
import SendComment from "./SendComment";

interface Props {
  postId: string;
}

export default async function Comments(props: {postId: string}): Promise<JSX.Element> {
  const paragraph = await getPost(props.postId);

  return (
    <div>
      {paragraph.comments.map((element: { id: string; comment: string}) => {
        return <small key={element.id}>{element.comment}</small>;
      })}
      <SendComment></SendComment>
    </div>
  );
}