import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number,
      image: String,
    }
  ],

  shippingAddress: {
    name: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },

  subtotal: Number,
  tax: Number,
  total: Number,

  status: {
    type: String,
    default: "Processing",
  },

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
