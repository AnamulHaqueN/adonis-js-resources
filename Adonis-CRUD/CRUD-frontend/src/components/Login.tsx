import { useState } from "react";
import { loginUser, saveToken } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await loginUser({ email, password });
    saveToken(res.token);
    alert("Logged in!");
  }

  return (
    <form onSubmit={submit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button>Login</button>
    </form>
  );
}
