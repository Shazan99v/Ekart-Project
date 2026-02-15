import { useEffect, useState } from "react";
import "../styles/adminDashboard.css";
import Navbar from "../components/Navbar";
import axios from "axios";

import { useAuth } from "../context/AuthContext.jsx";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productsService.js";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {

  const { token } = useAuth();

  // ================= STATES =================

  const [active, setActive] = useState("dashboard");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    income: 0,
    sales: [],
  });

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    brand: "",
    stock: "",
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api";

  // ================= FETCH DATA =================

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`, { headers });
    setProducts(res.data || []);
  };

  const fetchOrders = async () => {
    const res = await axios.get(`${API}/orders`, { headers });
    setOrders(res.data || []);
  };

  const fetchStats = async () => {
    const res = await axios.get(`${API}/admin/stats`, { headers });
    setStats(res.data);
  };

  useEffect(() => {

    if (!token) return;

    fetchProducts();
    fetchOrders();
    fetchStats();

  }, [token]);

  // ================= FORM =================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (editId) {
      await updateProduct(editId, form, token);
    } else {
      await createProduct(form, token);
    }

    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      brand: "",
      stock: "",
    });

    setEditId(null);
    setActive("products");

    fetchProducts();
  };

  const handleEdit = (p) => {

    setEditId(p._id);

    setForm(p);

    setActive("add");
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete product?")) return;

    await deleteProduct(id, token);

    fetchProducts();
  };

  // ================= UI =================

  return (
    <>
      <Navbar />

      <div className="admin-container">

        <h2>Admin Dashboard</h2>

        {/* NAV */}

        <div className="admin-nav">

          <button
            onClick={() => setActive("dashboard")}
            className={active === "dashboard" ? "active" : ""}
          >
            Dashboard
          </button>

          <button
            onClick={() => setActive("orders")}
            className={active === "orders" ? "active" : ""}
          >
            Orders
          </button>

          <button
            onClick={() => setActive("products")}
            className={active === "products" ? "active" : ""}
          >
            Products
          </button>

          <button
            onClick={() => setActive("add")}
            className={active === "add" ? "active" : ""}
          >
            Add Product
          </button>

        </div>

        {/* ================= DASHBOARD ================= */}

        {active === "dashboard" && (

          <>

            {/* STATS */}

            <div className="admin-stats">

              <div className="stat-card">
                <h4>Users</h4>
                <p>{stats.users}</p>
              </div>

              <div className="stat-card">
                <h4>Orders</h4>
                <p>{stats.orders}</p>
              </div>

              <div className="stat-card">
                <h4>Products</h4>
                <p>{stats.products}</p>
              </div>

              <div className="stat-card">
                <h4>Income</h4>
                <p>₹ {stats.income}</p>
              </div>

            </div>

            {/* GRAPH */}

            <div className="admin-chart">

              <h3>Sales (Last Days)</h3>

              <ResponsiveContainer width="100%" height={300}>

                <LineChart data={stats.sales}>

                  <XAxis dataKey="_id" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#38bdf8"
                    strokeWidth={3}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </>
        )}

        {/* ================= ORDERS ================= */}

        {active === "orders" && (

          <div className="admin-list">

            <table>

              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {orders.map((o) => (

                  <tr key={o._id}>

                    <td>{o._id.slice(-6)}</td>

                    <td>{o.user?.name}</td>

                    <td>₹{o.total}</td>

                    <td>
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* ================= PRODUCTS ================= */}

        {active === "products" && (

          <div className="admin-list">

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {products.map((p) => (

                  <tr key={p._id}>

                    <td>{p.name}</td>

                    <td>₹{p.price}</td>

                    <td>{p.stock}</td>

                    <td>

                      <button onClick={() => handleEdit(p)}>
                        Edit
                      </button>

                      <button
                        className="danger"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* ================= ADD ================= */}

        {active === "add" && (

          <div className="admin-form">

            <form onSubmit={handleSubmit}>

              <h3>
                {editId ? "Edit Product" : "Add Product"}
              </h3>

              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />

              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />

              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />

              <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />

              <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" />

              <button type="submit" className="primary">
                Save
              </button>

            </form>

          </div>
        )}

      </div>
    </>
  );
}
