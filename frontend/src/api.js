import axios from "axios";

// Base URL of your backend
export const API = axios.create({
  baseURL: "https://todo-backend-uzxl.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});