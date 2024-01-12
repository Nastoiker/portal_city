import api from "../helpers/axios";
import { IPost } from "../interfaces/Posts.interface";
export const createPost = async (body: Partial<IPost>) => {
  return api.post("post", body);
};
