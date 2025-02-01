"use client";

import { useState } from "react";
import Button from "@/components/button/button";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle the form submission
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" >
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <Button text="Submit" />
      </form>
    </div>
  );
}
