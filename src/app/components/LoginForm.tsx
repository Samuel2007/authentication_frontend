"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";

const URL_DEV = "http://localhost:4000";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      // Example: POST to /api/login — adapt on backend
      const res = await fetch(`${URL_DEV}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({ message: "Login failed" }));
        setError(data?.message || "Login failed");
      } else {
        await res.json().catch(() => ({}));
        // On success redirect to /now (adjust if you want to store tokens first)
        router.push("/now");
      }
    } catch (err) {
      // log for debugging and show a generic message
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-label="login form"
    >
      <h2>Sign in</h2>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="username"
          className={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className={styles.input}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className={styles.actions}>
        <div>
          <label
            className={styles.hint}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <span style={{ marginLeft: 6 }}>Show</span>
          </label>
        </div>
        <button className={styles.submit} type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
}
