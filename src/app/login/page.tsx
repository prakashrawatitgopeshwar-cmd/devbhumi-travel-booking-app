"use client";
import { useState } from "react";
import Link from "next/link";
export default function Login() {
  const [email, E] = useState(""),
    [password, P] = useState(""),
    [msg, M] = useState(""),
    [busy, B] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    B(true);
    M("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const j = await r.json();
      if (!r.ok) throw Error(j.error);
      location.href = j.user.role === "admin" ? "/admin" : "/account";
    } catch (e) {
      M(e instanceof Error ? e.message : "Login failed");
    } finally {
      B(false);
    }
  }
  return (
    <div className="page-shell">
      <p className="eyebrow">WELCOME BACK</p>
      <h1 className="page-title">Log in</h1>
      <form className="feature-panel form-grid" onSubmit={submit}>
        <label>
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => E(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(e) => P(e.target.value)}
          />
        </label>
        <button className="btn" disabled={busy}>
          {busy ? "Signing in…" : "Log in"}
        </button>
        {msg && <p role="alert">{msg}</p>}
        <p>
          New to DevBhoomi? <Link href="/register">Create account</Link>
        </p>
        <p className="notice">
          Password reset and email verification need an email provider and are
          not yet configured.
        </p>
      </form>
    </div>
  );
}
