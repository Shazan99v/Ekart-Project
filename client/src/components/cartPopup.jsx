
import "../styles/cartPopup.css";

export default function CartPopup({ show, product, onClose }) {

  if (!show || !product) return null;

  return (
    <div className="popup-overlay">

      <div className="popup-box">

        <h3>Added to Cart ✅</h3>

        <img src={product.image} alt={product.name} />

        <h4>{product.name}</h4>

        <p>Price: ${product.price}</p>

        <div className="popup-actions">

          <button className="btn-secondary" onClick={onClose}>
            Continue Shopping
          </button>

          <button
            className="btn-primary"
            onClick={() => {
              onClose();
              window.location.href = "/cart";
            }}
          >
            Go to Cart
          </button>

        </div>

      </div>

    </div>
  );
}
