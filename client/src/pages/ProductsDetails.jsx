import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productsService";

import "../styles/productsDetails.css";
import Navbar from "../components/Navbar";

export default function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, setPopup, setPopupProduct } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {

      setLoading(true);

      const { data } = await getProductById(id);

      setProduct(data);
      setLoading(false);

    } catch (err) {

      console.error("Details Error:", err);

      setProduct(null);
      setLoading(false);
    }
  };


  /* ================= HANDLERS ================= */

  const handleAddToCart = () => {

    if (!product) return;

    // Add to cart
    addToCart(product);

    // Show popup
    setPopupProduct(product);
    setPopup(true);
  };


  const handleContinue = () => {
    navigate("/products");
  };


  /* ================= STATES ================= */

  if (loading) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading...
        </h2>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Product Not Found 😕
        </h2>
      </>
    );
  }


  /* ================= UI ================= */

  return (
    <>
      <Navbar />

      <div className="details-container">

        <div className="details-card">

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
          />


          {/* Product Info */}
          <div className="details-info">

            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <h2>${product.price}</h2>


            {/* Buttons */}
            <div className="details-actions">

              <button
                className="btn-primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                className="btn-secondary"
                onClick={handleContinue}
              >
                Continue Shopping
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}
