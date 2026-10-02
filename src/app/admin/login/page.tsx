"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, adminOnly: true }),
      });
      const result = await response.json();
      if (!response.ok) throw Error(result.error);
      location.href = "/admin";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page-shell">
      <p className="eyebrow">DEV BHOOMI ADMINISTRATION</p>
      <h1 className="page-title">Admin log in</h1>
      <form className="feature-panel form-grid" onSubmit={submit}>
        <label>
          Email
          <input
            required
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="btn" disabled={busy}>
          {busy ? "Signing in…" : "Log in"}
        </button>
        {message && <p role="alert">{message}</p>}
      </form>
    </div>
  );
}