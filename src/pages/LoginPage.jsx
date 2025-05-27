import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fakeLoginApi(email, password);
      if (response.success) {
        navigate("/dashboard");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again later.");
    }
  };

  const fakeLoginApi = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "test@gmail.com" && password === "lklklklk") {
          resolve({ success: true });
        } else {
          resolve({ success: false, message: "Invalid credentials" });
        }
      }, 1000);
    });
  };

  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6 login-wrapper">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="title text-primary">Welcome Back 👋</h2>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
          <p className="footer-text">
            Don't have an account? <span>Sign up</span>
          </p>
        </form>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default LoginPage;
