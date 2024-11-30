import React from "react";


const GridRegistrationForm = ({ onBack }) => {
  return (
    <div className="auth-background">
      <div className="grid-registration-container">
        <div className="registration-header">REGISTER</div>
        <form className="grid-registration-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Choose a unique username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Create a password" required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="visa-card">Visa Card Number</label>
            <input
              type="text"
              id="visa-card"
              placeholder="Enter your Visa card number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" placeholder="Enter your age" required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" required>
              <option value="">Select a role</option>
              <option value="client">Client</option>
              <option value="artist">Artist</option>

            </select>
          </div>
          <div className="form-buttons">
            <button type="submit" className="registration-button">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GridRegistrationForm;
