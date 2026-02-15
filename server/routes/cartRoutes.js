import express from "express";
import Cart from "../models/cartModel.js";

const router = express.Router();

/* GET CART */
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.json(cart || { items: [] });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ADD TO CART */
router.post("/add", async (req, res) => {
  try {
    const { userId, product } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const exist = cart.items.find(
      (i) => i.productId.toString() === product._id
    );

    if (exist) {
      exist.qty += 1;
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE QTY */
router.put("/update", async (req, res) => {
  const { userId, productId, qty } = req.body;

  const cart = await Cart.findOne({ userId });

  cart.items.forEach((i) => {
    if (i.productId.toString() === productId) {
      i.qty = qty;
    }
  });

  await cart.save();

  res.json(cart);
});

/* REMOVE */
router.delete("/:userId/:productId", async (req, res) => {

  const cart = await Cart.findOne({
    userId: req.params.userId,
  });

  cart.items = cart.items.filter(
    (i) => i.productId.toString() !== req.params.productId
  );

  await cart.save();

  res.json(cart);
});

export default router;
