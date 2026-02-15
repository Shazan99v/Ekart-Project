import { useNavigate } from "react-router-dom";
import "../styles/success.css";

export default function PaymentSuccess() {

  const navigate = useNavigate();

  return (
    <div className="success-page">

      <div className="success-card">

        <h1>✅ Payment Successful</h1>
        <p>Your order has been placed.</p>

        <button onClick={() => navigate("/")}>
          Continue Shopping
        </button>

       <button onClick={() => navigate("/orders")}>
  View My Orders
</button>


      </div>

    </div>
  );
}
