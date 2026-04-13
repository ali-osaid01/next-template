import axios from "axios";

const HOST_API = process.env.NEXT_PUBLIC_API_URL ?? "";

const axiosInstance = axios.create({
  baseURL: HOST_API,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data ?? error)
);

export default axiosInstance;
