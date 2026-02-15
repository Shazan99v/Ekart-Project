import express from "express";

import {
  getProfile,
  updateProfile,
} from "../controller/profilrController.js";

import { protect } from "../middlewares/authMiddleware.js";

import upload from "../utils/upload.js";


const router = express.Router();


router.get(
  "/",
  protect,
  getProfile
);


router.put(
  "/",
  protect,
  upload.single("avatar"),
  updateProfile
);


export default router;
