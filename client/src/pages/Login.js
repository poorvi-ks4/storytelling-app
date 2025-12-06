import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authservices'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

 

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await login(username, password);
      const { token, user } = res;

      // Save token and user (can use localStorage or context)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage('✅ Login successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      const error = err?.response?.data?.error || 'Login failed';
      setMessage(`❌ ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="kids-login-bg d-flex align-items-center justify-content-center p-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 col-lg-6">
            <div className="card kids-card p-4">
              <div className="text-center mb-4">
                <div className="rocket-bounce" style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
                <h2 className="text-primary fw-bold mb-2">Welcome Back!</h2>
                <p className="text-secondary fs-5 fw-medium">Let's explore together!</p>
              </div>

              <div className="mb-4">
                <div className="mb-4 input-with-icon">
                  <div className="input-icon">📧</div>
                  <input
                    type="email"
                    className="form-control kids-input"
                    placeholder="Your email address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4 input-with-icon">
                  <div className="input-icon">🔒</div>
                  <input
                    type="password"
                    className="form-control kids-input"
                    placeholder="Your secret password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="btn btn-primary w-100 kids-btn"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Logging in...
                    </>
                  ) : (
                    '🎯 Let\'s Go!'
                  )}
                </button>
              </div>

              {message && (
                <div className={`alert text-center fw-bold fs-6 ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
                  {message}
                </div>
              )}

              <div className="signup-section text-center">
                <p className="fw-medium mb-3" style={{ fontSize: '1.1rem' }}>
                  🌟 Don't have an account? Let's create one!
                </p>
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-primary signup-btn"
                >
                  🎨 Sign Up Now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
