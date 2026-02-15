import mongoose from "mongoose";


/* ================= ADDRESS SCHEMA ================= */

const addressSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  street: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    default: "",
  },

  zipCode: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    default: "Pakistan",
  },

  isDefault: {
    type: Boolean,
    default: false,
  },

}, { timestamps: true });



/* ================= USER SCHEMA ================= */

const userSchema = new mongoose.Schema(

  {

    /* ========== AUTH ========== */

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },


    /* ========== PROFILE ========== */

    firstName: {
      type: String,
      default: "",
      trim: true,
    },

    lastName: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },


    /* ========== ADDRESSES ========== */

    addresses: [addressSchema], // 👈 MULTIPLE ADDRESSES

  },

  { timestamps: true }

);


export default mongoose.model("User", userSchema);
