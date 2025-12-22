// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"https://fakestoreapi.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (optional: auth token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (global error handling)
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
