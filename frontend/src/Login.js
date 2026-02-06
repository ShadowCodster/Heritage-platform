import { useState } from "react";
import { API } from "./config";

export default function Login({ onUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password })
    });
    const user = await res.json();
    onUser(user);
  };

  return (
    <div>
      <h2>Heritage Explorer Login</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} />
      <button onClick={register}>Enter</button>
    </div>
  );
}
