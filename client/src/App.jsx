import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductsDetails.jsx";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import MyOrders from "./pages/MyOrders.jsx"

import { useAuth } from "./context/AuthContext.jsx";
import AdminDashboard from "./pages/AdminDashboard";

import Help from "./pages/Help.jsx";
import Shipping from "./pages/shipping.jsx";
import Returns from "./pages/Return.jsx";
import Contact from "./pages/Contact.jsx";
import PaymentSuccess from "./pages/SuccessPage.jsx";

/* Protected Route */

console.log("APP MOUNTED");

function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin allowed
  return children;
}

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<VerifyOTP />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset" element={<ResetPassword />} />

      {/* Support / Info Pages (PUBLIC) */}
      <Route path="/help" element={<Help />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/contact" element={<Contact />} />

      {/* Protected */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />

      <Route path="/product/:id" element={<ProductsDetails />} />
      <Route path="/place-order" element={<PlaceOrder />} />
      <Route path="/success" element={<PaymentSuccess />} />

      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
