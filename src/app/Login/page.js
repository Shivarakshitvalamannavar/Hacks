"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous errors
    setError('');

    // Send the login request to the API
    const res = await fetch('/api/Auth/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      // Redirect to home page or dashboard after successful login
      router.push('/homePage'); // Redirect to homepage or wherever you want
    } else {
      // Handle error
      const errorMessage = await res.text();
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}