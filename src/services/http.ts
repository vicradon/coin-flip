import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 9000,
  headers: { accept: "application/json" },
});

export default http;
