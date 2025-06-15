import React, { useState } from 'react';
import { login } from '../services/authservices';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      const { token, user } = res.data;

      // Save token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage('✅ Login successful!');
      setTimeout(() => navigate('/dashboard'), 1000); // Redirect after login
    } catch (err) {
      const error = err?.response?.data?.error || 'Login failed';
      setMessage(`❌ ${error}`);
    }
  };

  return (
    <div className="page">
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
