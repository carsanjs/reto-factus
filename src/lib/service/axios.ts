import axios from "axios";
import { ENV } from "../../../utils/constants";

export const AxiosInstance = axios.create({ baseURL: ENV.URL_API });

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
export default AxiosInstance;
