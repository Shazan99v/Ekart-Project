import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";
import "../styles/login.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "", // success | error
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login(form);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ SAVE USER (optional)
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ SET CONTEXT
      authLogin(data);

      setPopup({
        show: true,
        message: "Login Successful ✅",
        type: "success",
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.error("LOGIN ERROR 👉", err.response?.data || err.message);

      setPopup({
        show: true,
        message: err.response?.data?.message || "Login failed ❌",
        type: "error",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card login-card">
        <h2 className="auth-title">Login</h2>

        <form onSubmit={submitHandler} className="auth-form">
          <input
            className="auth-input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="auth-input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        {/* CUSTOM POPUP */}
        {popup.show && (
          <div className={`popup ${popup.type}`}>
            <p>{popup.message}</p>

            <button
              onClick={() => setPopup({ show: false, message: "", type: "" })}
            >
              OK
            </button>
          </div>
        )}

        <div className="auth-links">
          <Link to="/signup">Create account</Link>
          <br />

          <Link to="/forgot">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
