import { getPost } from "@/app/api/db-connection";
import SendComment from "./SendComment";

interface Props {
  postId: string;
}

export default async function Comments(props: Props): Promise<JSX.Element> {
  const paragraph = await getPost(props.postId);

  return (
    <div>
      {paragraph.comments.map((element) => {
        return <small key={element.id}>{element.comment}</small>;
      })}
      <SendComment></SendComment>
    </div>
  );
}