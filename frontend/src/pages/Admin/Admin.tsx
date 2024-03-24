import { CheckingPost } from "../../features/admin/CheckingPost";
import { usePosts } from "../../features/post/Actions/useCrudPost";
import { IPost } from "../../interfaces/Posts.interface";
import { WrapperPosts } from "../Posts";

export const Admin = () => {
  const { data = [], isError } = usePosts();
  if (isError) {
    return <div>Ошибка</div>;
  }
  return (
    <WrapperPosts>
      {data?.data?.map((p: IPost) => (
        <CheckingPost key={p.id} {...p} />
      ))}
    </WrapperPosts>
  );
};
