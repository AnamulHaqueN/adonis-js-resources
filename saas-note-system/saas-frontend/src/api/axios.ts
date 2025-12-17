import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true, // required for Http-only cookies
});
export default api;
