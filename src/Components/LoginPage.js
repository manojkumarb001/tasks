import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userID || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://172.16.4.27:4000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, passwd: password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label style={{ color: "white" }}>User ID:</label>
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label style={{ color: "white" }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="remember-forgot">
          <label style={{ color: "white" }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
          <a href="/forgot-password" className="forgot-password" style={{ color: "white" }}>
            Forgot Password?
          </a>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="register-link" style={{ color: "white" }}>
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
    </div>
  );
};

export default LoginPage;
