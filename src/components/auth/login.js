// src/components/login/login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users.json');
      const users = await response.json();
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        dispatch(loginSuccess(foundUser));
        setError('');
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="login-form">
      <h2>Login to PetStore</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="e.g. user@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn btn-primary">Login</button>

        <Link to="/register" className="auth-toggle-link">
          Don’t have an account yet? Register here
        </Link>
      </form>
    </div>
  );
};

export default Login;
