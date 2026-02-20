import axios from "axios";

// Base URL of your backend
export const API = axios.create({
  baseURL: "https://todo-backend-uzxl.onrender.com", // your deployed backend
  withCredentials: true, // allows sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});