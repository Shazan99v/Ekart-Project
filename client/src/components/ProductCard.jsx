import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "../styles/products.css";

export default function ProductCard({ product }) {

  const navigate = useNavigate();
  const { addToCart, setPopup, setPopupProduct } = useCart();

  /* Open details page */
  const openDetails = () => {
    navigate(`/product/${product._id}`);
  };

  /* Add to cart */
  const handleAdd = (e) => {
    e.stopPropagation(); // ⛔ stop redirect
    addToCart(product);

    // Popup
    if (setPopup && setPopupProduct) {
      setPopupProduct(product);
      setPopup(true);
    }
  };

  return (
    <div className="product-card" onClick={openDetails}>

      <img src={product.image} alt={product.name} />

      <h4>{product.name}</h4>

      <p>{product.description?.slice(0, 50)}...</p>

      <h3>${product.price}</h3>

      <button onClick={handleAdd}>
        Add to Cart
      </button>

    </div>
  );
}
