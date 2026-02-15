import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  /* Cart Items */
  const [cart, setCart] = useState([]);

  /* Popup State */
  const [popup, setPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);


  /* Load cart from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("cart");

    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);


  /* Save cart */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  /* Add to cart */
  const addToCart = (product) => {

    const exists = cart.find(
      (item) => item._id === product._id
    );

    if (exists) {

      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );

    } else {

      setCart([...cart, { ...product, qty: 1 }]);
    }
  };


  /* Remove */
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };


  /* Update qty */
  const updateQty = (id, qty) => {

    if (qty < 1) return;

    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, qty }
          : item
      )
    );
  };


  /* Clear */
  const clearCart = () => {
    setCart([]);
  };


  return (
    <CartContext.Provider
      value={{

        /* Cart */
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,

        /* Popup */
        popup,
        setPopup,
        popupProduct,
        setPopupProduct,

      }}
    >
      {children}
    </CartContext.Provider>
  );
};


/* Hook */
export const useCart = () => {
  return useContext(CartContext);
};
