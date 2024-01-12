import api from "../helpers/axios";
export const getCurrentUser = async () => {
  const { data } = await api.get("auth/authByJwt");
  return data;
};
