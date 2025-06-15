import React, { useState } from 'react';
import { register } from '../services/authservices';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('parent'); // default to parent
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password, role);
      setMessage('✅ Registered successfully!');
      setTimeout(() => navigate('/login'), 1000); // redirect after 1s
    } catch (err) {
      const error = err?.response?.data?.error || 'Registration failed';
      setMessage(`❌ ${error}`);
    }
  };

  return (
    <div className="page">
      <h2>📝 Register</h2>
      <form onSubmit={handleSubmit}>
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

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="parent">Parent</option>
          <option value="child">Child</option>
        </select><br />

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
