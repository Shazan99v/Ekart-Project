import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";
import "../styles/signup.css"

export default function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      navigate("/verify", { state: { email: form.email } });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
  <div className="auth-container">

    <div className="auth-card signup-card">

      <h2 className="auth-title">Create Account</h2>

      <form className="auth-form" onSubmit={submitHandler}>

        <div className="signup-row">

          <input
            className="auth-input"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          />

          <input
            className="auth-input"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />

        </div>

        <input
          className="auth-input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          className="auth-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="auth-btn">
          Register
        </button>

      </form>

    </div>

  </div>
);

}
