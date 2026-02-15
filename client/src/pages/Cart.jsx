import "../styles/cart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const tax = subtotal * 0.05;
  const total = subtotal + tax;
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h2 className="cart-title">Shopping Cart</h2>

        <div className="cart-wrapper">
          {/* LEFT */}
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty 🛒</p>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} />

                  <div className="cart-info">
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>

                    <div className="cart-price">₹{item.price}</div>

                    <div className="qty-box">
                      <button
                        onClick={() => updateQty(item._id, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button onClick={() => updateQty(item._id, item.qty + 1)}>
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT */}
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/place-order")}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
