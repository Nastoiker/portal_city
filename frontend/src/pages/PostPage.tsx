import { AxiosError } from "axios";
import { Suspense } from "react";
import { useQuery } from "react-query";
import { Await, useParams } from "react-router-dom";
import { Post } from "../features/post/Post";
import api from "../helpers/axios";
import { IPost } from "../interfaces/Posts.interface";
async function getPost(id: number): Promise<IPost> {
  return api.get(`post/${id}`);
}
export const PostPage = () => {
  const { id: postId } = useParams();

  const { data, isError, isLoading } = useQuery(
    ["post", postId],
    () => getPost(Number(postId)),
    {
      retry: false,
      onError: (err: AxiosError<{ message?: string }>) => {
        console.error(err);
      },
    }
  );
  if (isError) {
    return <div>e</div>;
  }
  if (isLoading) {
    return <div>e</div>;
  }
  return (
    <div>
      <Suspense fallback={"Загружаю..."}>
        <Await resolve={data}>
          <Post description={data.description} title={data.title} />
          {data?.title}
        </Await>
      </Suspense>
    </div>
  );
};
