import { Link, useNavigate } from "react-router-dom";
import "../style/auth.css";
import "../style/auth-center.css";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleRegister, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await handleRegister(name, email, password);
      navigate("/auth/verify");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-center-root">
      <div className="auth-center-card">
        {/* Logo */}
        <Link to="/home" className="auth-center-logo" id="register-logo">
          <span>●</span>LUXE
        </Link>

        <div className="auth-header">
          <p className="auth-eyebrow">Get Started</p>
          <h1 className="auth-title">
            Create your
            <br />
            account
          </h1>
          <p className="auth-subtitle">
            Join thousands of style-conscious shoppers on LUXE.
          </p>
        </div>

        {error && (
          <div className="auth-error-msg">
            <svg
              className="auth-error-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" id="register-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-name">
              Full name
            </label>
            <div className="auth-input-wrap">
              <svg
                className="auth-input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                id="reg-name"
                className="auth-input"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-email">
              Email address
            </label>
            <div className="auth-input-wrap">
              <svg
                className="auth-input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                id="reg-email"
                className="auth-input"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-password">
              Password
            </label>
            <div className="auth-input-wrap">
              <svg
                className="auth-input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                id="reg-password"
                className="auth-input auth-input--password"
                type="password"
                placeholder="Create a strong password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-eye-btn"
                id="reg-toggle-pw"
                aria-label="Toggle password visibility"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
            {/* Strength bars — decorative */}
            <div className="auth-strength" aria-hidden="true">
              <div className="auth-strength-bar" />
              <div className="auth-strength-bar" />
              <div className="auth-strength-bar" />
              <div className="auth-strength-bar" />
            </div>
          </div>

          {/* Terms */}
          <p className="auth-terms">
            By creating an account you agree to our{" "}
            <a href="#" className="auth-link" id="reg-terms-link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="auth-link" id="reg-privacy-link">
              Privacy Policy
            </a>
            .
          </p>

          {/* Submit */}
          <button
            className="auth-submit-btn"
            type="submit"
            id="register-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="auth-spinner" aria-hidden="true" />
                <span className="auth-btn-label">Creating account…</span>
              </>
            ) : (
              <span className="auth-btn-label">Create Account</span>
            )}
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or sign up with</span>
            <div className="auth-divider-line" />
          </div>

          {/* Social */}
          <div className="auth-social-row">
            <button
              type="button"
              className="auth-social-btn"
              id="register-google-btn"
            >
              <svg className="auth-social-icon" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              className="auth-social-btn"
              id="register-apple-btn"
            >
              <svg
                className="auth-social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </div>
        </form>

        <p className="auth-switch">
          Already have an account?
          <Link to="/auth/login" className="auth-link" id="go-to-login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
