import { useState } from "react";
import { resetPassword } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/auth.css";
import "../styles/reset.css";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "", // success | error
  });

 const submitHandler = async (e) => {
  e.preventDefault();

  try {
    await resetPassword({
      email: state.email,
      otp,
      newPassword: password,
    });

    setPopup({
      show: true,
      message: "Password reset successfully ✅",
      type: "success",
    });

  } catch (err) {
    setPopup({
      show: true,
      message:
        err.response?.data?.message ||
        "Password reset failed ❌",
      type: "error",
    });
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card reset-card">
        <h2 className="auth-title">Reset Password</h2>

        <p className="reset-text">
          Enter the OTP sent to your email and choose a new password.
        </p>

        <form className="auth-form" onSubmit={submitHandler}>
          <input
            className="auth-input"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn reset-btn">Reset Password</button>
        </form>

        {/* CUSTOM MODAL POPUP */}
{popup.show && (
  <div className="popup-overlay">

    <div className={`popup-card ${popup.type}`}>

      <h3>
        {popup.type === "success" ? "Success 🎉" : "Error ❌"}
      </h3>

      <p>{popup.message}</p>

      <button
  onClick={() => {
    setPopup({ show: false, message: "", type: "" });

    if (popup.type === "success") {
      navigate("/login");
    }
  }}
>
  OK
</button>


    </div>

  </div>
)}

      </div>
    </div>
  );
}
