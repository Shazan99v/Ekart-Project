import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx"

import "../styles/global.css"
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
  setShowLogoutPopup(true);
};

const confirmLogout = () => {
  logout();
  localStorage.removeItem("admin");
  navigate("/login");
};

const cancelLogout = () => {
  setShowLogoutPopup(false);
};


  if (!user) return null; // Hide navbar if not logged in

  return (
  <nav className="navbar">

    {/* LOGO */}
    <div className="nav-left">
      <h1 className="nav-logo">
        MyShop
      </h1>
    </div>

    {/* LINKS */}
    <div className="nav-right">

      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/products">Products</Link>
      <Link className="nav-link" to="/cart">Cart</Link>
      <Link className="nav-link" to="/orders">Orders</Link>

      {/* USER MENU */}
      <div
        className="user-menu"
        onClick={() => setShowMenu(!showMenu)}
      >
        👤 {user.firstName}

        {showMenu && (
          <div className="dropdown">

            <Link to="/profile">Profile</Link>

            {user?.role === "admin" && (
              <Link to="/admin-dashboard">Dashboard</Link>
            )}

          </div>
        )}
      </div>

      {/* LOGOUT BUTTON */}
      <button
        className="nav-logout"
        onClick={handleLogout}
      >
        Logout
      </button>


      {/* CUSTOM POPUP */}
      {showLogoutPopup && (
        <div className="popup-overlay">

          <div className="popup-box">

            <h3>Confirm Logout</h3>

            <p>
              Are you sure you want to logout?
            </p>

            <div className="popup-actions">

              <button
                className="popup-btn cancel"
                onClick={cancelLogout}
              >
                Cancel
              </button>

              <button
                className="popup-btn confirm"
                onClick={confirmLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </div>

  </nav>
);

}
