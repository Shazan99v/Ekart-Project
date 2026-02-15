import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  saveAddress,
  getAddress,
} from "../controller/addressController.js";

const router = express.Router();

// GET default address
router.get("/", protect, getAddress);

// SAVE new address
router.post("/", protect, saveAddress);

export default router;
