"use client";
import { useState } from "react";
import "../../styles/auth.css"; // Import the shared CSS file

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Send user data to the API
    const response = await fetch("/api/Auth/Signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage(result.message);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Signup</h1>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}