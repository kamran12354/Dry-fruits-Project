import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Use relative URL to work with Vite proxy
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api;
