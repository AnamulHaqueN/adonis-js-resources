import { useState } from "react";
import { registerUser } from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await registerUser({ email, password });
    alert("Registered successfully!");
  }

  return (
    <form onSubmit={submit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button>Register</button>
    </form>
  );
}
