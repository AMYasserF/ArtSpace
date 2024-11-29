
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NewSettlersSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
    console.log(formData);
  };

  return (
    <section className="sign-up" id="signup">
      <div className="sign-up-container">
        <h2 className="sign-up-title">Join ArtSpace</h2>
        <p className="sign-up-description">
          Create an account to start exploring, bidding, and showcasing your artwork.
        </p>

        <form className="sign-up-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">Select Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="user">User</option>
              <option value="artist">Artist</option>
            </select>
          </div>

          <button type="submit" className="sign-up-btn">Sign Up</button>
        </form>

        <p className="sign-up-footer">
          Already have an account? <NavLink to="/login" className="login-link">Log in</NavLink>
        </p>
      </div>
    </section>
  );
};

export default NewSettlersSignUp;
