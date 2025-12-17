import api from "../api/axios";

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return api.post("/register", data);
};

export const loginUser = (data: { email: string; password: string }) => {
  return api.post("/login", data);
};

export const logoutUser = () => {
  return api.delete("/logout");
};

export const getMe = () => {
  return api.get("/me");
};
