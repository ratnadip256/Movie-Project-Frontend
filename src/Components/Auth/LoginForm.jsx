/*
 * LoginForm Component
 * Renders the main login form with email/username and password fields.
 * After submit, navigates to home page.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your email or username.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    // Successfully logged in - navigate to home
    navigate("/");
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Login Form</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* ── Email or Username ── */}
        <div className="input-wrapper">
          <span className="input-icon">
            <FaUser />
          </span>
          <input
            type="text"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="auth-input"
          />
        </div>

        {/* ── Password ── */}
        <div className="input-wrapper">
          <span className="input-icon">
            <FaLock />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="eye-btn"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* ── Forgot Password link ── */}
        <div className="forgot-wrapper">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="forgot-link"
          >
            Forgot Password?
          </button>
        </div>

        {/* ── Error Message ── */}
        {error && <p className="error-msg">{error}</p>}

        {/* ── Sign In Button ── */}
        <button type="submit" className="auth-btn">
          Sign in
        </button>

        {/* ── Signup redirect ── */}
        <p className="bottom-text">
          Not a member?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="link-btn"
          >
            signup now
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
