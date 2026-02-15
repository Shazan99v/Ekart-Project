import express from "express";
import Product from "../models/productsModel.js";

const router = express.Router();

/* ===============================
   GET ALL PRODUCTS
================================ */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===============================
   GET SINGLE PRODUCT (NEW ✅)
================================ */
router.get("/:id", async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({
      message: "Invalid Product ID",
    });
  }
});

/* ===============================
   CREATE PRODUCT (ADMIN)
================================ */
router.post("/", async (req, res) => {
  try {

    const product = new Product(req.body);
    const saved = await product.save();

    res.status(201).json(saved);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
