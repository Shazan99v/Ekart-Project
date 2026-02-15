import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  getDashboardStats,
} from "../controller/adminController.js";

const router = express.Router();

// DASHBOARD STATS
router.get("/stats", protect, admin, getDashboardStats);

export default router;
