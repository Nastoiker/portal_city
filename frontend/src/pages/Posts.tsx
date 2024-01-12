import { useQuery } from "react-query";
import api from "../helpers/axios";

import { AxiosError } from "axios";
import styled from "styled-components";
import { Post } from "../features/post/Post";
import { IPost } from "../interfaces/Posts.interface";
async function getPost(): Promise<{ data: IPost[] }> {
  return api.get(`posts`);
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 1000px;
`;
export const Posts = () => {
  const {
    data = [],
    isError,
    isFetching,
  } = useQuery(["posts"], async () => getPost(), {
    retry: false,
    onError: (err: AxiosError<{ message?: string }>) => {
      console.error(err);
    },
  });
  if (isError) {
    return <div>ошибка</div>;
  }
  if (isFetching) {
    return <div>загрузка</div>;
  }
  return (
    <Wrapper>
      {data && data?.data?.map((p: IPost) => <Post key={p.id} {...p} />)}
    </Wrapper>
  );
};
