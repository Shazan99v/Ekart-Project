import { useState } from "react";
import "../styles/help.css";

export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/contact/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("❌ Failed to send message");
      }

    } catch (error) {
      console.error(error);
      setStatus("❌ Server error");

    } finally {
      setLoading(false);
    }
  };



  return (
    <section id="contact" className="support-page">

      <div className="support-header">
        <h1>
          Contact <span>Us</span>
        </h1>

        <p>
          Our team is here to help you.
          Reach out anytime.
        </p>
      </div>


      <div className="support-card">

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>


          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p style={{ marginTop: "15px" }}>
              {status}
            </p>
          )}

        </form>

      </div>

    </section>
  );
}
