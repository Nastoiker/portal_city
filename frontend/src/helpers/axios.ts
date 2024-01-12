import type { AxiosHeaders } from "axios";
import axios from "axios";
import { PREFIX } from "./prefix";

const instance = axios.create({
  baseURL: PREFIX,
  paramsSerializer: {
    indexes: true,
  },
  validateStatus: (v) => v < 400,
  withCredentials: true,
});
instance.interceptors.request.use((config) => {
  (config.headers as AxiosHeaders).set(
    "Authorization",
    `Bearer ${localStorage.getItem("token")}`
  );

  return config;
});

export default instance;
