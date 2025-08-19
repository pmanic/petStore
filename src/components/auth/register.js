// src/components/register/register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    address: '',
    favorites: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users.json');
      const users = await response.json();

      const emailExists = users.some((u) => u.email === form.email);
      if (emailExists) {
        setError('Email already registered');
        return;
      }

      alert('Registration successful! Please login.');
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="login-form">
      <h2>Create PetStore Account</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="e.g. johndoe@example.com"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="e.g. johnny123"
            required
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Minimum 6 characters"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            name="address"
            type="text"
            placeholder="e.g. 123 Pet Street, Pawville"
            required
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Favorite pets (comma separated)</label>
          <input
            name="favorites"
            type="text"
            placeholder="e.g. dogs, cats"
            value={form.favorites}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn btn-primary">Register</button>

				<Link to="/" className="auth-toggle-link">
					Already have an account? Login here
				</Link>
      </form>
    </div>
  );
};

export default Register;
