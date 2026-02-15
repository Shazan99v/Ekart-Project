import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productsModel.js";

/* ===========================
   CREATE ORDER (USER)
=========================== */
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      subtotal,
      tax,
      total,
      paymentMethod = "FakePay",
    } = req.body;

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      subtotal,
      tax,
      total,

      // PAYMENT
      paymentMethod,
      isPaid: true, // ✅ since fake payment
      paidAt: Date.now(),
    });

    res.status(201).json(order);

  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);

    res.status(500).json({
      message: "Order Failed",
    });
  }
};


/* ===========================
   GET USER ORDERS
=========================== */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.log("MY ORDERS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};


/* ===========================
   ADMIN: GET ALL ORDERS
=========================== */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.log("ALL ORDERS ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};


/* ===========================
   ADMIN: DASHBOARD STATS
=========================== */
export const getDashboardStats = async (req, res) => {
  try {

    const totalOrders = await Order.countDocuments();

    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
        },
      },
    ]);

    const paidOrders = await Order.countDocuments({
      isPaid: true,
    });

    const pendingOrders = await Order.countDocuments({
      isPaid: false,
    });

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      paidOrders,
      pendingOrders,
    });

  } catch (err) {
    console.log("DASHBOARD ERROR:", err);

    res.status(500).json({
      message: "Dashboard stats failed",
    });
  }
};



