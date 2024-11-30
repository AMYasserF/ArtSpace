import React, { useState } from "react";
import axios from "axios";
const GridLoginForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Logging....");
    try{
    const resp=await axios.post("http://localhost:3000/login", {username: username, password: password})
    console.log("Logged in successfully");
    console.log(resp);
    }
  catch(err){
    console.log(err);
  }
  };
  return (
    <div className="auth-background">
      <div className="grid-login-container">
        <div className="login-header">SIGN IN</div>
        <form className="grid-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-options">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password-link">
              Forgot your password?
            </a>
          </div>
          <div className="form-buttons">
            <button type="submit" className="login-button">
              Login
            </button>
            <button
              type="button"
              className="register-button"
              onClick={onRegister}
            >
              Don't have an account? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GridLoginForm;
