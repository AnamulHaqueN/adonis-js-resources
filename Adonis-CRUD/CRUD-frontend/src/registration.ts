import { api } from "./api";

export function registerUser(data: { email: string; password: string }) {
  return api("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
