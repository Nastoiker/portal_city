import { AxiosError } from "axios";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCurrentUser } from "../../actions/getCurrentUser";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: top;
`;
export const Profile = () => {
  const { data } = useQuery(["currentUser"], async () => getCurrentUser(), {
    retry: false,
    onError: (err: AxiosError<{ message?: string }>) => {
      console.error(err);
    },
  });
  return (
    <Wrapper>
      <h1>Профиль</h1>
      <div>
        <h2>Логин: {data?.username}</h2>
        <h2>Имя: {data?.name}</h2>
        <h2>email: {data?.email}</h2>
      </div>
    </Wrapper>
  );
};
