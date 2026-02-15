import { useEffect, useState } from "react";

import { getProducts } from "../services/productsService.js";
import { useCart } from "../context/CartContext.jsx";

import CartPopup from "../components/cartPopup.jsx";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar.jsx";

import "../styles/products.css";

export default function Products() {

  const { popup, popupProduct, setPopup } = useCart();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  /* ================= LOAD PRODUCTS ================= */

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const { data } = await getProducts();

      setProducts(data);
      setFiltered(data);

    } catch (err) {
      console.log("Product Fetch Error:", err);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <Navbar />

      <div className="products-container">

        {/* CART POPUP */}
        <CartPopup
          show={popup}
          product={popupProduct}
          onClose={() => setPopup(false)}
        />


        {/* LEFT FILTERS */}
        <Filters
          products={products}
          setFiltered={setFiltered}
        />


        {/* RIGHT PRODUCTS */}
        <div className="products-grid">

          {filtered.length === 0 && (
            <h3>No products found</h3>
          )}

          {filtered.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
            />
          ))}

        </div>

      </div>
    </>
  );
}
