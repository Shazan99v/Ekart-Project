import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.jsx";
import Navbar from "../components/Navbar";
import FakePayment from "../components/FakePaymentModel.jsx";
import axios from "axios";
import "../styles/placeOrder.css";

import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import {
  getAddress,
  saveAddress as saveAddressAPI,
} from "../services/addressService.js";

export default function PlaceOrder() {

  // ================= HOOKS =================

  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  // ================= STATES =================

  const [address, setAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // ================= FORM =================

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
  });

  // ================= LOAD ADDRESS =================

  useEffect(() => {

    if (!token) return;

    const loadAddress = async () => {

      try {

        const data = await getAddress(token);

        if (data) {
          setAddress(data);
        }

      } catch {
        console.log("No saved address");
      }

    };

    loadAddress();

  }, [token]);

  // ================= PRICE =================

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  // ================= FORM HANDLER =================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SAVE ADDRESS =================

  const saveAddress = async (e) => {

    e.preventDefault();

    try {

      const res = await saveAddressAPI(form, token);

      setAddress(res.address);
      setShowForm(false);

    } catch (err) {

      console.log(err);
      alert("Failed to save address");

    }
  };

  // ================= PLACE ORDER =================

  const placeOrderHandler = async () => {

    try {

      const orderData = {
        items: cart,
        shippingAddress: address,
        subtotal,
        tax,
        total,
      };

      await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();

      // ✅ Redirect to success page
      navigate("/success", {
        state: { total },
      });

    } catch (err) {

      console.log(err);
      alert("Order Failed ❌");

    }
  };

  // ================= START PAYMENT =================

  const startPayment = () => {

    if (!address) {
      alert("Please add address first");
      return;
    }

    setShowPayment(true);
  };

  // ================= UI =================

  return (
    <>
      <Navbar />

      <div className="place-order">

        {/* LEFT SIDE */}
        <div className="checkout-left">

          <h2>Delivery Address</h2>

          {/* SAVED ADDRESS */}
          {address && !showForm && (

            <div className="address-card active">

              <div className="address-header">

                <h4>{address.fullName}</h4>

                <div className="address-actions">

                  {/* EDIT */}
                  <button
                    className="edit-btn"
                    onClick={() => {

                      setForm({
                        fullName: address.fullName,
                        phone: address.phone,
                        email: address.email,
                        street: address.street,
                        city: address.city,
                        state: address.state,
                        zipCode: address.zipCode,
                        country: address.country,
                      });

                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm("Delete this address?")) {
                        setAddress(null);
                      }
                    }}
                  >
                    Delete
                  </button>

                </div>
              </div>

              <p>{address.phone}</p>
              <p>{address.email}</p>

              <p>
                {address.street}, {address.city}, {address.state} {address.zipCode}
              </p>

              <p>{address.country}</p>

            </div>
          )}

          {/* ADD NEW */}
          {!showForm && (

            <button
              className="btn-outline"
              onClick={() => {

                setShowForm(true);

                setForm({
                  fullName: "",
                  phone: "",
                  email: "",
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "Pakistan",
                });
              }}
            >
              + Add New Address
            </button>
          )}

          {/* ADDRESS FORM */}
          {showForm && (

            <form
              className="address-form"
              onSubmit={saveAddress}
            >

              <input
                name="fullName"
                value={form.fullName}
                placeholder="Full Name"
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                value={form.phone}
                placeholder="Phone"
                onChange={handleChange}
                required
              />

              <input
                name="email"
                value={form.email}
                placeholder="Email"
                onChange={handleChange}
                required
              />

              <input
                name="street"
                value={form.street}
                placeholder="Street Address"
                onChange={handleChange}
                required
              />

              <input
                name="city"
                value={form.city}
                placeholder="City"
                onChange={handleChange}
                required
              />

              <input
                name="state"
                value={form.state}
                placeholder="State"
                onChange={handleChange}
              />

              <input
                name="zipCode"
                value={form.zipCode}
                placeholder="Zip Code"
                onChange={handleChange}
                required
              />

              <input
                name="country"
                value={form.country}
                placeholder="Country"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn-primary"
              >
                Save & Continue
              </button>

            </form>
          )}

          {/* PAY BUTTON */}
          {address && !showForm && (

            <button
              className="btn-primary"
              onClick={startPayment}
            >
              Pay Now
            </button>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">

          <h3>Order Summary</h3>

          {cart.map((item) => (

            <div
              key={item._id}
              className="summary-item"
            >

              <span>{item.name}</span>
              <span>x{item.qty}</span>
              <span>₹{item.price}</span>

            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

        </div>

      </div>

      {/* PAYMENT MODAL */}
      {showPayment && (

        <FakePayment
          amount={total}
          onSuccess={() => {
            setShowPayment(false);
            placeOrderHandler();
          }}
          onClose={() => setShowPayment(false)}
        />

      )}

    </>
  );
}
