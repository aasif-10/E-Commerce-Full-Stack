import { Link, useNavigate } from "react-router-dom";
import "../style/auth.css";
import "../style/auth-center.css";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const {
    loading,
    handleVerifyOtp,
    user,
    isVerified,
    error,
    handleGenerateOtp,
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length < 6) return;

    await handleVerifyOtp(otp, user?.email);
    if (isVerified) {
      navigate("/products");
    }
  };

  useEffect(() => {
    const verify = async () => {
      await handleGenerateOtp(user?.email);
    };

    verify();
  }, []);

  return (
    <div className="auth-center-root">
      <div className="auth-center-card auth-center-card--narrow">
        {/* Logo */}
        <Link to="/home" className="auth-center-logo" id="verify-logo">
          <span>●</span>LUXE
        </Link>

        {/* Icon */}
        <div className="otp-icon-wrap" aria-hidden="true">
          <svg
            className="otp-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 7 10-7" />
          </svg>
        </div>

        {/* Header */}
        <div
          className="auth-header"
          style={{ textAlign: "center", marginBottom: 28 }}
        >
          <p className="auth-eyebrow">Verification</p>
          <h1
            className="auth-title"
            style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}
          >
            Check your email
          </h1>
          <p className="auth-subtitle">
            We sent a 6-digit code to{" "}
            <strong style={{ color: "#111" }}>{user?.email}</strong>.
            <br />
            Enter it below to verify your account.
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

        {/* OTP inputs */}
        <form className="otp-form" id="otp-form" onSubmit={handleSubmit}>
          <div className="auth-field" style={{ marginBottom: "16px" }}>
            <input
              required
              id="otp-single-input"
              className="auth-input otp-single-input"
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]*"
              autoComplete="one-time-code"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          {/* Timer / resend */}
          <div className="otp-resend-row">
            <span className="otp-timer" id="otp-timer-label">
              Code expires in{" "}
              <span className="otp-timer-val" id="otp-countdown">
                04:59
              </span>
            </span>
            <button
              type="button"
              className="otp-resend-btn"
              id="otp-resend-btn"
            >
              Resend code
            </button>
          </div>

          {/* Submit */}
          <button
            className="auth-submit-btn"
            type="submit"
            id="verify-submit-btn"
          >
            {loading ? (
              <>
                <span className="auth-spinner" aria-hidden="true" />
                <span className="auth-btn-label">Verifying…</span>
              </>
            ) : (
              <span className="auth-btn-label">Verify & Continue</span>
            )}
          </button>
        </form>

        {/* Help */}
        <p className="auth-switch" style={{ marginTop: 20 }}>
          Wrong email?{" "}
          <Link
            to="/auth/register"
            className="auth-link"
            id="verify-change-email"
          >
            Change it
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Verify;
