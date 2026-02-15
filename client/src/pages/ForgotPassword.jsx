import { useState } from "react";
import { forgotPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";
import "../styles/forgot.css"

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword({ email });

      navigate("/reset", {
        state: { email },
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
  <div className="auth-container">

    <div className="auth-card forgot-card">

      <h2 className="auth-title">Forgot Password</h2>

      <p className="forgot-text">
        Enter your registered email and we’ll send you an OTP to reset your password.
      </p>

      <form className="auth-form" onSubmit={submitHandler}>

        <input
          className="auth-input"
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="auth-btn">
          Send OTP
        </button>

      </form>

    </div>

  </div>
);

}
