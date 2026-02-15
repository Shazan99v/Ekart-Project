import { useState } from "react";
import { verifyOTP } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/auth.css";
import "../styles/verify.css"

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await verifyOTP({
        email: state.email,
        otp,
      });

      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

 return (
  <div className="auth-container">

    <div className="auth-card verify-card">

      <h2 className="auth-title">Verify OTP</h2>

      <p className="verify-text">
        Enter the OTP sent to your email to complete verification.
      </p>

      <form className="auth-form" onSubmit={submitHandler}>

        <input
          className="auth-input"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button className="auth-btn verify-btn">
          Verify
        </button>

      </form>

    </div>

  </div>
);

}
