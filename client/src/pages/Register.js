import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authservices';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('parent');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(username, password, role);
      setMessage('✅ Registered successfully!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      const error = err?.response?.data?.error || 'Registration failed';
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
              {/* Header */}
              <div className="text-center mb-4">
                <div className="rocket-bounce" style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
                <h2 className="text-primary fw-bold mb-2" style={{ color: '#1e40af !important' }}>Create Account</h2>
                <p className="text-secondary fs-5 fw-medium" style={{ color: '#7c3aed !important' }}>Join us and start exploring!</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
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

                <div className="mb-4 input-with-icon">
                  <div className="input-icon">👤</div>
                  <select
                    className="form-control kids-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="parent">👪 Parent</option>
                    <option value="child">🧒 Child</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-100 kids-btn"
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Registering...
                    </>
                  ) : (
                    '🎉 Register Now'
                  )}
                </button>
              </form>

              {/* Message */}
              {message && (
                <div className={`alert text-center mt-3 fw-bold fs-6 ${message.includes('✅') ? 'message-success' : 'message-error'}`}>
                  {message}
                </div>
              )}

              {/* Go to Login */}
              <div className="signup-section text-center mt-4">
                <p className="fw-medium mb-3" style={{ color: '#1e40af', fontSize: '1.1rem' }}>
                  🔐 Already have an account? Go to login!
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-primary signup-btn"
                >
                  🔑 Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
