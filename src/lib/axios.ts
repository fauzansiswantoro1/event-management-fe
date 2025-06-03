import axios from "axios";

const BASE_URL = "https://event-management-be-nine.vercel.app/api";

// Create a custom axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    // For example, redirect to login if 401 unauthorized
    if (error.response?.status === 401) {
      // Handle unauthorized error
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
