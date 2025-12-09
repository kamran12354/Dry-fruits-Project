import axios from "axios";

const api = axios.create({
  baseURL: "/api", // assumes backend is same origin or Vite proxy is configured
  withCredentials: true, // ensure cookies (httpOnly) are sent
  headers: { "Content-Type": "application/json" },
});

export default api;
