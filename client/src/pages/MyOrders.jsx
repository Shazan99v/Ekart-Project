import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/myOrders.css";
import "../styles/global.css"

export default function MyOrders() {

  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= LOAD ORDERS =================

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/orders/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }
    };

    if (token) fetchOrders();

  }, [token]);

  // ================= UI =================

  return (
    <>
      <Navbar />

      <div className="orders-page">

        <h2>My Orders</h2>

        {loading && <p>Loading...</p>}

        {!loading && orders.length === 0 && (
          <p>No orders yet 😢</p>
        )}

        <div className="orders-list">

          {orders.map((order) => (

            <div key={order._id} className="order-card">

  <div className="order-header">

    <span>
      Order ID: {order._id.slice(-6)}
    </span>

    <span className="status">
      Processing 📦
    </span>

  </div>

  <p>Total: ₹{order.total}</p>

  <p>
    Date:{" "}
    {new Date(order.createdAt).toLocaleDateString()}
  </p>

  <p>
    Items: {order.items?.length || 0}
  </p>

</div>

          ))}

        </div>

      </div>
    </>
  );
}
