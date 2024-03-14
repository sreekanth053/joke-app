import React, { useState } from "react";
import './Login.css';


const Login = ({ isLoggedIn, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy validation
    if (username === "sreekanth" && password === "sreekanth123") {
      handleLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container row justify-content-center mt-5">
      <div className="col-md-6">
        <h2 className="text-center login-heading">Login</h2>
        {error && <div className="error-msg alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="username-container form-group">
            <label className="username-lable">Username</label>
            <input
              type="text"
              className="form-control username-input"
              value={username}
              placeholder="sreekanth"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="passowrd-container form-group">
            <label className="password-lable">Password</label>
            <input
              type="password"
              className="form-control password-input"
              value={password}
              placeholder="sreekanth123"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
