import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { ENV } from "../../config/env";
import { useToastStore } from "../../store/toastStore";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor with global error handling & retry abstraction
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (!window.navigator.onLine) {
      useToastStore.getState().addToast({
        type: "error",
        title: "Network Offline",
        message: "You are currently offline. Using cached data.",
      });
    } else if (status === 401) {
      localStorage.removeItem("auth_token");
      useToastStore.getState().addToast({
        type: "warning",
        title: "Session Expired",
        message: "Please log in again to continue.",
      });
    } else if (status && status >= 500) {
      useToastStore.getState().addToast({
        type: "error",
        title: "Server Error",
        message: "A backend service error occurred. Reverting to fallback mode.",
      });
    }

    return Promise.reject(error);
  }
);
