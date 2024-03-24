import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../../helpers/axios";
import { IPost } from "../../../interfaces/Posts.interface";
import { getPost } from "../../../pages/Posts";

export function usePosts() {
  const {
    data = [],
    isError,
    isFetched,
    isLoading,
  } = useQuery(["posts"], async () => getPost(), {
    retry: false,
    onError: (err: AxiosError<{ message?: string }>) => {
      console.error(err);
    },
  });
  return { data, isError, isFetched, isLoading };
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const {
    mutate: createPost,
    isLoading,
    error,
  } = useMutation("createPost", (post) => api.post("/posts", post), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  return {
    createPost,
    isLoading,
    error,
  };
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const {
    mutate: updatePost,
    isLoading,
    error,
  } = useMutation(
    "updatePost",
    ({ id, ...post }: IPost) => api.patch(`/posts/${id}`, post),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
      },
    }
  );
  return {
    updatePost,
    isLoading,
    error,
  };
}
const handleDelete = async (id: number) => api.delete(`/posts/${id}`);
export function useDeletePost() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deletePost,
    isLoading,
    error,
  } = useMutation("deletePost", handleDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  return {
    deletePost,
    isLoading,
    error,
  };
}
