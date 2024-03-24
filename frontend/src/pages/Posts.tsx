import api from "../helpers/axios";

import styled from "styled-components";
import { usePosts } from "../features/post/Actions/useCrudPost";
import { Post } from "../features/post/Post";
import { IPost } from "../interfaces/Posts.interface";
export async function getPost(): Promise<{ data: IPost[] }> {
  return api.get(`posts`);
}
export const WrapperPosts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 1000px;
`;
export const Posts = () => {
  const { data = [], isError } = usePosts();
  if (isError) {
    return <div>ошибка</div>;
  }
  return (
    <WrapperPosts>
      {data && data?.data?.map((p: IPost) => <Post key={p.id} {...p} />)}
    </WrapperPosts>
  );
};
