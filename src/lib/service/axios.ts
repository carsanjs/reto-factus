import axios from "axios";
import { ENV } from "../../../utils/constants";

export const AxiosInstance = axios.create({ baseURL: ENV.URL_API });

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error?.response?.data?.error_description ?? "Error de red Failed";
    return Promise.reject(new Error(customMessage));
  }
);
export default AxiosInstance;
