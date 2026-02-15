import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";
import Navbar from "../components/Navbar";

export default function ProfileSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:5000"; // ✅ BACKEND URL

  // ================= GET PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setForm(data);

        // ✅ Build full image URL
        if (data.avatar) {
          setPreview(`${BASE_URL}${data.avatar}`);
        }
      } catch (err) {
        console.log("PROFILE ERROR 👉", err);
      }
    };

    fetchProfile();
  }, []);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= IMAGE CHANGE =================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setAvatar(file);

    // ✅ Show instant preview
    setPreview(URL.createObjectURL(file));
  };

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "", // success | error
  });

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const { data } = await axios.put(
        "http://localhost:5000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ✅ Update preview after save
      if (data.user?.avatar) {
        setPreview(`${BASE_URL}${data.user.avatar}`);
      }

      setPopup({
        show: true,
        message: "Profile Updated Successfully ✅",
        type: "success",
      });
    } catch (err) {
      console.error("UPDATE ERROR 👉", err.response?.data || err.message);

      setPopup({
        show: true,
        message: err.response?.data?.message || "Update failed ❌",
        type: "error",
      });
    }

    setLoading(false);
  };

  return (
    <>
    <Navbar />
    <div className="profile-page">
      {/* HEADER */}
      <div className="profile-header">
        <h1>
          My <span>Profile</span>
        </h1>
        <p>Manage your personal information</p>
      </div>

      <div className="profile-content">
        <form className="profile-card" onSubmit={handleSubmit}>
          {/* AVATAR */}
          <div className="avatar-box">
            <img
              src={preview || "/images/default-avatar.png"}
              alt="avatar"
              onError={(e) => {
                e.target.src = "/images/default-avatar.png";
              }}
            />

            <label>
              Change Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>

          <h3>My Profile</h3>

          {/* PROFILE INFO */}
          <div className="profile-info">
            <div>
              <label>First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled
              />
            </div>

            <div>
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </div>

            <div>
              <label>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} />
            </div>

            <div>
              <label>Zip Code</label>
              <input
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button className="edit-btn" disabled={loading}>
            {loading ? "Saving..." : "Update Profile"}
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
      </div>
    </div>
    </>
  );
}
