import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getCurrentUser } from "../../actions/getCurrentUser";

export const Profile = () => {
  const { data } = useQuery(["currentUser"], async () => getCurrentUser(), {
    retry: false,
    onError: (err: AxiosError<{ message?: string }>) => {
      console.error(err);
    },
  });
  return (
    <div>
      Профиль
      <h2>{data?.username}</h2>
      <h2>{data?.name}</h2>
      <p>{data?.email}</p>
    </div>
  );
};
