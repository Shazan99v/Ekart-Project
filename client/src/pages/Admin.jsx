import { useState, useEffect } from "react";
import { adminLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";
import "../styles/admin.css";

export default function Admin() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  // Run once on mount
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (admin) {
      navigate("/admin-dashboard", { replace: true });
    }
  }, []); // IMPORTANT: empty dependency

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await adminLogin(form);

      localStorage.setItem("admin", JSON.stringify(data));

      alert("Admin Logged In");

      // Redirect once after login
      navigate("/admin-dashboard", { replace: true });

    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card admin-card">

        <h2 className="auth-title">Admin Login</h2>

        <p className="admin-text">
          Authorized access only. Please enter admin credentials.
        </p>

        <form className="auth-form" onSubmit={submitHandler}>

          <input
            className="auth-input"
            type="email"
            placeholder="Admin Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button className="auth-btn admin-btn">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}
