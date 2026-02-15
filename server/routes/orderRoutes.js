import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getDashboardStats, // ✅ ADD
} from "../controller/orderController.js";

import {
  protect,
  admin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ================= USER ================= */

// CREATE ORDER
router.post("/", protect, createOrder);

// GET MY ORDERS
router.get("/my", protect, getMyOrders);


/* ================= ADMIN ================= */

// DASHBOARD STATS
router.get("/stats", protect, admin, getDashboardStats); // ✅ NEW

// GET ALL ORDERS
router.get("/", protect, admin, getAllOrders);

export default router;
