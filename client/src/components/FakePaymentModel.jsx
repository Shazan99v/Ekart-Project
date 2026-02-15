import { useState } from "react";
import "../styles/fakePaymentModel.css";

export default function FakePayment({ amount, onSuccess, onClose }) {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (

    <div className="payment-backdrop">

      {!success ? (

        <div className="payment-modal">

          <button
            className="payment-close"
            onClick={onClose}
          >
            ✕
          </button>

          <div className="payment-header">
            <h2>Payment Details</h2>
            <p>Enter your card information</p>
          </div>

          <div className="payment-amount">
            ₹{amount.toFixed(2)}
          </div>

          <div className="payment-form">

            <input placeholder="Card Number" />
            <input placeholder="Card Holder Name" />

            <div className="payment-row">
              <input placeholder="MM/YY" />
              <input placeholder="CVV" />
            </div>

            <button
              className={`payment-btn ${loading ? "loading" : ""}`}
              onClick={handlePay}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>

          </div>

        </div>

      ) : (

        <div className="payment-success">

          <div className="success-icon">✓</div>

          <h2>Payment Successful</h2>

          <p>Your order has been placed successfully.</p>

          <button
            className="success-btn success-primary"
            onClick={onSuccess}
          >
            Continue Shopping
          </button>

          <button
            className="success-btn success-outline"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      )}

    </div>
  );
}
